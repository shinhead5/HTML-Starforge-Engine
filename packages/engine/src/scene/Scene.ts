import type { Engine } from "../core/Engine";
import type { Renderer } from "../render/Renderer";
import { World } from "../ecs/World";

export class Scene {
  readonly world = new World();
  private initialized = false;

  init(_engine: Engine) {}

  enter(_engine: Engine) {}

  update(_engine: Engine, _dt: number) {
    this.world.update(_dt);
  }

  fixedUpdate(_engine: Engine, _dt: number) {}

  render(_engine: Engine, _renderer: Renderer) {}

  exit(_engine: Engine) {}

  dispose() {}

  ensureInit(engine: Engine) {
    if (!this.initialized) {
      this.init(engine);
      this.initialized = true;
    }
  }
}
