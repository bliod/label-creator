const path = require("path");
const fs = require("fs");
const { createCanvas, loadImage } = require("canvas");

const createLabel = (req, res, next) => {
  const out = fs.createWriteStream(path.join(__dirname, "../public/label.png"));
  const data = req.body;
  console.log(data.canvas);

  let width = 300;
  let height = 300;
  data.canvas?.height ? (height = Number(data.canvas.height)) : "";
  data.canvas?.width ? (width = Number(data.canvas.width)) : "";

  const canvas = createCanvas(width, height);
  const context = canvas.getContext("2d");
  context.lineWidth = 4;
  context.strokeStyle = "black";
  context.strokeRect(0, 0, width, height);

  context.fillStyle = "#fff";

  if (data.rectangleElement) {
    data.rectangleElement.forEach((element) => {
      context.lineWidth = element.stroke?.size;
      context.strokeStyle = element.stroke?.color;
      context.strokeRect(
        element.position?.x,
        element.position?.y,
        element.width,
        element.height
      );
    });
  }
  const stream = canvas.createPNGStream();
  stream.pipe(out);
  out.on("finish", () => console.log("The PNG file was created."));
  out.on("error", (err) => console.log(err));
};
module.exports = createLabel;
