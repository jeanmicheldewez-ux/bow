import { DataPacket } from "../../core/DataPacket.js";
import { Normalizer } from "../../core/Normalizer.js";

export const MidiLikeSimulator = {
  id: "bow.transports.midi-like-simulator",
  name: "MIDI-like Control Simulator",
  type: "transport",
  inputs: [],
  outputs: [{ id: "controls", count: 8, unit: "normalized-float" }],
  params: {
    channelCount: 8,
    tempo: 0.75,
    humanize: 0.08
  },
  process(_packet, { params }) {
    const time = performance.now() / 1000;
    const values = Array.from({ length: params.channelCount }, (_, index) => {
      const phase = time * params.tempo * (0.7 + index * 0.11) + index * 0.83;
      const lfo = Math.sin(phase) * 0.5 + 0.5;
      const stepped = Math.round(lfo * 7) / 7;
      const drift = Math.sin(time * 0.19 + index) * params.humanize;
      return Normalizer.clamp01(stepped * 0.8 + lfo * 0.2 + drift);
    });

    return new DataPacket({
      source: "bow.midi-like-simulator",
      type: "transport-controls",
      values,
      labels: values.map((_, index) => `cc_${index + 1}`),
      meta: { adapter: "simulated-midi", edge: true }
    });
  }
};

