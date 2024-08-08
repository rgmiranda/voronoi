import { describe, expect, it } from "vitest";
import { getRectBox, triangulate } from "../src";
import { Vector } from "@rgsoft/math";

describe(getRectBox.name, () => {
    
    it('calculates the rect box', () => {
        const pts = [
            new Vector(-2, 0),
            new Vector(0, 3),
            new Vector(2, 0),
            new Vector(0, -2),
        ];
        const [a, b, c, d] = getRectBox(pts);
        expect(a.equals(new Vector(-2, 3))).toBe(true);
        expect(b.equals(new Vector(2, 3))).toBe(true);
        expect(c.equals(new Vector(2, -2))).toBe(true);
        expect(d.equals(new Vector(-2, -2))).toBe(true);
    });
    
    it('triangulates points', () => {
        const rectBox = [
            new Vector(0, 3),
            new Vector(3, 3),
            new Vector(3, 0),
            new Vector(0, 0),
        ];
        const pts = [
            new Vector(1, 1)
        ];
        const triangulation = triangulate(pts, {
            rectBox,
            excludeRectVertex: false
        });
        const [a, b, c, d] = rectBox;
        const [p] = pts;
        expect(Array.isArray(triangulation)).toBe(true);
        expect(triangulation.length).toBe(4);
        triangulation.forEach((t) => {
            expect(t.hasVertex(p)).toBe(true);
            expect(t.hasEdge(a, b) || t.hasEdge(b, c)  || t.hasEdge(c, d)  || t.hasEdge(d, a)).toBe(true);
        });
    });
    
    it('eliminates the rect box points', () => {
        const rectBox = [
            new Vector(0, 3),
            new Vector(3, 3),
            new Vector(3, 0),
            new Vector(0, 0),
        ];
        const pts = [
            new Vector(1, 1),
            new Vector(1, 2),
            new Vector(2, 2),
        ];
        const [ p, q, r ] = pts;
        const triangulation = triangulate(pts, {
            rectBox,
            excludeRectVertex: true
        });
        expect(Array.isArray(triangulation)).toBe(true);
        expect(triangulation.length).toBe(1);
        expect(triangulation[0].hasVertex(p)).toBe(true);
        expect(triangulation[0].hasVertex(q)).toBe(true);
        expect(triangulation[0].hasVertex(r)).toBe(true);
    });
    
});