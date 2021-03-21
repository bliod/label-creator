const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const fs = require("fs");
const { createCanvas, loadImage } = require("canvas");
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res, next) => {
  let htmlFile = fs.readFileSync(path.join(__dirname, "label.html"));
  res.render("index.ejs", { htmlFile });
});

app.post("/create", (req, res, next) => {
  const out = fs.createWriteStream(path.join(__dirname, "/public/label.png"));
  const data = req.body;
  console.log(data.canvas);

  let width = 300;
  let height = 300;
  data.canvas.height ? (height = Number(data.canvas.height)) : "";
  data.canvas.width ? (width = Number(data.canvas.width)) : "";

  const canvas = createCanvas(width, height);
  const context = canvas.getContext("2d");

  context.fillStyle = "#fff";

  if (data.rectangleElement) {
    data.rectangleElement.forEach((element) => {
      context.lineWidth = element.stroke.size;
      context.strokeStyle = element.stroke.color;
      context.strokeRect(
        element.position.x,
        element.position.y,
        element.width,
        element.height
      );
      // context.stroke();
    });
  }
  const stream = canvas.createPNGStream();
  stream.pipe(out);
  out.on("finish", () => console.log("The PNG file was created."));
  out.on("error", (err) => console.log(err));
});

app.listen(PORT, function () {
  console.log(`Server is starting on port ${PORT}`);
});
