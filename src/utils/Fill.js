import { pixelCoordinatesForZoom } from "./Line";

export function boundaryFill4(x, y, ctx, width, color) {
  let pixel = ctx.getImageData(x, y, width, width);
  console.log(pixel);
  ctx.fillStyle = color;
  if (pixel.data[3] != 0) {
    console.log("hola");
  } else {
    ctx.fillRect(
      Math.round(x / width) * width,
      Math.round(y / width) * width,
      width,
      width
    );
    pixelCoordinatesForZoom(
      Math.round(x / width) * width,
      Math.round(y / width) * width,
      width,
      color
    );

    ctx.fill();
    ctx.stroke();
    if (x > 0) {
      boundaryFill4(x - width, y, ctx, width, color);
    }
    if (x < ctx.canvas.width) {
      boundaryFill4(x + width, y, ctx, width, color);
    }
    if (y > 0) {
      boundaryFill4(x, y - width, ctx, width, color);
    }
    if (y < ctx.canvas.height) {
      boundaryFill4(x, y + width, ctx, width, color);
    }
  }
}

export function drawPixelCall(x, y, ctx, color, width) {
  drawPixelCanvas(
    Math.round(x / width) * width,
    Math.round(y / width) * width,
    width,
    width,
    ctx,
    color
  );
}
export function drawPixelCanvas(x, y, x2, y2, ctx, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, x2, y2);
  ctx.fill();
  ctx.stroke();
}
