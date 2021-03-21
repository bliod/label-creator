const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");

const PORT = 3000;
const create = require("./controlers/createLabel");
const get = require("./controlers/getLabel");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", get);

app.post("/create", create);

app.listen(PORT, function () {
  console.log(`Server is starting on port ${PORT}`);
});
