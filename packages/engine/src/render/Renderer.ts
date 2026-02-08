import type { Color } from "../math/Color";
import type { Rect } from "../math/Rect";
import type { Vec2 } from "../math/Vec2";
import type { Camera2D } from "./canvas/Camera2D";

export interface SpriteSource {
  image: CanvasImageSource;
  source: Rect;
}

export interface DrawSpriteOptions {
  position: Vec2;
  size: Vec2;
  rotation?: number;
  tint?: Color;
  origin?: Vec2;
}

export interface Renderer {
  resize(width: number, height: number, pixelRatio: number): void;
  beginFrame(): void;
  endFrame(): void;
  clear(color?: Color): void;
  drawSprite(source: SpriteSource, options: DrawSpriteOptions): void;
  drawRect(rect: Rect, color: Color, fill?: boolean): void;
  drawText(text: string, position: Vec2, color: Color, font?: string): void;
  setCamera(camera: Camera2D | null): void;
  getDrawCalls(): number;
}
