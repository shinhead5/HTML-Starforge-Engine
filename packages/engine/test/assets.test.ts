import { describe, expect, it } from "vitest";
import type { AssetManifest } from "../src/assets/manifest/AssetManifest";

const manifest: AssetManifest = {
  assets: [
    { id: "player", type: "image", src: "player.png" },
    { id: "shoot", type: "audio", src: "shoot.ogg" }
  ]
};

describe("assets", () => {
  it("keeps manifest entries", () => {
    expect(manifest.assets.length).toBe(2);
    expect(manifest.assets[0].id).toBe("player");
  });
});
