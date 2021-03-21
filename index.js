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
  console.log(data);

  let width = 500;
  let height = Number(data.canvas.height);
  // if (data.canvas.height) {
  //   height = data.canvas.height;
  // }

  const canvas = createCanvas(width, height);
  const context = canvas.getContext("2d");

  context.fillStyle = "#0f0";
  console.log(width, height);
  context.fillRect(0, 0, width, height);
  const stream = canvas.createPNGStream();

  stream.pipe(out);
  // req.on("end", function () {
  //   // res.writeHead(200, { "content-type": "text/html" });
  //   res.end("<h5>Label created</h5>");
  // });

  out.on("finish", () => console.log("The PNG file was created."));
  out.on("error", (err) => console.log(err));
});

app.listen(PORT, function () {
  console.log(`Server is starting on port ${PORT}`);
});
