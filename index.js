const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const PORT = 3000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

app.get('/',(req,res)=>{
    res.send('hi')
})

app.listen(PORT, function () {
  console.log(`Server is starting on port ${PORT}`);
});``