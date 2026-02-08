# Rendering

Starforge Engine defaults to Canvas2D with a renderer abstraction that can later be swapped for WebGL.

## Renderer Interface

The renderer supports:

- `beginFrame` / `endFrame`
- `clear`
- `drawSprite`
- `drawRect`
- `drawText`
- `setCamera`

## Camera2D

The `Camera2D` tracks position, zoom, and optional bounds. It converts world coordinates into screen space while keeping the camera centered on a target.

## Sprite Batching

`CanvasRenderer` batches sprite draw calls to minimize state changes. The batch flushes at the end of each frame.

## Draw Order

The renderer is immediate-mode, so you control draw order explicitly:

1. Clear background
2. Draw tilemap
3. Draw entities
4. Draw UI

## Camera Follow

A simple camera follow loop:

```ts
camera.position.x = player.position.x;
camera.position.y = player.position.y;
camera.clampToBounds(new Vec2(worldWidth, worldHeight));
renderer.setCamera(camera);
```

## Text Rendering

Text is rendered via `CanvasRenderingContext2D` with a font string. Use a monospace font for debug overlays.

```ts
renderer.drawText("Score: 100", new Vec2(20, 20), new Color(255, 255, 255, 1), "18px monospace");
```

## Canvas Performance Notes

- Avoid changing `globalCompositeOperation` every draw.
- Group similar draws together.
- Precompute rects and sprite sources when possible.

## Pixel Ratio

The engine sets a pixel ratio for crisp rendering on high-DPI displays. If your game uses pixel art, consider setting `pixelRatio: 1` and integer scaling.

## Fonts

Canvas font strings follow CSS rules. Example:

```ts
renderer.drawText("Wave 1", new Vec2(600, 40), new Color(255, 255, 255, 1), "24px 'Press Start 2P'");
```

## UI Rendering

The built-in UI system renders in canvas space, which means it ignores camera transforms by default. Draw UI after world rendering so it stays screen-aligned.

## Parallax Backgrounds

You can render multiple background layers with different camera offsets:

```ts
const parallax = camera.position.clone().scale(0.5);
renderer.drawSprite(source, { position: parallax, size });
```

This creates a depth effect without complex shaders.

## Next Steps

Experiment with a WebGL renderer by keeping the same Renderer interface and swapping implementations in the Engine constructor.
