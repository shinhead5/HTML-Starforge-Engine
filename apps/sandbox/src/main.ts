import { CanvasRenderer, Engine } from "@starforge/engine";
import { BootScene } from "./game/BootScene";
import { PauseScene } from "./game/PauseScene";
import { PlayScene } from "./game/PlayScene";
import { TitleScene } from "./game/TitleScene";

const canvas = document.querySelector<HTMLCanvasElement>("#game");
if (!canvas) {
  throw new Error("Canvas element not found");
}

const engine = new Engine({
  renderer: new CanvasRenderer(canvas),
  width: 1280,
  height: 720,
  pixelRatio: "auto",
  fixedTimeStep: 1 / 60
});

engine.scenes.add("boot", new BootScene());
engine.scenes.add("title", new TitleScene());
engine.scenes.add("play", new PlayScene());
engine.scenes.add("pause", new PauseScene());

engine.scenes.start("boot", engine);
engine.start();
