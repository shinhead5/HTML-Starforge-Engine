# Getting Started

This guide walks you through running the sandbox game and creating your first scene.

## Prerequisites

- Node.js 20+
- pnpm 9+

## Install

```bash
pnpm install
```

## Run the Sandbox

```bash
pnpm dev
```

Open the printed URL and you should see the Starforge sandbox game.

## Create a Scene

```ts
import { Scene } from "@starforge/engine";

export class MyScene extends Scene {
  enter() {
    console.log("Hello scene!");
  }
}
```

Register and start it:

```ts
engine.scenes.add("my-scene", new MyScene());
engine.scenes.start("my-scene", engine);
```

## Add a System

```ts
class MovementSystem {
  update(world, dt) {
    for (const entity of world.query(Position, Velocity).entities(world)) {
      const position = world.get(entity, Position);
      const velocity = world.get(entity, Velocity);
      position.x += velocity.x * dt;
      position.y += velocity.y * dt;
    }
  }
}
```

Add it to a world:

```ts
scene.world.addSystem(new MovementSystem());
```

## Load Assets

```ts
await engine.assets.loadManifest({
  assets: [
    { id: "player", type: "image", src: "/assets/player.png" },
    { id: "music", type: "audio", src: "/assets/music.wav" }
  ]
});
```

See `/docs/concepts` for deeper guides.

## Creating Entities

Entities are numeric IDs. Attach components to add data:

```ts
const entity = scene.world.createEntity();
scene.world.add(entity, Position, { x: 100, y: 200 });
scene.world.add(entity, Velocity, { x: 0, y: 0 });
```

## Rendering Sprites

Use `Renderable` components or call the renderer directly:

```ts
const image = engine.assets.getImage("player");
renderer.drawSprite(
  { image, source: new Rect(0, 0, 32, 32) },
  { position: new Vec2(100, 200), size: new Vec2(32, 32) }
);
```

## Tilemaps

Tilemaps are loaded from JSON:

```ts
const mapData = engine.assets.getJson<TilemapData>("level1");
const tilemap = new Tilemap(mapData);
const renderer = new TilemapRenderer(engine.assets.getImage("tiles"), tilemap.data.tileSize);
```

## Physics Setup

```ts
const physics = new PhysicsWorld();
scene.world.resources.set("physics", physics);
```

Each entity can hold a `Body` component that the PhysicsSystem syncs:

```ts
scene.world.add(entity, BodyRef, { body: new Body({ position: new Vec2(0, 0) }) });
```

## Audio Setup

```ts
const music = new Music(engine.assets.getAudio("music"), engine.audio);
music.play(true);
```

## Debugging

Toggle the debug overlay with **F3** to show FPS and draw calls.

## Scripts Reference

- `pnpm dev` – start the sandbox
- `pnpm build` – build all packages
- `pnpm test` – run engine tests
- `pnpm test:e2e` – run Playwright smoke test

## Step-by-Step: Building a Mini Level

1. Create a tilemap JSON.
2. Load it via `AssetManager`.
3. Render it in your scene.
4. Spawn entities aligned to tile coordinates.

Example tilemap snippet:

```json
{
  "width": 10,
  "height": 8,
  "tileSize": 32,
  "layers": [
    { "name": "ground", "width": 10, "height": 8, "data": [0,0,0] },
    { "name": "walls", "width": 10, "height": 8, "data": [1,1,1], "solid": true }
  ]
}
```

## Handling Pauses

To pause gameplay without stopping rendering, push an overlay scene:

```ts
if (engine.input.keyboard.wasPressed("Escape")) {
  engine.scenes.pushOverlay("pause", engine);
}
```

The overlay can render a translucent panel while the world beneath remains visible.

## Saving State

You can serialize ECS data by walking entities and components. For small games, store JSON snapshots of key components (position, health, inventory) and reload them on startup.

## Troubleshooting

**The game is black.**

- Ensure the canvas exists in `index.html`.
- Verify assets are loaded before starting the scene.
- Confirm that your renderer `clear` call happens each frame.

**No input is detected.**

- Call `engine.input.update()` once per frame (handled by Engine).
- Verify bindings use correct keyboard codes (`KeyW`, `ArrowUp`).

**Audio won't play.**

- Most browsers require a user gesture. Start music on the first click or keypress.
