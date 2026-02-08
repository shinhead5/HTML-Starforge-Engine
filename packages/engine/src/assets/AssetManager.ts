import { Logger } from "../core/Logger";
import { AudioLoader } from "./loaders/AudioLoader";
import { ImageLoader } from "./loaders/ImageLoader";
import { JsonLoader } from "./loaders/JsonLoader";
import type { AssetEntry, AssetManifest } from "./manifest/AssetManifest";

export type AssetProgress = {
  loaded: number;
  total: number;
  entry?: AssetEntry;
};

export class AssetManager {
  private images = new Map<string, HTMLImageElement>();
  private audio = new Map<string, AudioBuffer>();
  private json = new Map<string, unknown>();
  private logger = new Logger("Assets");
  private audioContext: AudioContext;

  constructor(audioContext: AudioContext = new AudioContext()) {
    this.audioContext = audioContext;
  }

  getImage(id: string) {
    const image = this.images.get(id);
    if (!image) {
      throw new Error(`Image asset missing: ${id}`);
    }
    return image;
  }

  getAudio(id: string) {
    const buffer = this.audio.get(id);
    if (!buffer) {
      throw new Error(`Audio asset missing: ${id}`);
    }
    return buffer;
  }

  getJson<T>(id: string): T {
    if (!this.json.has(id)) {
      throw new Error(`JSON asset missing: ${id}`);
    }
    return this.json.get(id) as T;
  }

  async loadManifest(manifest: AssetManifest, onProgress?: (progress: AssetProgress) => void, retries = 2) {
    const total = manifest.assets.length;
    let loaded = 0;
    for (const entry of manifest.assets) {
      await this.loadEntry(entry, retries);
      loaded += 1;
      onProgress?.({ loaded, total, entry });
    }
  }

  private async loadEntry(entry: AssetEntry, retries: number) {
    for (let attempt = 0; attempt <= retries; attempt += 1) {
      try {
        if (entry.type === "image") {
          const image = await new ImageLoader().load(entry.src);
          this.images.set(entry.id, image);
        } else if (entry.type === "audio") {
          const buffer = await new AudioLoader(this.audioContext).load(entry.src);
          this.audio.set(entry.id, buffer);
        } else if (entry.type === "json") {
          const json = await new JsonLoader().load(entry.src);
          this.json.set(entry.id, json);
        }
        return;
      } catch (error) {
        this.logger.warn(`Asset load failed (${entry.id}) attempt ${attempt + 1}`, error);
        if (attempt === retries) {
          throw error;
        }
      }
    }
  }
}
