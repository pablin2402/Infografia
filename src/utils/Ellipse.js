import { drawPixelCall } from "./Fill";
import { pixelCoordinatesForZoom } from "./Line";

let rounded = (a) => a + 0.5;

export function ellipseMidpoint(fullPixel) {
  let xCenter = fullPixel.startPositionX;
  let yCenter = fullPixel.startPositionY;
  let rx = fullPixel.finalPositionX - fullPixel.startPositionX;
  let ry = rx / 2;

  let rx2 = rx * rx;
  let ry2 = ry * ry;
  let twoRx2 = 2 * rx2;
  let twoRy2 = 2 * ry2;
  let p;
  let x = 0;
  let y = ry;
  let px = 0;
  let py = twoRx2 * y;
  ellipsePlotPoints(
    xCenter,
    yCenter,
    x,
    y,
    fullPixel.ctx,
    fullPixel.color,
    fullPixel.width
  );
  p = rounded(ry2 - rx2 * ry + 0.25 * rx2);
  while (px < py) {
    x++;
    px += twoRy2;
    if (p < 0) {
      p += ry2 + px;
    } else {
      y--;
      py -= twoRx2;
      p += ry2 + px - py;
    }
    ellipsePlotPoints(
      xCenter,
      yCenter,
      x,
      y,
      fullPixel.ctx,
      fullPixel.color,
      fullPixel.width
    );
  }
  //REGION2
  p = rounded(
    ry2 * (x + 0.5) * (x + 0.5) + rx2 * (y - 1) * (y - 1) - rx2 * ry2
  );
  while (y > 0) {
    y--;
    py -= twoRx2;
    if (p > 0) {
      p += rx2 - py;
    } else {
      x++;
      px += twoRy2;
      p += rx2 - py + px;
    }
    ellipsePlotPoints(
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
export function ellipsePlotPoints(xCenter, yCenter, x, y, ctx, color, width) {
  drawPixelCall(xCenter + x, yCenter + y, ctx, color, width);
  pixelCoordinatesForZoom(xCenter + x, yCenter + y, width, color);

  drawPixelCall(xCenter - x, yCenter + y, ctx, color, width);
  pixelCoordinatesForZoom(xCenter - x, yCenter + y, width, color);

  drawPixelCall(xCenter + x, yCenter - y, ctx, color, width);
  pixelCoordinatesForZoom(xCenter + x, yCenter - y, width, color);

  drawPixelCall(xCenter - x, yCenter - y, ctx, color, width);
  pixelCoordinatesForZoom(xCenter - x, yCenter - y, width, color);
}
