import { Time } from "./Time";
import { Logger } from "./Logger";
import { SceneManager } from "../scene/SceneManager";
import { type Renderer } from "../render/Renderer";
import { Input } from "../input/Input";
import { AssetManager } from "../assets/AssetManager";
import { AudioBus } from "../audio/AudioBus";
import { DebugOverlay } from "../debug/DebugOverlay";

export type PixelRatioOption = "auto" | number;

export interface EngineOptions {
  renderer: Renderer;
  width: number;
  height: number;
  pixelRatio: PixelRatioOption;
  fixedTimeStep?: number;
}

export class Engine {
  readonly time: Time;
  readonly scenes: SceneManager;
  readonly input: Input;
  readonly assets: AssetManager;
  readonly audio: AudioBus;
  readonly debug: DebugOverlay;

  private readonly logger = new Logger("Engine");
  private readonly renderer: Renderer;
  private lastFrame = 0;
  private running = false;

  constructor(private options: EngineOptions) {
    this.renderer = options.renderer;
    this.time = new Time(options.fixedTimeStep ?? 1 / 60);
    this.scenes = new SceneManager();
    this.input = new Input();
    const audioContext = new AudioContext();
    this.assets = new AssetManager(audioContext);
    this.audio = new AudioBus(audioContext);
    this.debug = new DebugOverlay(this);

    this.applySize();
    window.addEventListener("resize", () => this.applySize());
  }

  private applySize() {
    const ratio = this.options.pixelRatio === "auto" ? window.devicePixelRatio || 1 : this.options.pixelRatio;
    this.renderer.resize(this.options.width, this.options.height, ratio);
  }

  start() {
    if (this.running) return;
    this.running = true;
    this.lastFrame = performance.now();
    const tick = (time: number) => {
      if (!this.running) return;
      const delta = (time - this.lastFrame) / 1000;
      this.lastFrame = time;

      this.time.update(delta);

      while (this.time.shouldFixedUpdate()) {
        this.scenes.fixedUpdate(this, this.time.fixedDelta);
        this.time.consumeFixedDelta();
      }

      this.scenes.update(this, this.time.delta);
      this.renderer.beginFrame();
      this.scenes.render(this, this.renderer);
      this.debug.render(this.renderer);
      this.renderer.endFrame();
      this.input.update();

      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    this.logger.info("Engine started");
  }

  stop() {
    this.running = false;
    this.logger.info("Engine stopped");
  }
}
