import { describe, expect, it } from "vitest";
import { Polygon } from "../src";
import { Vector } from "@rgsoft/math";

describe(Polygon.name, () => {

  it('creates an instance', () => {
    const polygon = new Polygon([], new Vector(0, 0));
    expect(polygon).toBeInstanceOf(Polygon);
  });

  it('calculates the centroid', () => {
    const polygon = new Polygon([
      new Vector(0, 0),
      new Vector(0, 3),
      new Vector(3, 0),
    ], new Vector(0.5, 0.5));

    expect(polygon.centroid.equals(new Vector(1, 1))).toBeTruthy();
  });

  it('detects a point in the polygon', () => {
    const polygon = new Polygon([
      new Vector(0, 0),
      new Vector(0, 3),
      new Vector(3, 0),
    ], new Vector(0.5, 0.5));

    expect(polygon.contains(new Vector(1, 1))).toBeTruthy();
    expect(polygon.contains(new Vector(2, 2))).toBeFalsy();
    expect(polygon.contains(new Vector(2, 1))).toBeFalsy();
    expect(polygon.contains(new Vector(1, 2))).toBeFalsy();
  });

  it('detects a point on the edge the polygon', () => {
    const polygon = new Polygon([
      new Vector(0, 0),
      new Vector(0, 3),
      new Vector(3, 0),
    ], new Vector(0.5, 0.5));

    expect(polygon.isOnEdge(new Vector(0, 0))).toBeTruthy();
    expect(polygon.isOnEdge(new Vector(2, 1))).toBeTruthy();
    expect(polygon.isOnEdge(new Vector(1, 2))).toBeTruthy();
    expect(polygon.isOnEdge(new Vector(0, 0))).toBeTruthy();
    expect(polygon.isOnEdge(new Vector(1, 1))).toBeFalsy();
    expect(polygon.isOnEdge(new Vector(2, 2))).toBeFalsy();
  });

  it('detects a point on the edge or contained by the polygon', () => {
    const polygon = new Polygon([
      new Vector(0, 0),
      new Vector(0, 3),
      new Vector(3, 0),
    ], new Vector(0.5, 0.5));

    expect(polygon.containsOrOnEdge(new Vector(0, 0))).toBeTruthy();
    expect(polygon.containsOrOnEdge(new Vector(2, 1))).toBeTruthy();
    expect(polygon.containsOrOnEdge(new Vector(1, 2))).toBeTruthy();
    expect(polygon.containsOrOnEdge(new Vector(0, 0))).toBeTruthy();
    expect(polygon.containsOrOnEdge(new Vector(1, 1))).toBeTruthy();
    expect(polygon.containsOrOnEdge(new Vector(2, 2))).toBeFalsy();
  });
});
