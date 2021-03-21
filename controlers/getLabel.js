const path = require("path");
const fs = require("fs");

const getLabel = (req, res, next) => {
  let htmlFile = fs.readFileSync(path.join(__dirname, "../label.html"));
  res.render("index.ejs", { htmlFile });
};

module.exports = getLabel;
