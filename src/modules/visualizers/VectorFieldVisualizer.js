export const VectorFieldVisualizer = {
  id: "bow.visualizers.vector-field-24",
  name: "Vector Field Visualizer 24",
  type: "visualizer",
  inputs: [{ id: "field", count: 24, unit: "normalized-float" }],
  outputs: [],
  params: {
    expectedValues: 24,
    lineCount: 180,
    glow: 0.7
  },
  setup({ canvas }) {
    const context = canvas.getContext("2d");
    return { context };
  },
  render(packet, { canvas, state, params }) {
    if (!canvas || !state?.context || !packet) return;

    const ctx = state.context;
    const { width, height } = canvas;
    const values = packet.values;
    const centerX = width * (0.35 + values[0] * 0.3);
    const centerY = height * (0.35 + values[1] * 0.3);
    const baseHue = 170 + values[2] * 150;

    ctx.globalCompositeOperation = "source-over";
    ctx.fillStyle = "rgba(7, 10, 15, 0.18)";
    ctx.fillRect(0, 0, width, height);

    ctx.save();
    ctx.globalCompositeOperation = "lighter";
    ctx.lineCap = "round";

    for (let index = 0; index < params.lineCount; index += 1) {
      const slot = index % params.expectedValues;
      const value = values[slot] ?? 0.5;
      const angle = (index / params.lineCount) * Math.PI * 2 + value * Math.PI;
      const radius = Math.min(width, height) * (0.12 + (values[(slot + 5) % values.length] ?? 0.5) * 0.43);
      const x = centerX + Math.cos(angle) * radius;
      const y = centerY + Math.sin(angle) * radius;
      const bend = (values[(slot + 11) % values.length] ?? 0.5) - 0.5;
      const length = 24 + value * 130;

      ctx.strokeStyle = `hsla(${baseHue + slot * 6}, 88%, ${52 + value * 26}%, ${0.08 + params.glow * 0.22})`;
      ctx.lineWidth = 1 + value * 3.4;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.quadraticCurveTo(
        x + Math.cos(angle + bend * 3) * length,
        y + Math.sin(angle - bend * 3) * length,
        x + Math.cos(angle + Math.PI * value) * length * 1.6,
        y + Math.sin(angle + Math.PI * value) * length * 1.6
      );
      ctx.stroke();
    }

    ctx.restore();
  },
  cleanup() {}
};

