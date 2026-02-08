import { createComponent } from "@starforge/engine";
import type { Body } from "@starforge/engine";
import type { Vec2 } from "@starforge/engine";

export const Position = createComponent<{ x: number; y: number }>("Position");
export const Velocity = createComponent<{ x: number; y: number }>("Velocity");
export const Renderable = createComponent<{ sprite: string; size: Vec2 }>("Renderable");
export const BodyRef = createComponent<{ body: Body }>("BodyRef");
export const Health = createComponent<{ current: number; max: number }>("Health");
export const PlayerTag = createComponent<Record<string, never>>("PlayerTag");
export const EnemyTag = createComponent<Record<string, never>>("EnemyTag");
export const ProjectileTag = createComponent<{ damage: number }>("ProjectileTag");
export const AIPath = createComponent<{ path: { x: number; y: number }[]; index: number }>("AIPath");
