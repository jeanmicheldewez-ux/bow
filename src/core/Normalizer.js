export const Normalizer = {
  clamp(value, min = 0, max = 1) {
    return Math.min(max, Math.max(min, Number.isFinite(value) ? value : min));
  },

  clamp01(value) {
    return Normalizer.clamp(value, 0, 1);
  },

  clampSigned(value) {
    return Normalizer.clamp(value, -1, 1);
  },

  midiToNormalized(value) {
    return Normalizer.clamp01(value / 127);
  },

  normalizedToMidi(value) {
    return Math.round(Normalizer.clamp01(value) * 127);
  },

  rangeToNormalized(value, min, max) {
    if (max === min) return 0;
    return Normalizer.clamp01((value - min) / (max - min));
  },

  rangeToSignedNormalized(value, min, max) {
    if (max === min) return 0;
    return Normalizer.clampSigned(((value - min) / (max - min)) * 2 - 1);
  },

  normalizedToRange(value, min, max) {
    return min + Normalizer.clamp01(value) * (max - min);
  },

  normalizeArray(values, { min = 0, max = 1, signed = false } = {}) {
    return values.map((value) => {
      return signed
        ? Normalizer.rangeToSignedNormalized(value, min, max)
        : Normalizer.rangeToNormalized(value, min, max);
    });
  }
};
