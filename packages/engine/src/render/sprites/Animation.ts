import { Sprite } from "./Sprite";
import { SpriteSheet } from "./SpriteSheet";

export class Animation {
  private elapsed = 0;

  constructor(
    private sheet: SpriteSheet,
    private frames: number[],
    private frameDuration: number,
    private loop = true
  ) {}

  update(dt: number) {
    this.elapsed += dt;
  }

  getFrame(): Sprite {
    const total = this.frames.length * this.frameDuration;
    const t = this.loop ? this.elapsed % total : Math.min(this.elapsed, total - this.frameDuration);
    const index = Math.floor(t / this.frameDuration);
    return this.sheet.getFrame(this.frames[index]);
  }

  reset() {
    this.elapsed = 0;
  }
}
