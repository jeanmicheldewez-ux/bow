import { DataPacket } from "./DataPacket.js";
import { Normalizer } from "./Normalizer.js";

export class CreativeMapper {
  constructor({ outputSize = 24, strategy = "repeat", smoothing = 0.15, fillValue = 0.5 } = {}) {
    this.outputSize = outputSize;
    this.strategy = strategy;
    this.smoothing = smoothing;
    this.fillValue = fillValue;
    this.previous = new Float32Array(outputSize).fill(fillValue);
  }

  setOptions(options = {}) {
    Object.assign(this, options);
    if (this.previous.length !== this.outputSize) {
      this.previous = new Float32Array(this.outputSize).fill(this.fillValue);
    }
  }

  map(packet, options = {}) {
    this.setOptions(options);
    const mapped = new Float32Array(this.outputSize);
    const input = packet.values;

    for (let index = 0; index < this.outputSize; index += 1) {
      mapped[index] = this.mapValue(input, index);
    }

    const smoothed = mapped.map((value, index) => {
      const mixed = this.previous[index] + (value - this.previous[index]) * (1 - this.smoothing);
      return Normalizer.clamp01(mixed);
    });

    this.previous = Float32Array.from(smoothed);

    return new DataPacket({
      source: "bow.creative-mapper",
      type: "mapped-values",
      values: smoothed,
      labels: Array.from({ length: this.outputSize }, (_, index) => `mapped_${index}`),
      meta: {
        inputSource: packet.source,
        inputSize: packet.size,
        outputSize: this.outputSize,
        strategy: this.strategy,
        smoothing: this.smoothing
      }
    });
  }

  mapValue(input, index) {
    if (!input.length) return this.fillValue;

    if (this.strategy === "truncate") {
      return index < input.length ? input[index] : this.fillValue;
    }

    if (this.strategy === "mirror") {
      const period = Math.max(1, input.length * 2 - 2);
      const position = index % period;
      const sourceIndex = position < input.length ? position : period - position;
      return input[sourceIndex];
    }

    if (this.strategy === "interpolate") {
      if (this.outputSize === 1 || input.length === 1) return input[0];
      const position = (index / (this.outputSize - 1)) * (input.length - 1);
      const left = Math.floor(position);
      const right = Math.min(input.length - 1, left + 1);
      const mix = position - left;
      return input[left] * (1 - mix) + input[right] * mix;
    }

    if (this.strategy === "random-fill") {
      return index < input.length ? input[index] : Math.random();
    }

    if (this.strategy === "previous-fill") {
      return index < input.length ? input[index] : this.previous[index] ?? this.fillValue;
    }

    return input[index % input.length];
  }
}

