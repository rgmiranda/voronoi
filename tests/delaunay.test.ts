import { describe, expect, it } from "vitest";
import { getRectBox } from "../src";
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
    
});