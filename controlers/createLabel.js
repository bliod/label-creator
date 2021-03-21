const path = require("path");
const fs = require("fs");
const makeCanvas = require("../services/makeCanvas");
const createRect = require("../services/createRect");
const createText = require("../services/createText");
const createImage = require("../services/createImage");

const createLabel = async (req, res, next) => {
  try {
    const out = fs.createWriteStream(
      path.join(__dirname, "../public/label.png")
    );
    const data = req.body;
    const { canvas, context } = makeCanvas(data);

    if (data.textElements) {
      if (data.textElements[0]) {
        createRect(context, data.textElements);
      }
    }

    if (data.rectangleElements) {
      if (data.rectangleElements[0]) {
        createText(context, data.rectangleElements);
      }
    }
    if (data.imageElements) {
      if (data.imageElements[0]) {
        createImage(canvas, context, data.imageElements);
      }
    }
    const stream = canvas.createPNGStream();
    stream.pipe(out);
    out.on("finish", () => {
      console.log("The PNG file was created.");
    });
    out.on("error", (err) => {
      throw new Error(err);
    });
    res.status(201).end();
  } catch (error) {
    console.log(error);
    next(error);
  }
};
module.exports = createLabel;
