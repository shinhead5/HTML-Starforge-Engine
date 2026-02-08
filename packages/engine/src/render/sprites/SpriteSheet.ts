import { Rect } from "../../math/Rect";
import { Vec2 } from "../../math/Vec2";
import { Sprite } from "./Sprite";

export class SpriteSheet {
  constructor(public image: CanvasImageSource, public frameSize: Vec2) {}

  getFrame(index: number) {
    const width = (this.image as HTMLImageElement).width;
    const columns = Math.max(1, Math.floor(width / this.frameSize.x));
    const x = (index % columns) * this.frameSize.x;
    const y = Math.floor(index / columns) * this.frameSize.y;
    return new Sprite(this.image, new Rect(x, y, this.frameSize.x, this.frameSize.y), this.frameSize.clone());
  }
}
