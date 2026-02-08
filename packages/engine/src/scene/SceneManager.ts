import type { Engine } from "../core/Engine";
import type { Renderer } from "../render/Renderer";
import { Scene } from "./Scene";

export class SceneManager {
  private scenes = new Map<string, Scene>();
  private stack: Scene[] = [];

  add(key: string, scene: Scene) {
    this.scenes.set(key, scene);
  }

  start(key: string, engine?: Engine) {
    const scene = this.get(key);
    this.clear(engine);
    if (engine) {
      scene.ensureInit(engine);
      scene.enter(engine);
    }
    this.stack.push(scene);
  }

  pushOverlay(key: string, engine: Engine) {
    const scene = this.get(key);
    scene.ensureInit(engine);
    scene.enter(engine);
    this.stack.push(scene);
  }

  popOverlay(engine: Engine) {
    const scene = this.stack.pop();
    if (scene) {
      scene.exit(engine);
    }
  }

  update(engine: Engine, dt: number) {
    const scene = this.stack[this.stack.length - 1];
    scene?.update(engine, dt);
  }

  fixedUpdate(engine: Engine, dt: number) {
    const scene = this.stack[this.stack.length - 1];
    scene?.fixedUpdate(engine, dt);
  }

  render(engine: Engine, renderer: Renderer) {
    for (const scene of this.stack) {
      scene.render(engine, renderer);
    }
  }

  private clear(engine?: Engine) {
    if (engine) {
      for (const scene of this.stack) {
        scene.exit(engine);
      }
    }
    this.stack = [];
  }

  private get(key: string) {
    const scene = this.scenes.get(key);
    if (!scene) {
      throw new Error(`Scene not found: ${key}`);
    }
    return scene;
  }
}
