# Starforge Engine

Starforge Engine is a TypeScript-first HTML5 game engine focused on clarity, performance, and an ergonomic API. It ships with an ECS, scene system, renderer abstraction (Canvas2D today, extensible to WebGL), asset pipeline, audio mixer, input bindings, physics, tilemaps, UI, tweening, and debugging tools.

> **Status:** This repository includes the engine as a reusable package and a fully playable sandbox game that demonstrates advanced features.

## Quick Start

```bash
pnpm install
pnpm dev
```

Then open the sandbox app at the printed local URL.

### Tiny API Example

```ts
import { Engine, CanvasRenderer } from "@starforge/engine";
import { BootScene } from "./game/BootScene";

const canvas = document.querySelector<HTMLCanvasElement>("#game")!;
const engine = new Engine({
  renderer: new CanvasRenderer(canvas),
  width: 1280,
  height: 720,
  pixelRatio: "auto",
  fixedTimeStep: 1 / 60,
});

engine.scenes.add("boot", new BootScene());
engine.scenes.start("boot");
engine.start();
```

## Repository Layout

```
/
  packages/engine   # The Starforge Engine package
  apps/sandbox      # Example game using the engine
  docs/             # Concepts, API, and guides
```

## Scripts

- `pnpm dev` – run the sandbox app
- `pnpm build` – build engine + sandbox
- `pnpm lint` – lint all packages
- `pnpm format` – format with Prettier
- `pnpm test` – engine unit tests
- `pnpm test:e2e` – Playwright smoke test
- `pnpm typecheck` – TypeScript type checks

## Engine Features

- **ECS**: entities as numeric IDs, typed components, queries, resources.
- **Scenes**: stack-based scene manager with overlays.
- **Rendering**: Canvas2D renderer, sprite batching, camera.
- **Assets**: manifest-driven loader with progress callbacks.
- **Input**: keyboard/mouse/gamepad with action bindings.
- **Physics**: AABB bodies, spatial hash broadphase, collision resolution.
- **Tilemaps**: JSON tilemap + A* pathfinding.
- **UI**: Canvas UI elements + layout containers.
- **Audio**: WebAudio mixer, buses, music + sfx.
- **Debugging**: overlay metrics + gizmo draws.

## How to Extend

### Add a Scene

1. Create a new scene class extending `Scene`.
2. Register it in `engine.scenes.add`.
3. Call `engine.scenes.start` or `pushOverlay`.

### Add a System

1. Define a system with `update(world, dt)`.
2. Register it with the scene's ECS world.

### Add an Entity

1. Call `world.createEntity()`.
2. Add components via `world.add`.

## Publishing the Engine

The engine lives in `packages/engine` and is already configured as a library. To publish:

1. Update version in `packages/engine/package.json`.
2. Run `pnpm -C packages/engine build`.
3. Publish to npm with `pnpm -C packages/engine publish`.

See docs for deeper guides.

## Architecture Overview

Starforge Engine is built around a few core pillars:

1. **Engine Core** – owns time, scenes, input, and renderer.
2. **ECS World** – manages entities, components, resources, and systems.
3. **Renderer Abstraction** – Canvas2D today, future WebGL tomorrow.
4. **Tooling** – tests, linting, CI, and docs live in-repo.

### Core Loop

The engine loop performs the following steps each frame:

- Update time and input
- Run fixed updates (physics)
- Update current scene
- Render scene stack
- Render debug overlay

### Renderer Design

The renderer interface keeps drawing concerns separate from gameplay logic. You can build a WebGL renderer later without rewriting systems. The Canvas renderer already follows the interface, so you can swap it as needed.

### Scene Stack

A scene stack lets you:

- Pause gameplay with an overlay
- Add modal dialogs or inventory screens
- Display debugging overlays without disrupting the world

## Example Gameplay Features

The sandbox game includes:

- Top-down movement and shooting
- Enemy AI using A* pathfinding on the tile grid
- Physics collisions against static walls
- HUD showing health and score
- Pause overlay and debug toggles

## Developing New Features

### Add a New Component

```ts
const Mana = createComponent<{ current: number; max: number }>("Mana");
world.add(entity, Mana, { current: 100, max: 100 });
```

### Add a New System

```ts
class RegenSystem {
  update(world, dt) {
    for (const entity of world.query(Mana).entities(world)) {
      const mana = world.get(entity, Mana);
      mana.current = Math.min(mana.max, mana.current + 10 * dt);
    }
  }
}
```

### Add a New Scene

