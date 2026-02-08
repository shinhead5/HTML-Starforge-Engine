import type { DrawSpriteOptions, SpriteSource } from "../Renderer";

export type SpriteCommand = {
  source: SpriteSource;
  options: DrawSpriteOptions;
};

export class SpriteBatch {
  private queue: SpriteCommand[] = [];

  add(source: SpriteSource, options: DrawSpriteOptions) {
    this.queue.push({ source, options });
  }

  flush(draw: (command: SpriteCommand) => void) {
    for (const command of this.queue) {
      draw(command);
    }
    this.queue = [];
  }

  get size() {
    return this.queue.length;
  }
}
