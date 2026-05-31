export class DataPacket {
  constructor({ source = "unknown", type = "values", values = [], labels = [], meta = {} } = {}) {
    this.source = source;
    this.type = type;
    this.values = Float32Array.from(values, (value) => Number(value));
    this.labels = labels.length ? [...labels] : Array.from(this.values, (_, index) => `value_${index}`);
    this.meta = {
      timestamp: performance.now(),
      ...meta
    };
  }

  static empty(source = "unknown") {
    return new DataPacket({ source, values: [] });
  }

  get size() {
    return this.values.length;
  }

  toJSON() {
    return {
      source: this.source,
      type: this.type,
      values: Array.from(this.values),
      labels: [...this.labels],
      meta: { ...this.meta }
    };
  }
}
