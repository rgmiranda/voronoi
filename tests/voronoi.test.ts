import { describe, expect, it } from "vitest";
import { Voronoi } from "../src";
import { Vector } from "@rgsoft/math";

describe(Voronoi.name, () => {
    it('creates an instance', () => {
        const v = new Voronoi({
            width: 100,
            height: 100,
            excludeRectVertex: false
        });
        expect(v).toBeInstanceOf(Voronoi);
    });

    it('creates triangulation', () => {
        const v = new Voronoi({
            width: 100,
            height: 100,
            excludeRectVertex: false
        });
        const pts = [new Vector(25, 25)];
        const trg = v.triangulate(pts);
        expect(trg.length).toBe(4);
    });
});