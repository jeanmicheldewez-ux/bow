# BOW

BOW means Body Orchestra Workstation.

BOW is a browser-based modular creative runtime for routing normalized control data between transports, models, mappers and visualizers. This v0.1 prototype establishes the reusable module standard and a graph-driven demo that can later support projects such as WATTOO, Midiboy, Dancing5, Supersets, Tone.js engines, ESP32 controllers and physical outputs.

This repository does not include production code from those projects. It defines a public, portable foundation they can integrate with later.

<img width="740" height="403" alt="sh-bow-1" src="https://github.com/user-attachments/assets/4dcf4937-eac6-4700-a638-4a34b236b18d" />



## v0.1 Demo

The demo contains:

- a MIDI-like control simulator at the transport edge
- a mock model that outputs 16 normalized values
- a Creative Mapper that adapts 16 values to 24 values
- a vector field visualizer that expects 24 values
- controls for mapping strategy and smoothing
- fullscreen visual display
- graph JSON export

All internal data is normalized float data. MIDI, sensors, files, hardware and network transports should convert to or from normalized values only at the adapter edge.

## Run

Because this is plain browser JavaScript using ES modules, serve the folder over HTTP:

```bash
python -m http.server 5173
```

Then open:

```text
http://localhost:5173
```

No backend, login, cloud upload or build step is required.

## Module Standard

Every BOW module declares:

- `id`
- `name`
- `type`
- `inputs`
- `outputs`
- `params`
- optional `setup(context)`
- `process(packet, context)` for data modules or `render(packet, context)` for visualizers
- optional `cleanup(context)`

Supported v0.1 module types:

- `transport`
- `model`
- `mapper`
- `visualizer`

See [docs/MODULE_FORMAT.md](docs/MODULE_FORMAT.md).

## Architecture

BOW v0.1 is organized around a graph:

```text
transport -> model -> mapper -> visualizer
```

The demo is intentionally simple, but the runtime is modular:

- `DataPacket` carries normalized float values, labels and metadata.
- `ModuleRegistry` validates and stores reusable module declarations.
- `GraphEngine` runs graph nodes and keeps graph export data.
- `CreativeMapper` adapts shape mismatches between modules.
- `Normalizer` contains adapter-edge conversion helpers.

See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md), [docs/GRAPH_FORMAT.md](docs/GRAPH_FORMAT.md) and [docs/CREATIVE_MAPPER.md](docs/CREATIVE_MAPPER.md).

## Reuse Targets

BOW is designed so future projects can reuse modules without sharing private implementation code:

- WATTOO can load visualizers, graph JSON and normalized transport adapters.
- Midiboy can expose body-zone events as normalized transport packets.
- Dancing5 can publish body, audio or motion model modules.
- Supersets can adapt MIDI CC presets into normalized packets and consume model suggestions.

See [docs/ROADMAP.md](docs/ROADMAP.md).

