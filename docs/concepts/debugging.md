# Debugging

Starforge Engine ships with a debug overlay and gizmos.

## Debug Overlay

Press **F3** to toggle FPS, dt, and draw call stats.

## Gizmos

Use gizmo helpers for collision outlines and grids.

```ts
Gizmos.drawCollider(renderer, body);
Gizmos.drawGrid(renderer, width, height, cellSize);
```

## Performance Tips

- Keep draw calls low by batching sprites.
- Avoid allocations in tight loops (reuse Vec2 instances).
- Use the debug overlay to watch FPS and frame time.

## Visual Debugging

Use `Gizmos` to draw collider outlines, tile grids, or navigation paths. This is invaluable for quickly tuning physics and AI.

## Logging

Use the built-in `Logger` to keep debug statements scoped by subsystem:

```ts
const log = new Logger("AI");
log.debug("Enemy state", state);
```

## Deterministic Replay

If you need to reproduce a bug, seed your RNG and record player inputs each frame. Replaying the same inputs with the same seed should produce the same results.

## Visualizing Paths

To debug pathfinding, draw lines between grid points or highlight path tiles. This makes it easy to see why the AI chooses specific routes.

## Crash Reporting

For production builds, consider wiring error handlers to a logging service. Capture the scene name, FPS, and recent inputs to help reproduce issues.

## Visual Sanity Checks

Add temporary debug text for key variables (score, timers, AI state). Remove them before shipping.
