import { Rect } from "../math/Rect";
import type { Body } from "./Body";

export const Colliders = {
  aabb(body: Body) {
    return new Rect(body.position.x, body.position.y, body.size.x, body.size.y);
  }
};
