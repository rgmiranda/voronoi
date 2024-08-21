import { beforeEach, describe, expect, it, vi } from "vitest";
import { tessellate, triangulate } from "../src";
import { Vector } from "@rgsoft/math";
import { setupJestCanvasMock } from 'jest-canvas-mock'

describe(tessellate.name, () => {
    let canvas: HTMLCanvasElement;
    let context: CanvasRenderingContext2D;

    beforeEach(() => {
        vi.resetAllMocks();
        setupJestCanvasMock();

        canvas = document.createElement('canvas');
        canvas.width = 100;
        canvas.height = 100;
        context = canvas.getContext('2d') as CanvasRenderingContext2D;
    });
    it('tessellates using a triangulation', () => {
        const a = new Vector(0, 0);
        const b = new Vector(4, 0);
        const c = new Vector(4, 4);
        const d = new Vector(0, 4);
        const e = new Vector(2, 2);

        const triangulation = triangulate([e], {
            excludeRectVertex: false,
            rectBox: [ a, b, c, d ],
        });

        expect(triangulation.length).toBe(4);
        tessellate(context, triangulation);
        expect(context.beginPath).toHaveBeenCalledTimes(4);
        expect(context.stroke).toHaveBeenCalledTimes(4);
        expect(context.moveTo).toHaveBeenCalledWith(0, 2);
        expect(context.moveTo).toHaveBeenCalledWith(2, 0);
        expect(context.moveTo).toHaveBeenCalledWith(2, 4);
        expect(context.lineTo).toHaveBeenCalledWith(4, 2);
    });
});