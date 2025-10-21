import { beforeEach, describe, expect, it, vi } from "vitest";
import { tessellate, triangulate } from "../src";
import { Vector } from "@rgsoft/math";

describe(tessellate.name, () => {

  beforeEach(() => {
    vi.resetAllMocks();
  });
  it("tessellates using a triangulation", () => {
    const a = new Vector(0, 0);
    const b = new Vector(4, 0);
    const c = new Vector(4, 4);
    const d = new Vector(0, 4);
    
    const rectBox: [Vector, Vector, Vector, Vector] = [a, b, c, d];
    const sites = [
      new Vector(Math.random() * 2 + 1, Math.random() * 2 + 1),
      new Vector(Math.random() * 2 + 1, Math.random() * 2 + 1),
    ];
    const voronoi = tessellate(sites.concat(rectBox), {
      excludeRectVertex: false,
      rectBox
    });
    expect(voronoi.length).toBe(6);

    for (const cell of voronoi) {
      if (cell.site) {
        expect(cell.containsOrOnEdge(cell.site)).toBe(true);
      }
    }
  });
});
