import { Vector } from "@rgsoft/math";
import { FillOptions, StrokeOptions } from "./types";

export class Polygon {
  constructor(private readonly _points: Vector[]) {

  }

  stroke(ctx: CanvasRenderingContext2D, strokeOptions: StrokeOptions) {
    if (strokeOptions.strokeStyle) {
      ctx.strokeStyle = strokeOptions.strokeStyle;
    }
    if (strokeOptions.lineWidth) {
      ctx.lineWidth = strokeOptions.lineWidth;
    }
    if (strokeOptions.lineCap) {
      ctx.lineCap = strokeOptions.lineCap;
    }
    ctx.beginPath();
    this._points.forEach((p, i) => {
      if (i === 0) {
        ctx.moveTo(p.x, p.y);
      } else {
        ctx.lineTo(p.x, p.y);
      }
    });
    ctx.closePath();
    ctx.stroke();
  }

  fill(ctx: CanvasRenderingContext2D, fillOptions: FillOptions) {
    if (fillOptions.fillStyle) {
      ctx.fillStyle = fillOptions.fillStyle;
    }
    ctx.beginPath();
    this._points.forEach((p, i) => {
      if (i === 0) {
        ctx.moveTo(p.x, p.y);
      } else {
        ctx.lineTo(p.x, p.y);
      }
    });
    ctx.closePath();
    ctx.fill();
  }

  get points(): Vector[] {
    return [ ...this._points ];
  }
};