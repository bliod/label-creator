const path = require("path");
const fs = require("fs");
const { createCanvas, loadImage, Image } = require("canvas");

const createLabel = async (req, res, next) => {
  const out = fs.createWriteStream(path.join(__dirname, "../public/label.png"));
  const data = req.body;

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

  if (data.textElements) {
    if (data.textElements[0]) {
      data.textElements.forEach((element) => {
        context.fillStyle = element.color;
        context.font = element.font;
        context.fillText(
          element.text,
          element.position?.x,
          element.position?.y,
          element.width
        );
      });
    }
  }
  if (data.rectangleElements) {
    if (data.rectangleElements[0]) {
      data.rectangleElements.forEach((element) => {
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
  }
  if (data.imageElements) {
    if (data.imageElements[0]) {
      data.imageElements.forEach((element) => {
        loadImage(element.url).then((image) => {
          context.drawImage(
            image,
            element.position?.x,
            element.position?.y,
            element.width,
            element.height
          );
          const buffer = canvas.toBuffer("image/png");
          fs.writeFileSync(path.join(__dirname, "../public/label.png"), buffer);
        });
      });
    }
  }
  const stream = canvas.createPNGStream();
  stream.pipe(out);
  out.on("finish", () => console.log("The PNG file was created."));
  out.on("error", (err) => console.log(err));
};
module.exports = createLabel;
