const path = require("path");
const fs = require("fs");
const { loadImage } = require("canvas");

const createImage = (canvas, context, data) => {
  data.forEach((element) => {
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
};
module.exports = createImage;
