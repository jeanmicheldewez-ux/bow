# Creative Mapper

Creative Mapper solves a core BOW problem: creative modules rarely agree on value counts.

Example:

```text
model output:      16 normalized values
visualizer input:  24 normalized values
```

The mapper adapts the shape while preserving normalized float data.

## v0.1 Strategies

- `repeat`: cycle input values until the output is full.
- `interpolate`: resample values across the output range.
- `mirror`: reflect input values back and forth.
- `truncate`: copy available values and fill missing values.
- `random-fill`: copy available values and randomize missing values.
- `previous-fill`: copy available values and keep previous missing values.

## Smoothing

Smoothing blends the current mapped frame with the previous frame. This reduces visual jumps when sources are sparse or random.

## Future Mapping

Future mapper modules can add:

- label-based mapping
- learned mapping
- MIDI CC mapping templates
- body landmark to skeleton mapping
- musical timing quantization
- physical output safety constraints

