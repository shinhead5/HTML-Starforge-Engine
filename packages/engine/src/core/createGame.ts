import { CanvasRenderer } from "../render/canvas/CanvasRenderer";
import type { Scene } from "../scene/Scene";
import { Engine, type EngineOptions } from "./Engine";

export type CreateGameOptions = {
  canvas: HTMLCanvasElement;
  width: number;
  height: number;
  pixelRatio?: EngineOptions["pixelRatio"];
  fixedTimeStep?: EngineOptions["fixedTimeStep"];
  enableDebug?: boolean;
  scenes: Record<string, Scene>;
  startScene: string;
};

export const createGame = (options: CreateGameOptions) => {
  const engine = new Engine({
    renderer: new CanvasRenderer(options.canvas),
    width: options.width,
    height: options.height,
    pixelRatio: options.pixelRatio ?? "auto",
    fixedTimeStep: options.fixedTimeStep,
    enableDebug: options.enableDebug
  });

  for (const [key, scene] of Object.entries(options.scenes)) {
    engine.scenes.add(key, scene);
  }

  engine.scenes.start(options.startScene, engine);
  return engine;
};
