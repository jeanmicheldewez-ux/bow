# Module Format

Every BOW module is a plain JavaScript object.

```js
export const ExampleModule = {
  id: "vendor.type.name",
  name: "Human Name",
  type: "model",
  inputs: [{ id: "input", count: 16, unit: "normalized-float" }],
  outputs: [{ id: "output", count: 24, unit: "normalized-float" }],
  params: { amount: 0.5 },
  setup(context) {},
  process(packet, context) {},
  render(packet, context) {},
  cleanup(context) {}
};
```

## Required Fields

- `id`: stable unique identifier.
- `name`: display name.
- `type`: `transport`, `model`, `mapper` or `visualizer`.
- `inputs`: array of input ports.
- `outputs`: array of output ports.
- `params`: serializable default parameters.
- `process(packet, context)`: required for transports, models and mappers.
- `render(packet, context)`: required for visualizers.

`setup(context)` and `cleanup(context)` are optional.

## Ports

Ports describe expected data without forcing hard coupling:

```js
{ id: "motion", count: 16, unit: "normalized-float" }
```

`count` may be a number or `"any"` for flexible modules.

## Context

The runtime passes:

- `node`: graph node declaration
- `params`: merged module defaults and node overrides
- `state`: optional setup return value
- display or environment handles such as `canvas`

Modules should avoid global state so they can be reused across projects.

