const path = require("path");
const fs = require("fs");

const getLabel = (req, res, next) => {
  let htmlFile = fs.readFileSync(path.join(__dirname, "../label.html"));
  let example = fs.readFileSync(path.join(__dirname, "../example.json"));

  res.render("index.ejs", { htmlFile, example });
};

module.exports = getLabel;
