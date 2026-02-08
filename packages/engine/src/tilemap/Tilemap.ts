export type TileLayer = {
  name: string;
  data: number[];
  width: number;
  height: number;
  solid?: boolean;
};

export type TilemapData = {
  width: number;
  height: number;
  tileSize: number;
  layers: TileLayer[];
};

export class Tilemap {
  constructor(public data: TilemapData) {}

  getLayer(name: string) {
    const layer = this.data.layers.find((entry) => entry.name === name);
    if (!layer) {
      throw new Error(`Layer not found: ${name}`);
    }
    return layer;
  }

  getTile(layer: TileLayer, x: number, y: number) {
    if (x < 0 || y < 0 || x >= layer.width || y >= layer.height) return 0;
    return layer.data[y * layer.width + x];
  }

  isBlocked(x: number, y: number) {
    const solidLayers = this.data.layers.filter((layer) => layer.solid);
    return solidLayers.some((layer) => this.getTile(layer, x, y) !== 0);
  }
}
