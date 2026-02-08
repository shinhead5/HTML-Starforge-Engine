import { Rect } from "../../math/Rect";
import { Vec2 } from "../../math/Vec2";
import type { SpriteSource } from "../Renderer";

export class Sprite {
  constructor(public image: CanvasImageSource, public source: Rect, public size: Vec2) {}

  toSource(): SpriteSource {
    return { image: this.image, source: this.source };
  }
}
