import { Vector } from "@rgsoft/math";

export interface TessellationConfig {
  rectBox?: [Vector, Vector, Vector, Vector];
  excludeRectVertex?: boolean;
}
