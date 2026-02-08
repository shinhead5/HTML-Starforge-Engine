# ECS

Starforge Engine uses an Entity Component System (ECS) to keep game logic modular and fast.

## Core Ideas

- **Entities** are numeric IDs.
- **Components** are typed records registered by name.
- **Systems** run each frame and act on queries.

## Example

```ts
const Position = createComponent<{ x: number; y: number }>("Position");
const Velocity = createComponent<{ x: number; y: number }>("Velocity");

world.add(entity, Position, { x: 0, y: 0 });
world.add(entity, Velocity, { x: 10, y: 0 });
```

Use queries for efficient iteration:

```ts
for (const entity of world.query(Position, Velocity).entities(world)) {
  const position = world.get(entity, Position);
  const velocity = world.get(entity, Velocity);
  position.x += velocity.x * dt;
}
```

## Resources

Use resources for singletons:

```ts
world.resources.set("physics", physicsWorld);
const physics = world.resources.get<PhysicsWorld>("physics");
```

## Tags and Singletons

Tags are just components with empty objects. This keeps the system consistent while still letting you build expressive queries.

```ts
const PlayerTag = createComponent<Record<string, never>>("PlayerTag");
world.add(entity, PlayerTag, {});
```

Singleton-style data lives in resources:

```ts
world.resources.set("score", 0);
```

## Event Hooks

The ECS emits lifecycle events such as entity creation and removal. You can subscribe for instrumentation or gameplay reactions.

```ts
world.events.on("entityCreated", (id) => {
  console.log("Entity created", id);
});
```

## System Composition

Systems are intentionally tiny. Prefer composing multiple small systems over a single massive update loop.

- MovementSystem: updates positions
- CombatSystem: applies damage
- RenderSystem: draws sprites

This makes it easier to test and reuse logic across scenes.

## Debugging Queries

If a query returns zero entities, verify that:

1. Components were registered and added correctly.
2. Component names match exactly.
3. Entities were not removed earlier in the frame.

Adding a debug render system is often the fastest way to validate data flow.

## Best Practices

- Keep components data-only (no methods).
- Prefer numeric IDs over object references.
- Use resources for scene-level shared state.
- Avoid generating garbage in hot loops (reuse objects).

## Component Registration Patterns

Some teams prefer a single module that exports all component definitions. This keeps component names consistent and avoids accidental duplicates.

```ts
export const Position = createComponent<{ x: number; y: number }>("Position");
export const Velocity = createComponent<{ x: number; y: number }>("Velocity");
```

If you need optional data, add another component rather than making fields optional. This keeps query logic explicit.

## Query Optimization

Queries iterate over the first component store. To keep this fast:

- Put the most common component first.
- Avoid unnecessary components in queries.
- Remove entities when they are no longer active.

## Debug Component Dumps

You can dump component data for a particular entity to debug state:

```ts
console.log(world.get(entity, Position));
```

If you need full entity dumps, you can iterate over known component types and log what exists.

## Removing Entities

When removing an entity, all its components are removed from stores. If you need to perform cleanup, keep that logic in the system before calling `removeEntity`.

## Deterministic Updates

With a fixed timestep, system updates remain deterministic. Use `engine.time.fixedDelta` for physics and simulation while keeping rendering on variable delta.
