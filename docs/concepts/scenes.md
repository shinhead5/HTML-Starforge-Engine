# Scenes

Scenes encapsulate game states like menus, levels, and overlays.

## Lifecycle

- `init` (once)
- `enter`
- `update`
- `fixedUpdate`
- `render`
- `exit`
- `dispose`

## Overlays

SceneManager supports a stack for pause menus and UI overlays:

```ts
engine.scenes.pushOverlay("pause", engine);
engine.scenes.popOverlay(engine);
```

## Scene Stack Patterns

Common patterns include:

- **Pause overlay**: push an overlay that blocks input to the underlying scene.
- **HUD overlay**: render UI on top without blocking updates.
- **Modal dialogs**: pause the game while a prompt is visible.

## Scene Transitions

Use your own tweening or fade logic to implement transitions. For example:

```ts
class FadeScene extends Scene {
  private alpha = 0;
  update(engine, dt) {
    this.alpha = Math.min(1, this.alpha + dt);
    if (this.alpha >= 1) {
      engine.scenes.start("next", engine);
    }
  }
  render(engine, renderer) {
    renderer.drawRect({ x: 0, y: 0, width: 1280, height: 720 }, new Color(0, 0, 0, this.alpha), true);
  }
}
```

## Scene Resources

Each scene has its own ECS world. If you need to hand off data between scenes, use the engine or a shared module.

## Scene Composition Tips

- Use a base scene class if you have shared behavior.
- Keep UI setup inside the scene so it's easy to dispose.
- Avoid keeping global mutable state when a scene can own it.

## Loading Screens

Use a dedicated loading scene to show progress while assets load. When the manifest finishes, transition to the next scene.

```ts
class LoadingScene extends Scene {
  async enter(engine) {
    await engine.assets.loadManifest(manifest, (progress) => {
      this.progress = progress.loaded / progress.total;
    });
    engine.scenes.start("play", engine);
  }
}
```
