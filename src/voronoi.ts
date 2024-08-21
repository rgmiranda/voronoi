import { Triangle } from "./triangle";
import { StrokeOptions } from "./types";

export const tessellate = (context: CanvasRenderingContext2D, triangulation: Triangle[], strokeOptions: StrokeOptions = {}): void => {
  if (strokeOptions.strokeStyle) {
    context.strokeStyle = strokeOptions.strokeStyle;
  }
  if (strokeOptions.lineCap) {
    context.lineCap = strokeOptions.lineCap;
  }
  if (strokeOptions.lineWidth) {
    context.lineWidth = strokeOptions.lineWidth;
  }
  triangulation.forEach((triangle, i) => {
    for (let j = i + 1; j < triangulation.length; j++) {
      const otherTriangle = triangulation[j];
      if (triangle.isAdjacent(otherTriangle)) {
        context.beginPath();
        context.moveTo(triangle.center.x, triangle.center.y);
        context.lineTo(otherTriangle.center.x, otherTriangle.center.y);
        context.stroke();
      }
    }
  });
};