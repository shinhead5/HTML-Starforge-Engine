# Input

Input supports keyboard, mouse, and gamepad with action bindings.

```ts
engine.input.bindings.bind("jump", { keys: ["Space"], buttons: [0] });
```

Then check actions in systems:

```ts
if (engine.input.actionPressed("jump")) {
  // jump
}
```

Input also tracks edge triggers: pressed, released, and held.

## Mouse Input

The mouse class tracks position and button states. Use it for aiming or UI interactions.

```ts
const mouse = engine.input.mouse;
if (mouse.wasPressed(0)) {
  console.log("Primary button clicked", mouse.position);
}
```

## Gamepad Input

Gamepad support maps to standard buttons and axes. Bindings allow you to map the same action to keyboard and controller.

```ts
engine.input.bindings.bind("dash", { keys: ["ShiftLeft"], buttons: [1] });
```

## Edge Triggers

Edge triggers are frame-based. Call `engine.input.update()` once per frame to keep them accurate.

## Input Buffering

For precise timing (e.g., fighting games), store a short buffer of recent inputs in your system:

```ts
const inputBuffer: string[] = [];
if (engine.input.actionPressed("attack")) {
  inputBuffer.push("attack");
}
```

## Pointer Lock

For mouse-driven games, consider using the Pointer Lock API and update your mouse tracking accordingly. This keeps cursor movement relative even when the pointer leaves the canvas.

## Axis Sampling

For analog movement, sample gamepad axes directly:

```ts
const x = engine.input.gamepad.axis(0);
const y = engine.input.gamepad.axis(1);
```

Clamp or apply deadzones to avoid drift.

## Rebinding Controls

Bindings are data-driven. Store them in JSON, then load and apply at runtime to support user remapping.

```ts
engine.input.bindings.bind("shoot", { keys: ["Space"], buttons: [0] });
```

## Mobile Considerations

For mobile builds, layer touch controls on top of the input system. Convert touch events into actions (e.g., "shoot") and reuse existing gameplay code.
