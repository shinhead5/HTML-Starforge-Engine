import { Color } from "../../math/Color";
import { Rect } from "../../math/Rect";
import { Vec2 } from "../../math/Vec2";
import type { DrawSpriteOptions, Renderer, SpriteSource } from "../Renderer";
import { Camera2D } from "./Camera2D";
import { SpriteBatch } from "./SpriteBatch";

export class CanvasRenderer implements Renderer {
  private ctx: CanvasRenderingContext2D;
  private size = new Vec2();
  private pixelRatio = 1;
  private camera: Camera2D | null = null;
  private batch = new SpriteBatch();
  private drawCalls = 0;

  constructor(private canvas: HTMLCanvasElement) {
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      throw new Error("Canvas2D context not available");
    }
    this.ctx = ctx;
  }

  resize(width: number, height: number, pixelRatio: number) {
    this.pixelRatio = pixelRatio;
    this.size.set(width, height);
    this.canvas.width = Math.floor(width * pixelRatio);
    this.canvas.height = Math.floor(height * pixelRatio);
    this.canvas.style.width = `${width}px`;
    this.canvas.style.height = `${height}px`;
    this.ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
  }

  beginFrame() {
    this.drawCalls = 0;
  }

  endFrame() {
    this.batch.flush((command) => this.drawSpriteInternal(command.source, command.options));
  }

  clear(color = new Color(20, 20, 30, 1)) {
    this.ctx.fillStyle = color.toString();
    this.ctx.fillRect(0, 0, this.size.x, this.size.y);
  }

  drawSprite(source: SpriteSource, options: DrawSpriteOptions) {
    this.batch.add(source, options);
  }

  drawRect(rect: Rect, color: Color, fill = true) {
    this.ctx.strokeStyle = color.toString();
    this.ctx.fillStyle = color.toString();
    if (fill) {
      this.ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
    } else {
      this.ctx.strokeRect(rect.x, rect.y, rect.width, rect.height);
    }
    this.drawCalls += 1;
  }

  drawText(text: string, position: Vec2, color: Color, font = "16px sans-serif") {
    this.ctx.fillStyle = color.toString();
    this.ctx.font = font;
    this.ctx.fillText(text, position.x, position.y);
    this.drawCalls += 1;
  }

  setCamera(camera: Camera2D | null) {
    this.camera = camera;
  }

  getDrawCalls() {
    return this.drawCalls + this.batch.size;
  }

  private drawSpriteInternal(source: SpriteSource, options: DrawSpriteOptions) {
    const { position, size, rotation = 0, tint, origin = new Vec2(0.5, 0.5) } = options;
    const ctx = this.ctx;
    ctx.save();
    if (this.camera) {
      ctx.translate(this.size.x / 2, this.size.y / 2);
      ctx.scale(this.camera.zoom, this.camera.zoom);
      ctx.rotate(this.camera.rotation);
      ctx.translate(-this.camera.position.x, -this.camera.position.y);
    }
    ctx.translate(position.x, position.y);
    ctx.rotate(rotation);
    ctx.translate(-size.x * origin.x, -size.y * origin.y);
    if (tint) {
      ctx.globalAlpha = tint.a;
    }
    ctx.drawImage(
      source.image,
      source.source.x,
      source.source.y,
      source.source.width,
      source.source.height,
      0,
      0,
      size.x,
      size.y
    );
    ctx.restore();
    this.drawCalls += 1;
  }
}
