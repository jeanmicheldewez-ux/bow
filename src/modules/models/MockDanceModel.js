import { DataPacket } from "../../core/DataPacket.js";
import { Normalizer } from "../../core/Normalizer.js";

export const MockDanceModel = {
  id: "bow.models.mock-dance-16",
  name: "Mock Dance Model 16",
  type: "model",
  inputs: [{ id: "controls", count: 8, unit: "normalized-float" }],
  outputs: [{ id: "motion", count: 16, unit: "normalized-float" }],
  params: {
    energy: 0.72,
    symmetry: 0.45
  },
  process(packet, { params }) {
    const controls = packet?.values ?? new Float32Array(8).fill(0.5);
    const time = performance.now() / 1000;
    const values = Array.from({ length: 16 }, (_, index) => {
      const control = controls[index % controls.length] ?? 0.5;
      const pair = controls[(index + 3) % controls.length] ?? 0.5;
      const wave = Math.sin(time * (0.6 + index * 0.045) + control * Math.PI * 2) * 0.5 + 0.5;
      const bodyBias = index % 2 === 0 ? params.symmetry : 1 - params.symmetry;
      return Normalizer.clamp01(control * 0.45 + pair * 0.2 + wave * params.energy * 0.25 + bodyBias * 0.1);
    });

    return new DataPacket({
      source: "bow.mock-dance-model",
      type: "model-motion",
      values,
      labels: [
        "head_x", "head_y", "shoulder_l", "shoulder_r",
        "elbow_l", "elbow_r", "hand_l", "hand_r",
        "spine", "hip", "knee_l", "knee_r",
        "foot_l", "foot_r", "turn", "jump"
      ],
      meta: { model: "mock", outputSize: 16 }
    });
  }
};

