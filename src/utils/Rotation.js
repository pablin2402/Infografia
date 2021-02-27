import { positionsTest } from "./Line";
import { Pixel } from "./Pixel";
import { pixelCoordinatesForZoom } from "./Line";
import { drawPixelCall } from "./Fill";
//import { drawGrid } from "@/components/Principal.vue";
export function rotate(x1, y1, x2, y2, width, color, shape, ctx) {
  ctx.translate(100, 100);
  // ctx.rotate(-70);

  let array = [];
  positionsTest.forEach((e) =>
    array.push(new Pixel(e.x, e.y, e.color), positionsTest.pop())
  );
  positionsTest.forEach((a) => positionsTest.splice(a, 1));
  array.forEach((e) => drawPixelCall(e.x, e.y, ctx, e.color, width));
  //drawGrid();
  positionsTest.forEach((z) =>
    pixelCoordinatesForZoom(z.x, z.y, width, "#FFFFFF")
  );

  array.forEach((z) => pixelCoordinatesForZoom(z.x, z.y, width, z.color));
}
