import { Vec2 } from "../math/Vec2";

export type Collision = {
  normal: Vec2;
  penetration: number;
};
