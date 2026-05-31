export class DisplayView {
  constructor(root) {
    this.root = root;
    this.canvas = document.createElement("canvas");
    this.canvas.className = "visualizer-canvas";
    this.root.append(this.canvas);
    this.resize();
    window.addEventListener("resize", () => this.resize());
  }

  resize() {
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    const rect = this.root.getBoundingClientRect();
    this.canvas.width = Math.max(1, Math.floor(rect.width * pixelRatio));
    this.canvas.height = Math.max(1, Math.floor(rect.height * pixelRatio));
  }

  requestFullscreen() {
    this.root.requestFullscreen?.();
  }
}

