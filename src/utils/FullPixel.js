export class FullPixel {
  constructor(
    startPositionX,
    startPositionY,
    finalPositionX,
    finalPositionY,
    color,
    ctx,
    width
  ) {
    this.startPositionX = startPositionX;
    this.startPositionY = startPositionY;
    this.finalPositionX = finalPositionX;
    this.finalPositionY = finalPositionY;
    this.color = color;
    this.ctx = ctx;
    this.width = width;
  }
}
