import { Vector } from "@rgsoft/math";
import { tessellate } from "../src/voronoi";
import { Polygon } from "../src/polygon";
import { TessellationConfig } from "../src/interfaces";
import { describe, expect, it, vi } from "vitest";

describe("tessellate", () => {
  const rectBox: [Vector, Vector, Vector, Vector] = [
    new Vector(0, 0),
    new Vector(4, 0),
    new Vector(4, 4),
    new Vector(0, 4),
  ];

  it("should return one polygon per site when triangulation is valid", () => {
    const sites = [new Vector(1, 2), new Vector(2, 1), new Vector(2, 3)];

    const config: TessellationConfig = { rectBox, excludeRectVertex: true };
    const polygons = tessellate(sites, config);

    expect(polygons).toHaveLength(3);
    polygons.forEach((p) => {
      expect(p).toBeInstanceOf(Polygon);
      expect(p.vertex.length).toBeGreaterThanOrEqual(3);
    });
  });

  it("should skip sites without enough incident triangles", () => {

    const sites = [new Vector(1, 1)];
    const config: TessellationConfig = { rectBox, excludeRectVertex: true };

    const polygons = tessellate(sites, config);
    expect(polygons).toHaveLength(1);
  });

  it("should concatenate rectBox vertices when excludeRectVertex is false", () => {
    const sites = [new Vector(2, 2)];
    const config: TessellationConfig = { rectBox, excludeRectVertex: false };

    const polygons = tessellate(sites, config);
    expect(polygons.length).toBe(5); // 1 original + 4 del rectBox
  });

  it("should not concatenate rectBox when excludeRectVertex is true", () => {
    const sites = [new Vector(1, 1)];
    const config: TessellationConfig = { rectBox, excludeRectVertex: true };

    const polygons = tessellate(sites, config);
    expect(polygons.length).toBe(1);
  });

  it("should sort vertices angularly around site", () => {
    const site = new Vector(2, 2);
    const config: TessellationConfig = { rectBox, excludeRectVertex: false };

    const polygons = tessellate([site], config);
    const poly = polygons[0];

    const angles = poly.vertex.map((v) =>
      Math.atan2(v.y - site.y, v.x - site.x)
    );
    const deltas = angles.slice(1).map((a, i) => a - angles[i]);
    const allIncreasing = deltas.every((d) => d > 0);
    const allDecreasing = deltas.every((d) => d < 0);

    expect(allIncreasing || allDecreasing).toBe(true);
  });
});
