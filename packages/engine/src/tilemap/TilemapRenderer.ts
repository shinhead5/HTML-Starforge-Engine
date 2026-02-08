import { Rect } from "../math/Rect";
import { Vec2 } from "../math/Vec2";
import type { Renderer } from "../render/Renderer";
import type { TileLayer } from "./Tilemap";

export class TilemapRenderer {
  constructor(private image: CanvasImageSource, private tileSize: number) {}

  renderLayer(renderer: Renderer, layer: TileLayer) {
    const cols = Math.floor((this.image as HTMLImageElement).width / this.tileSize);
    for (let y = 0; y < layer.height; y += 1) {
      for (let x = 0; x < layer.width; x += 1) {
        const tile = layer.data[y * layer.width + x];
        if (tile === 0) continue;
        const index = tile - 1;
        const sx = (index % cols) * this.tileSize;
        const sy = Math.floor(index / cols) * this.tileSize;
        renderer.drawSprite(
          { image: this.image, source: new Rect(sx, sy, this.tileSize, this.tileSize) },
          {
            position: new Vec2(x * this.tileSize, y * this.tileSize),
            size: new Vec2(this.tileSize, this.tileSize)
          }
        );
      }
    }
  }
}
