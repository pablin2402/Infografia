import { drawPixelCall } from "./Fill";
import { pixelCoordinatesForZoom } from "./Line";
export function circleMidPoint(fullPixel) {
  let xCenter = fullPixel.startPositionX;
  let yCenter = fullPixel.startPositionY;
  let x = 0;
  let y = radius(
    fullPixel.startPositionX,
    fullPixel.startPositionY,
    fullPixel.finalPositionX,
    fullPixel.finalPositionY
  );
  let p = radius(
    fullPixel.startPositionX,
    fullPixel.startPositionY,
    fullPixel.finalPositionX,
    fullPixel.finalPositionY
  );
  circlePlotPoints(
    xCenter,
    yCenter,
    x,
    y,
    fullPixel.ctx,
    fullPixel.color,
    fullPixel.width
  );
  while (x < y) {
    x++;
    if (p < 0) {
      p += 2 * x + 1;
    } else {
      y--;
      p += 2 * (x - y) + 1;
    }
    circlePlotPoints(
      xCenter,
      yCenter,
      x,
      y,
      fullPixel.ctx,
      fullPixel.color,
      fullPixel.width
    );
  }
}
export function circlePlotPoints(xCenter, yCenter, x, y, ctx, color, width) {
  drawPixelCall(xCenter + x, yCenter + y, ctx, color, width);
  pixelCoordinatesForZoom(xCenter + x, yCenter + y, width, color);

  drawPixelCall(xCenter - x, yCenter + y, ctx, color, width);
  pixelCoordinatesForZoom(xCenter - x, yCenter + y, width, color);

  drawPixelCall(xCenter + x, yCenter - y, ctx, color, width);
  pixelCoordinatesForZoom(xCenter + x, yCenter - y, width, color);

  drawPixelCall(xCenter - x, yCenter - y, ctx, color, width);
  pixelCoordinatesForZoom(xCenter - x, yCenter - y, width, color);

  drawPixelCall(xCenter + y, yCenter + x, ctx, color, width);
  pixelCoordinatesForZoom(xCenter + y, yCenter + x, width, color);

  drawPixelCall(xCenter - y, yCenter + x, ctx, color, width);
  pixelCoordinatesForZoom(xCenter - y, yCenter + x, width, color);

  drawPixelCall(xCenter + y, yCenter - x, ctx, color, width);
  pixelCoordinatesForZoom(xCenter + y, yCenter - x, width, color);

  drawPixelCall(xCenter - y, yCenter - x, ctx, color, width);
  pixelCoordinatesForZoom(xCenter - y, yCenter - x, width, color);
}
export function radius(
  startPositionX,
  startPositionY,
  finalPositionX,
  finalPositionY
) {
  let first = Math.pow(finalPositionX - startPositionX, 2);
  let second = Math.pow(finalPositionY - startPositionY, 2);

  return Math.sqrt(first + second);
}