```ts
engine.scenes.add("inventory", new InventoryScene());
engine.scenes.pushOverlay("inventory", engine);
```

## Publishing Workflow

1. Update versions in the root and engine package.
2. Run `pnpm build`.
3. Publish the engine package:

```bash
pnpm -C packages/engine publish
```

## Contribution Tips

- Keep pull requests focused.
- Add docs when the API changes.
- Prefer readable, commented code for complex systems.

## FAQ

### Why Canvas2D?

Canvas2D is fast to iterate on, supported everywhere, and plenty for 2D games. The renderer abstraction makes it straightforward to add WebGL later without reworking the rest of the engine.

### Can I use this for commercial projects?

Yes. The engine is MIT licensed.

### How do I add sound effects?

Load the audio buffer via the AssetManager, then use the Sound class to play it:

```ts
const laser = new Sound(engine.assets.getAudio("laser"), engine.audio, "sfx");
laser.play();
```

## Engine Package Structure

The engine package is organized to keep systems easy to find:

```
packages/engine/src/
  core/     # Engine, Time, Logger
  ecs/      # ECS runtime
  scene/    # Scene system
  math/     # Vectors, matrices, color, easing
  render/   # Renderer interface + Canvas2D renderer
  assets/   # AssetManager + loaders
  input/    # Keyboard, mouse, gamepad, bindings
  audio/    # Audio bus + Sound/Music
  physics/  # AABB physics world
  tilemap/  # Tilemap + A* pathfinding
  ui/       # Simple canvas UI
  tween/    # Tweening and easing
  debug/    # Debug overlay + gizmos
  utils/    # Assertions and utilities
```

## CI Workflow

GitHub Actions runs the following checks:

- Install dependencies via pnpm
- Lint TypeScript and format rules
- Typecheck all packages
- Run Vitest unit tests
- Build engine and sandbox
- Install Playwright browsers and run smoke tests

## Testing Philosophy

- **Unit tests** validate math, ECS, and physics logic.
- **E2E tests** ensure the sandbox app boots and draws a canvas.
- **Typechecking** enforces strict TypeScript usage.

## Tips for Custom Renderers

1. Implement the `Renderer` interface.
2. Manage any GPU resources internally.
3. Keep draw calls in world space.
4. Respect the camera transform in `setCamera`.

## Common Recipes

### Screen Shake

```ts
const shake = { value: 0 };
const tweens = new TweenManager();

tweens.tween(shake, { value: 6 }, 0.1, Easing.easeOutQuad, () => {
  tweens.tween(shake, { value: 0 }, 0.3);
});
```

Apply the shake by offsetting the camera each render.

### Sprite Animation

```ts
const sheet = new SpriteSheet(image, new Vec2(32, 32));
const walk = new Animation(sheet, [0, 1, 2, 3], 0.1, true);
walk.update(dt);
const sprite = walk.getFrame();
renderer.drawSprite(sprite.toSource(), { position, size: sprite.size });
```

### Pathfinding

```ts
const path = AStar.findPath(tilemap, start, goal, false);
```

Use the returned path to drive enemy movement across the tile grid.

## Future Extensions

- WebGL renderer with the same `Renderer` interface
- Editor tooling for scenes and tilemaps
- Particle system module

Starforge Engine is designed so these features can be added without reworking the core architecture.

## Design Principles

- **Ergonomics**: the API should feel obvious on the first use.
- **Modularity**: each subsystem is replaceable and testable.
- **Performance**: reasonable defaults for draw calls and allocations.
- **Transparency**: no hidden magic; what you see is what runs.

## Glossary

- **Scene**: a container for gameplay state and systems.
- **System**: a unit of logic that processes components.
- **Component**: data attached to entities.
- **Resource**: a singleton-like value stored in the ECS world.

## Troubleshooting

### Build fails on CI

- Make sure `pnpm install` ran successfully.
- Verify the lint rules and TypeScript errors locally.
- Check that Playwright browsers are installed.

### Assets return 404

- Assets in `public/` are served from `/`.
- If you move assets, update the manifest paths.

### Sprites are blurry

- Force `pixelRatio: 1` and scale the canvas manually.
- Use nearest-neighbor scaling on the canvas if needed.

## License

MIT

## Release Checklist

- [ ] Update changelog
- [ ] Verify `pnpm test` passes
- [ ] Verify `pnpm test:e2e` passes
- [ ] Update version numbers
- [ ] Tag release in git

## Contact

For questions or feedback, open an issue in the repository.

Happy forging!
