import { Vec2 } from "../math/Vec2";

export type BodyType = "static" | "dynamic";

export class Body {
  position = new Vec2();
  velocity = new Vec2();
  size = new Vec2(16, 16);
  type: BodyType = "dynamic";
  restitution = 0.2;
  friction = 0.8;
  gravity = new Vec2(0, 1200);
  onGround = false;

  constructor(init?: Partial<Body>) {
    Object.assign(this, init);
  }
}
