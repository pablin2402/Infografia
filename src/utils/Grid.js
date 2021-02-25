export  function columns(height,canvas, ctx) {
      for (let i = height; i < canvas.width; i += height) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvas.width);
        ctx.stroke();
      }
}
export function rows(height, canvas, ctx) {
      for (let i = height; i < canvas.width; i += height) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(canvas.width, i);
        ctx.stroke();
      }
 }