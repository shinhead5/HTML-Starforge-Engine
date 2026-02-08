import { Color } from "../../math/Color";
import { Vec2 } from "../../math/Vec2";

export const Draw = {
  circle(ctx: CanvasRenderingContext2D, center: Vec2, radius: number, color: Color) {
    ctx.fillStyle = color.toString();
    ctx.beginPath();
    ctx.arc(center.x, center.y, radius, 0, Math.PI * 2);
    ctx.fill();
  }
};
