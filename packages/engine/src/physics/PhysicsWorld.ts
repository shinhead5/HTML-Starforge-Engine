import { Vec2 } from "../math/Vec2";
import { Colliders } from "./Colliders";
import type { Body } from "./Body";
import type { Collision } from "./Collision";

export class PhysicsWorld {
  private bodies = new Set<Body>();
  private cellSize = 128;
  private grid = new Map<string, Body[]>();

  add(body: Body) {
    this.bodies.add(body);
  }

  remove(body: Body) {
    this.bodies.delete(body);
  }

  step(dt: number) {
    this.rebuildGrid();
    for (const body of this.bodies) {
      if (body.type === "static") continue;
      body.onGround = false;
      body.velocity.x += body.gravity.x * dt;
      body.velocity.y += body.gravity.y * dt;
      body.position.x += body.velocity.x * dt;
      body.position.y += body.velocity.y * dt;

      const candidates = this.getCandidates(body);
      for (const other of candidates) {
        if (other === body) continue;
        const collision = this.testCollision(body, other);
        if (collision) {
          this.resolve(body, other, collision);
        }
      }
    }
  }

  private rebuildGrid() {
    this.grid.clear();
    for (const body of this.bodies) {
      const rect = Colliders.aabb(body);
      const minX = Math.floor(rect.x / this.cellSize);
      const minY = Math.floor(rect.y / this.cellSize);
      const maxX = Math.floor((rect.x + rect.width) / this.cellSize);
      const maxY = Math.floor((rect.y + rect.height) / this.cellSize);
      for (let y = minY; y <= maxY; y += 1) {
        for (let x = minX; x <= maxX; x += 1) {
          const key = `${x},${y}`;
          const cell = this.grid.get(key) ?? [];
          cell.push(body);
          this.grid.set(key, cell);
        }
      }
    }
  }

  private getCandidates(body: Body) {
    const rect = Colliders.aabb(body);
    const minX = Math.floor(rect.x / this.cellSize);
    const minY = Math.floor(rect.y / this.cellSize);
    const maxX = Math.floor((rect.x + rect.width) / this.cellSize);
    const maxY = Math.floor((rect.y + rect.height) / this.cellSize);
    const results = new Set<Body>();
    for (let y = minY; y <= maxY; y += 1) {
      for (let x = minX; x <= maxX; x += 1) {
        const key = `${x},${y}`;
        const cell = this.grid.get(key);
        if (cell) {
          for (const entry of cell) results.add(entry);
        }
      }
    }
    return results;
  }

  private testCollision(a: Body, b: Body): Collision | null {
    const rectA = Colliders.aabb(a);
    const rectB = Colliders.aabb(b);
    if (!rectA.intersects(rectB)) return null;

    const overlapX = Math.min(rectA.x + rectA.width - rectB.x, rectB.x + rectB.width - rectA.x);
    const overlapY = Math.min(rectA.y + rectA.height - rectB.y, rectB.y + rectB.height - rectA.y);

    if (overlapX < overlapY) {
      const normal = new Vec2(rectA.x < rectB.x ? -1 : 1, 0);
      return { normal, penetration: overlapX };
    }
    const normal = new Vec2(0, rectA.y < rectB.y ? -1 : 1);
    return { normal, penetration: overlapY };
  }

  private resolve(body: Body, other: Body, collision: Collision) {
    if (other.type === "dynamic") return;
    body.position.x += collision.normal.x * collision.penetration;
    body.position.y += collision.normal.y * collision.penetration;
    if (collision.normal.y < 0) {
      body.onGround = true;
    }
    if (collision.normal.x !== 0) {
      body.velocity.x *= -body.restitution;
    }
    if (collision.normal.y !== 0) {
      body.velocity.y *= -body.restitution;
      body.velocity.x *= body.friction;
    }
  }
}
