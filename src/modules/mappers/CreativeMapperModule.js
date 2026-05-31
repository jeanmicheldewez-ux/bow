export const CreativeMapperModule = {
  id: "bow.mappers.creative-mapper",
  name: "Creative Mapper",
  type: "mapper",
  inputs: [{ id: "input", count: "any", unit: "normalized-float" }],
  outputs: [{ id: "output", count: 24, unit: "normalized-float" }],
  params: {
    outputSize: 24,
    strategy: "repeat",
    smoothing: 0.15,
    fillValue: 0.5
  },
  process(packet) {
    return packet;
  }
};

