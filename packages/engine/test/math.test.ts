import { describe, expect, it } from "vitest";
import { Rect } from "../src/math/Rect";
import { Vec2 } from "../src/math/Vec2";

describe("math", () => {
  it("adds vectors", () => {
    const v = new Vec2(1, 2).add(new Vec2(3, 4));
    expect(v.x).toBe(4);
    expect(v.y).toBe(6);
  });

  it("intersects rects", () => {
    const a = new Rect(0, 0, 10, 10);
    const b = new Rect(5, 5, 10, 10);
    expect(a.intersects(b)).toBe(true);
  });
});
