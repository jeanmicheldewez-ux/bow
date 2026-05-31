# BOW Architecture

BOW is a modular creative runtime/workstation for normalized data routing. It treats MIDI, sensors, model outputs and visual controls as compatible streams once they enter the runtime as normalized floats.

## v0.1 Runtime

The browser demo uses this graph:

```text
MidiLikeSimulator -> MockDanceModel -> CreativeMapper -> VectorFieldVisualizer
```

Core pieces:

- `DataPacket` is the runtime data envelope.
- `ModuleRegistry` validates and stores module declarations.
- `GraphEngine` executes graph nodes in order and renders visualizers.
- `CreativeMapper` adapts mismatched packet sizes and applies smoothing.
- `Normalizer` keeps edge adapters explicit.

## Data Principle

BOW internal values are normalized floats:

- `0.0` to `1.0` for normal controls
- `-1.0` to `1.0` for signed movement when a module explicitly declares it
- MIDI `0` to `127`, sensor units, screen pixels and motor ranges belong at adapters

This makes modules portable across browser UI, MIDI tools, AI models, body tracking systems and visualizers.

## Module Types

- `transport`: receives or simulates external data and emits normalized packets.
- `model`: transforms input packets into learned, generated or inferred packets.
- `mapper`: adapts, reshapes or artistically remaps packets.
- `visualizer`: renders packets to a display target.

Future types can include `controller`, `audio`, `recorder`, `safety` and `hardware-output`.

## Reuse Boundaries

BOW modules should be portable declarations with no hidden application state. Project-specific adapters can live at the edge:

- Supersets can adapt MIDI CC presets into normalized packet streams.
- Dancing5 can expose exported dancer models as BOW model modules.
- Midiboy can publish body-zone interaction packets.
- WATTOO can load BOW graphs and visualizers into installation scenes.

No private project production code is needed for the shared runtime contract.

