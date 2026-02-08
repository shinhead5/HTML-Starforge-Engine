import { Scene } from "@starforge/engine";
import type { AssetManifest, Engine } from "@starforge/engine";
import { inlineAssets } from "./assets/inlineAssets";

const manifest: AssetManifest = {
  assets: [
    { id: "tiles", type: "image", src: inlineAssets.tiles },
    { id: "player", type: "image", src: inlineAssets.player },
    { id: "enemy", type: "image", src: inlineAssets.enemy },
    { id: "projectile", type: "image", src: inlineAssets.projectile },
    { id: "shoot", type: "audio", src: inlineAssets.shoot },
    { id: "hit", type: "audio", src: inlineAssets.hit },
    { id: "music", type: "audio", src: inlineAssets.music },
    { id: "level1", type: "json", src: new URL("./levels/level1.json", import.meta.url).toString() }
  ]
};

export class BootScene extends Scene {
  async enter(engine: Engine) {
    await engine.assets.loadManifest(manifest);
    engine.scenes.start("title", engine);
  }
}
