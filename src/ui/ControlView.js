const STRATEGIES = [
  ["repeat", "Repeat"],
  ["interpolate", "Interpolate"],
  ["mirror", "Mirror"],
  ["truncate", "Truncate"],
  ["random-fill", "Random Fill"],
  ["previous-fill", "Previous Fill"]
];

export class ControlView {
  constructor(root, { onStrategyChange, onSmoothingChange, onExport, onFullscreen }) {
    this.root = root;
    this.onStrategyChange = onStrategyChange;
    this.onSmoothingChange = onSmoothingChange;
    this.onExport = onExport;
    this.onFullscreen = onFullscreen;
    this.render();
  }

  render() {
    this.root.innerHTML = `
      <header class="control-header">
        <div>
          <p class="eyebrow">BOW v0.1</p>
          <h1>Body Orchestra Workstation</h1>
        </div>
        <button class="icon-button fullscreen-mark" data-action="fullscreen" title="Fullscreen display" aria-label="Fullscreen display"></button>
      </header>

      <section class="panel">
        <h2>Creative Mapper</h2>
        <label class="field">
          <span>Mapping strategy</span>
          <select data-field="strategy">
            ${STRATEGIES.map(([value, label]) => `<option value="${value}">${label}</option>`).join("")}
          </select>
        </label>
        <label class="field">
          <span>Smoothing</span>
          <input data-field="smoothing" type="range" min="0" max="0.95" step="0.01" value="0.15">
        </label>
      </section>

      <section class="panel compact">
        <h2>Runtime Graph</h2>
        <ol class="graph-list">
          <li>Transport: MIDI-like simulator</li>
          <li>Model: Mock Dance Model 16</li>
          <li>Mapper: 16 values to 24 values</li>
          <li>Visualizer: Vector Field 24</li>
        </ol>
        <button class="primary-button" data-action="export">Export graph JSON</button>
      </section>

      <section class="meter-panel">
        <h2>Mapped Output</h2>
        <div class="meter-grid" data-meters></div>
      </section>
    `;

    this.meterRoot = this.root.querySelector("[data-meters]");
    this.root.querySelector("[data-field='strategy']").addEventListener("change", (event) => {
      this.onStrategyChange(event.target.value);
    });
    this.root.querySelector("[data-field='smoothing']").addEventListener("input", (event) => {
      this.onSmoothingChange(Number(event.target.value));
    });
    this.root.querySelector("[data-action='export']").addEventListener("click", () => this.onExport());
    this.root.querySelector("[data-action='fullscreen']").addEventListener("click", () => this.onFullscreen());

    for (let index = 0; index < 24; index += 1) {
      const meter = document.createElement("span");
      meter.className = "meter";
      meter.title = `Mapped value ${index}`;
      this.meterRoot.append(meter);
    }
  }

  updateMeters(packet) {
    if (!packet) return;
    const meters = this.meterRoot.querySelectorAll(".meter");
    meters.forEach((meter, index) => {
      const value = packet.values[index] ?? 0;
      meter.style.transform = `scaleY(${Math.max(0.04, value)})`;
      meter.style.background = `hsl(${170 + value * 150}, 84%, ${44 + value * 28}%)`;
    });
  }
}
