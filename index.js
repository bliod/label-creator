const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const fs = require("fs");
const out = fs.createWriteStream(__dirname + "/test.png");
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
  const data = req.body;
  console.log(data);

  const width = 500;
  const height = 500;

  const canvas = createCanvas(width, height);
  const context = canvas.getContext("2d");

  context.fillStyle = "#000";
  context.fillRect(0, 0, width, height);
  const stream = canvas.createPNGStream();
  stream.pipe(out);
  out.on("finish", () => console.log("The PNG file was created."));
});

app.listen(PORT, function () {
  console.log(`Server is starting on port ${PORT}`);
});
