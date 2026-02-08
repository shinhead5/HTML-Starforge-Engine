import type { PhysicsWorld, System, World } from "@starforge/engine";
import { BodyRef, Position, Velocity } from "../GameComponents";

export class PhysicsSystem implements System {
  update(world: World, dt: number) {
    const physics = world.resources.get<PhysicsWorld>("physics");
    for (const entity of world.query(BodyRef, Position, Velocity).entities(world)) {
      const body = world.get(entity, BodyRef).body;
      physics.add(body);
      const position = world.get(entity, Position);
      const velocity = world.get(entity, Velocity);
      body.position.x = position.x;
      body.position.y = position.y;
      body.velocity.x = velocity.x;
      body.velocity.y = velocity.y;
    }

    physics.step(dt);

    for (const entity of world.query(BodyRef, Position, Velocity).entities(world)) {
      const body = world.get(entity, BodyRef).body;
      const position = world.get(entity, Position);
      const velocity = world.get(entity, Velocity);
      position.x = body.position.x;
      position.y = body.position.y;
      velocity.x = body.velocity.x;
      velocity.y = body.velocity.y;
    }
  }
}
