import { Body, Color, Gizmos, Music, Rect, Scene, Sound, Tilemap, TilemapRenderer, Vec2 } from "@starforge/engine";
import type { Engine, Renderer } from "@starforge/engine";
import { EnemyAISystem } from "./systems/EnemyAISystem";
import { PhysicsSystem } from "./systems/PhysicsSystem";
import { PlayerControlSystem } from "./systems/PlayerControlSystem";
import { RenderSystem } from "./systems/RenderSystem";
import { UISystem } from "./systems/UISystem";
import { createEnemy } from "./entities/Enemy";
import { createPlayer } from "./entities/Player";
import { HUD } from "./ui/HUD";
import {
  EnemyTag,
  Health,
  PlayerTag,
  Position,
  ProjectileTag
} from "./GameComponents";
import { PhysicsWorld, type TilemapData } from "@starforge/engine";

export class PlayScene extends Scene {
  private renderSystem = new RenderSystem();
  private playerSystem = new PlayerControlSystem();
  private enemySystem = new EnemyAISystem();
  private physicsSystem = new PhysicsSystem();
  private tilemap?: Tilemap;
  private tileRenderer?: TilemapRenderer;
  private hud = new HUD();
  private uiSystem = new UISystem(this.hud.root);
  private score = 0;
  private music?: Music;
  private shootSound?: Sound;
  private hitSound?: Sound;
  private showGrid = false;

  init(engine: Engine) {
    engine.input.bindings.bind("left", { keys: ["ArrowLeft", "KeyA"], buttons: [14] });
    engine.input.bindings.bind("right", { keys: ["ArrowRight", "KeyD"], buttons: [15] });
    engine.input.bindings.bind("up", { keys: ["ArrowUp", "KeyW"], buttons: [12] });
    engine.input.bindings.bind("down", { keys: ["ArrowDown", "KeyS"], buttons: [13] });
    engine.input.bindings.bind("shoot", { keys: ["Space"], buttons: [0] });

    const levelData = engine.assets.getJson<TilemapData>("level1");
    this.tilemap = new Tilemap(levelData);
    this.tileRenderer = new TilemapRenderer(engine.assets.getImage("tiles"), this.tilemap.data.tileSize);

    const physics = new PhysicsWorld();
    for (const layer of this.tilemap.data.layers) {
      if (!layer.solid) continue;
      for (let y = 0; y < layer.height; y += 1) {
        for (let x = 0; x < layer.width; x += 1) {
          if (layer.data[y * layer.width + x] === 0) continue;
          physics.add(
            new Body({
              position: new Vec2(x * this.tilemap.data.tileSize, y * this.tilemap.data.tileSize),
              size: new Vec2(this.tilemap.data.tileSize, this.tilemap.data.tileSize),
              type: "static",
              velocity: new Vec2(0, 0),
              gravity: new Vec2(0, 0)
            })
          );
        }
      }
    }

    this.world.resources.set("physics", physics);
    this.world.resources.set("input", engine.input);
    this.world.resources.set("tilemap", this.tilemap);

    this.world.addSystem(this.playerSystem);
    this.world.addSystem(this.enemySystem);
    this.world.addSystem(this.physicsSystem);

    createPlayer(this.world, 100, 100);
    for (let i = 0; i < 6; i += 1) {
      createEnemy(this.world, 400 + i * 40, 300);
    }

    this.music = new Music(engine.assets.getAudio("music"), engine.audio);
    this.music.play(true);
    this.shootSound = new Sound(engine.assets.getAudio("shoot"), engine.audio, "sfx");
    this.hitSound = new Sound(engine.assets.getAudio("hit"), engine.audio, "sfx");
  }

  update(engine: Engine, dt: number) {
    if (engine.input.keyboard.wasPressed("Escape")) {
      engine.scenes.pushOverlay("pause", engine);
    }

    if (engine.input.keyboard.wasPressed("F2")) {
      this.showGrid = !this.showGrid;
    }

    this.world.update(dt);

    const playerEntity = [...this.world.query(PlayerTag, Position, Health).entities(this.world)][0];
    const playerHealth = playerEntity ? this.world.get(playerEntity, Health).current : 0;
    this.hud.update(playerHealth, this.score);

    for (const projectile of this.world.query(ProjectileTag, Position).entities(this.world)) {
      const projPos = this.world.get(projectile, Position);
      const projBounds = new Rect(projPos.x, projPos.y, 10, 10);
      for (const enemy of this.world.query(EnemyTag, Position, Health).entities(this.world)) {
        const enemyPos = this.world.get(enemy, Position);
        const enemyBounds = new Rect(enemyPos.x, enemyPos.y, 26, 26);
        if (projBounds.intersects(enemyBounds)) {
          const health = this.world.get(enemy, Health);
          health.current -= this.world.get(projectile, ProjectileTag).damage;
          this.hitSound?.play(0.6);
          this.world.removeEntity(projectile);
          if (health.current <= 0) {
            this.world.removeEntity(enemy);
            this.score += 10;
          }
          break;
        }
      }
    }

    if (engine.input.actionPressed("shoot")) {
      this.shootSound?.play(0.5);
    }
  }

  render(engine: Engine, renderer: Renderer) {
    if (!this.tilemap || !this.tileRenderer) return;
    renderer.clear(new Color(12, 14, 24, 1));
    this.tileRenderer.renderLayer(renderer, this.tilemap.getLayer("ground"));
    this.tileRenderer.renderLayer(renderer, this.tilemap.getLayer("walls"));
    this.renderSystem.render(renderer, engine.assets, this.world);
    if (this.showGrid) {
      Gizmos.drawGrid(renderer, this.tilemap.data.width * this.tilemap.data.tileSize, this.tilemap.data.height * this.tilemap.data.tileSize, this.tilemap.data.tileSize);
    }
    this.uiSystem.render(renderer);
  }
}
