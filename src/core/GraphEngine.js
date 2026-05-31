import { CreativeMapper } from "./CreativeMapper.js";

export class GraphEngine {
  constructor({ registry, graph }) {
    this.registry = registry;
    this.graph = structuredClone(graph);
    this.nodeState = new Map();
    this.mapper = new CreativeMapper({ outputSize: 24 });
  }

  async setup(context = {}) {
    for (const node of this.graph.nodes) {
      const moduleDefinition = this.registry.get(node.moduleId);
      if (typeof moduleDefinition.setup === "function") {
        this.nodeState.set(node.id, await moduleDefinition.setup({ ...context, node }));
      }
    }
  }

  tick(context = {}) {
    const packets = new Map();

    for (const node of this.graph.nodes) {
      const moduleDefinition = this.registry.get(node.moduleId);
      const inputPacket = this.findInputPacket(node.id, packets);
      const nodeContext = {
        ...context,
        node,
        params: { ...moduleDefinition.params, ...node.params },
        state: this.nodeState.get(node.id)
      };

      if (moduleDefinition.type === "visualizer") {
        moduleDefinition.render(inputPacket, nodeContext);
        continue;
      }

      if (moduleDefinition.type === "mapper") {
        packets.set(node.id, this.mapper.map(inputPacket, nodeContext.params));
        continue;
      }

      packets.set(node.id, moduleDefinition.process(inputPacket, nodeContext));
    }

    return packets;
  }

  findInputPacket(nodeId, packets) {
    const edge = this.graph.edges.find((candidate) => candidate.to === nodeId);
    return edge ? packets.get(edge.from) : null;
  }

  updateNodeParams(nodeId, params) {
    const node = this.graph.nodes.find((candidate) => candidate.id === nodeId);
    if (!node) throw new Error(`Unknown graph node: ${nodeId}`);
    node.params = { ...node.params, ...params };
  }

  exportGraph() {
    return {
      ...structuredClone(this.graph),
      exportedAt: new Date().toISOString()
    };
  }

  async cleanup(context = {}) {
    for (const node of this.graph.nodes) {
      const moduleDefinition = this.registry.get(node.moduleId);
      if (typeof moduleDefinition.cleanup === "function") {
        await moduleDefinition.cleanup({ ...context, node, state: this.nodeState.get(node.id) });
      }
    }
  }
}

