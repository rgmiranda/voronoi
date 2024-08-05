import { describe, expect, it } from 'vitest';
import { Triangle } from '../src';
import { Vector } from '@rgsoft/math';

describe(Triangle.name, () => {
    it('creates an instance', () => {
        const t = new Triangle(new Vector(0, 0), new Vector(0, 1), new Vector(1, 0));
        expect(t).toBeInstanceOf(Triangle);
    });

    it('calculates the circle', () => {
        const t = new Triangle(new Vector(0, 0), new Vector(0, 1), new Vector(1, 0));
        expect(t).toBeInstanceOf(Triangle);
        expect(t.center.x).toBeCloseTo(0.5, 10);
        expect(t.center.y).toBeCloseTo(0.5, 10);
        expect(t.radius).toBeCloseTo(Math.SQRT1_2, 10);
    });

    it('detects point in the circle', () => {
        let p: Vector;
        const t = new Triangle(new Vector(0, 0), new Vector(0, 1), new Vector(1, 0));
        expect(t).toBeInstanceOf(Triangle);
        p = new Vector(0.25, 0.25);
        expect(t.inCircle(p)).toBe(true);
        p = new Vector(0.5, 0.5);
        expect(t.inCircle(p)).toBe(true);
        p = new Vector(1.5, 1.5);
        expect(t.inCircle(p)).toBe(false);
    });

    it('detects edges of the triangle', () => {
        let p: Vector, q: Vector;
        const t = new Triangle(new Vector(0, 0), new Vector(0, 1), new Vector(1, 0));
        expect(t).toBeInstanceOf(Triangle);
        
        p = new Vector(0, 1);
        q = new Vector(1, 0);
        expect(t.hasEdge(p, q)).toBe(true);
        expect(t.hasEdge(q, p)).toBe(true);
        
        p = new Vector(0, 2);
        q = new Vector(1, 0);
        expect(t.hasEdge(p, q)).toBe(false);
    });

    it('detects vertex of the triangle', () => {
        let p: Vector;
        const t = new Triangle(new Vector(0, 0), new Vector(0, 1), new Vector(1, 0));
        expect(t).toBeInstanceOf(Triangle);
        
        p = new Vector(0, 1);
        expect(t.hasVertex(p)).toBe(true);
        
        p = new Vector(0, 2);
        expect(t.hasVertex(p)).toBe(false);
    });

    it('detects adjacents triangles', () => {
        let ot: Triangle;
        const t = new Triangle(new Vector(0, 0), new Vector(0, 1), new Vector(1, 0));
        expect(t).toBeInstanceOf(Triangle);
        
        ot = new Triangle(new Vector(0, 0), new Vector(1, 0), new Vector(1, -2));
        expect(t.isAdjacent(ot)).toBe(true);
        
        ot = new Triangle(new Vector(0, 1), new Vector(1, 0), new Vector(1, 1));
        expect(t.isAdjacent(ot)).toBe(true);
        
        ot = new Triangle(new Vector(0, 0), new Vector(2, 0), new Vector(1, -2));
        expect(t.isAdjacent(ot)).toBe(false);
    });
});