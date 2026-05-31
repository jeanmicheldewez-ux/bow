# Graph Format

BOW graphs are serializable JSON documents that connect module instances.

```json
{
  "version": "0.1",
  "name": "BOW v0.1 Demo Graph",
  "nodes": [
    {
      "id": "mapper",
      "moduleId": "bow.mappers.creative-mapper",
      "params": {
        "outputSize": 24,
        "strategy": "repeat"
      }
    }
  ],
  "edges": [
    {
      "from": "model",
      "to": "mapper",
      "outlet": "motion",
      "inlet": "input"
    }
  ]
}
```

## Nodes

Nodes instantiate reusable modules. `params` override module defaults for that graph instance.

## Edges

Edges route packets from one node to another. v0.1 uses a simple ordered graph. Later versions can add:

- multiple inputs
- fan-out
- feedback with frame delay
- type checking
- graph scheduling
- remote display or machine routing

## Export

The browser demo exports the current graph as JSON with an `exportedAt` timestamp. Exported graphs should contain only public module IDs, connection data and serializable parameters.

