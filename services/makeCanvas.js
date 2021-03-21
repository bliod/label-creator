const { createCanvas } = require("canvas");

const makeCanvas = (data) => {
  let width = 400;
  let height = 600;
  data.canvas?.height ? (height = Number(data.canvas.height)) : "";
  data.canvas?.width ? (width = Number(data.canvas.width)) : "";

  const canvas = createCanvas(width, height);
  const context = canvas.getContext("2d");
  context.lineWidth = 4;
  context.strokeStyle = "black";
  context.strokeRect(0, 0, width, height);
  context.fillStyle = "#fff";
  return { canvas, context };
};

module.exports = makeCanvas;
