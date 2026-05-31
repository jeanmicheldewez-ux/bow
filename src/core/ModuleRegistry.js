const REQUIRED_FIELDS = ["id", "name", "type", "inputs", "outputs", "params"];
const VALID_TYPES = new Set(["transport", "model", "mapper", "visualizer"]);

export class ModuleRegistry {
  constructor() {
    this.modules = new Map();
  }

  register(moduleDefinition) {
    this.validate(moduleDefinition);
    if (this.modules.has(moduleDefinition.id)) {
      throw new Error(`Module already registered: ${moduleDefinition.id}`);
    }
    this.modules.set(moduleDefinition.id, Object.freeze({ ...moduleDefinition }));
    return moduleDefinition;
  }

  get(id) {
    const moduleDefinition = this.modules.get(id);
    if (!moduleDefinition) {
      throw new Error(`Unknown module: ${id}`);
    }
    return moduleDefinition;
  }

  list(type = null) {
    return Array.from(this.modules.values()).filter((moduleDefinition) => {
      return type ? moduleDefinition.type === type : true;
    });
  }

  validate(moduleDefinition) {
    for (const field of REQUIRED_FIELDS) {
      if (!(field in moduleDefinition)) {
        throw new Error(`Module is missing required field: ${field}`);
      }
    }

    if (!VALID_TYPES.has(moduleDefinition.type)) {
      throw new Error(`Invalid module type: ${moduleDefinition.type}`);
    }

    if (typeof moduleDefinition.process !== "function" && typeof moduleDefinition.render !== "function") {
      throw new Error(`Module must declare process() or render(): ${moduleDefinition.id}`);
    }
  }
}

