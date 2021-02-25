import { Pixel } from "./Pixel";
import { drawPixelCall } from "./Fill";

export function ddaAlgorithm(fullPixel) {
  let dx = fullPixel.finalPositionX - fullPixel.startPositionX;
  let dy = fullPixel.finalPositionY - fullPixel.startPositionY;

  let steps;
  let k;
  let xIncrement, yIncrement;
  let x = fullPixel.startPositionX;
  let y = fullPixel.startPositionY;

  if (Math.abs(dx) > Math.abs(dy)) {
    steps = Math.abs(dx);
  } else {
    steps = Math.abs(dy);
  }
  xIncrement = dx / parseFloat(steps);
  yIncrement = dy / parseFloat(steps);
  drawPixelCall(x, y, fullPixel.ctx, fullPixel.color, fullPixel.width);
  pixelCoordinatesForZoom(x, y, fullPixel.width, fullPixel.color);
  for (k = 0; k < steps; k++) {
    x += xIncrement;
    y += yIncrement;
    drawPixelCall(x, y, fullPixel.ctx, fullPixel.color, fullPixel.width);
    pixelCoordinatesForZoom(x, y, fullPixel.width, fullPixel.color);
  }
}

export let positionsTest = [];
export function pixelCoordinatesForZoom(x, y, width, color) {
  let position = new Pixel(
    Math.round(x / width) * width,
    Math.round(y / width) * width,
    color
  );
  positionsTest.push(position);
}
export function bresenham(fullPixel) {
  let dx = Math.abs(fullPixel.startPositionX - fullPixel.finalPositionX);
  let dy = Math.abs(fullPixel.startPositionY - fullPixel.finalPositionY);
  let p = 2 * dy - dx;
  let twoDy = 2 * dy;
  let twoDyDx = 2 * (dy - dx);
  let x, y, xEnd;
  if (fullPixel.startPositionX > fullPixel.finalPositionX) {
    x = fullPixel.finalPositionX;
    y = fullPixel.finalPositionY;
    xEnd = fullPixel.startPositionX;
  } else {
    x = fullPixel.startPositionX;
    y = fullPixel.startPositionY;
    xEnd = fullPixel.finalPositionX;
  }
  drawPixelCall(x, y, fullPixel.ctx, fullPixel.color, fullPixel.width);
  pixelCoordinatesForZoom(x, y, fullPixel.width, fullPixel.color);
  while (x < xEnd) {
    x++;
    if (p < 0) {
      p += twoDy;
    } else {
      y++;
      p += twoDyDx;
    }
    drawPixelCall(x, y, fullPixel.ctx, fullPixel.color, fullPixel.width);
    pixelCoordinatesForZoom(x, y, fullPixel.width, fullPixel.color);
  }
}
