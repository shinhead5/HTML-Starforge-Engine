import { describe, expect, it } from "vitest";
import { at, atOr } from "../src/utils/Array";

describe("array helpers", () => {
  it("returns undefined for out of bounds", () => {
    expect(at([1, 2, 3], 5)).toBeUndefined();
  });

  it("returns fallback when out of bounds", () => {
    expect(atOr([1, 2, 3], 5, 9)).toBe(9);
  });
});
