# API Overview

## Core

- `Engine` – bootstrap and main loop
- `Time` – delta time and fixed timestep
- `EventBus` – lightweight event emitter

## ECS

- `World` – entities, components, and resources
- `createComponent` – component registration
- `System` – update loop

## Rendering

- `Renderer` – renderer abstraction
- `CanvasRenderer` – Canvas2D implementation
- `Camera2D` – camera transforms

## Assets

- `AssetManager` – manifest-based loader

## Input

- `Input` – action bindings + devices

## Audio

- `AudioBus`, `Sound`, `Music`

## Physics

- `PhysicsWorld`, `Body`

## Tilemaps

- `Tilemap`, `TilemapRenderer`, `AStar`

## UI

- `UIElement`, `Button`, `TextLabel`

## Tweening

- `Tween`, `TweenManager`

## Utilities

- `Assert.ok(value, message)` – guard invariants in debug builds
- `Pool` – reuse objects to avoid allocations
- `Signal` – lightweight observer utility

## Debug Tools

- `DebugOverlay` – FPS and draw call metrics
- `Gizmos` – collider and grid helpers

## Renderer Details

`CanvasRenderer` draws images with optional tint and rotation. It supports a basic sprite batch that queues draw calls and flushes at end of frame.

## Asset Pipeline

`AssetManager` wraps image/audio/json loading with caching and retries. Use `loadManifest` to preload level assets or split them per scene.

## Input Types

- `Keyboard` – `isDown`, `wasPressed`, `wasReleased`
- `Mouse` – position and button tracking
- `GamepadInput` – gamepad buttons and axes

## Physics Types

`Body` contains position, velocity, size, and material properties like restitution and friction. `PhysicsWorld` steps and resolves AABB collisions with a spatial hash broadphase.

## Example: Minimal Engine Boot

```ts
const engine = new Engine({
  renderer: new CanvasRenderer(canvas),
  width: 800,
  height: 600,
  pixelRatio: "auto"
});
engine.scenes.add("boot", new BootScene());
engine.scenes.start("boot", engine);
engine.start();
```

## Example: Simple Query

```ts
for (const entity of world.query(Position, Velocity).entities(world)) {
  const position = world.get(entity, Position);
  const velocity = world.get(entity, Velocity);
  position.x += velocity.x * dt;
}
```

## Example: UI Button

```ts
const button = new Button(20, 20, 180, 40);
button.text = "Start";
button.onClick = () => engine.scenes.start("play", engine);
```
