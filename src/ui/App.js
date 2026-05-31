import { ModuleRegistry } from "../core/ModuleRegistry.js";
import { GraphEngine } from "../core/GraphEngine.js";
import { MidiLikeSimulator } from "../modules/transports/MidiLikeSimulator.js";
import { MockDanceModel } from "../modules/models/MockDanceModel.js";
import { CreativeMapperModule } from "../modules/mappers/CreativeMapperModule.js";
import { VectorFieldVisualizer } from "../modules/visualizers/VectorFieldVisualizer.js";
import { ControlView } from "./ControlView.js";
import { DisplayView } from "./DisplayView.js";

const demoGraph = {
  version: "0.1",
  name: "BOW v0.1 Demo Graph",
  nodes: [
    { id: "transport", moduleId: MidiLikeSimulator.id, params: {} },
    { id: "model", moduleId: MockDanceModel.id, params: {} },
    { id: "mapper", moduleId: CreativeMapperModule.id, params: { outputSize: 24, strategy: "repeat", smoothing: 0.15 } },
    { id: "visualizer", moduleId: VectorFieldVisualizer.id, params: {} }
  ],
  edges: [
    { from: "transport", to: "model", outlet: "controls", inlet: "controls" },
    { from: "model", to: "mapper", outlet: "motion", inlet: "input" },
    { from: "mapper", to: "visualizer", outlet: "output", inlet: "field" }
  ]
};

class App {
  constructor() {
    this.display = new DisplayView(document.querySelector("#display"));
    this.controls = new ControlView(document.querySelector("#controls"), {
      onStrategyChange: (strategy) => this.engine.updateNodeParams("mapper", { strategy }),
      onSmoothingChange: (smoothing) => this.engine.updateNodeParams("mapper", { smoothing }),
      onExport: () => this.exportGraph(),
      onFullscreen: () => this.display.requestFullscreen()
    });

    this.registry = new ModuleRegistry();
    this.registry.register(MidiLikeSimulator);
    this.registry.register(MockDanceModel);
    this.registry.register(CreativeMapperModule);
    this.registry.register(VectorFieldVisualizer);

    this.engine = new GraphEngine({ registry: this.registry, graph: demoGraph });
  }

  async start() {
    await this.engine.setup({ canvas: this.display.canvas });
    const frame = () => {
      const packets = this.engine.tick({ canvas: this.display.canvas });
      this.controls.updateMeters(packets.get("mapper"));
      requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
  }

  exportGraph() {
    const graph = this.engine.exportGraph();
    const blob = new Blob([JSON.stringify(graph, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "bow-demoGraph.json";
    link.click();
    URL.revokeObjectURL(url);
  }
}

const app = new App();
app.start();

