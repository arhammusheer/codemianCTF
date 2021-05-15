const express = require("express");
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req, res)=>{
  res.send(`${Math.random(1)}`)
})

app.get("/service", (req, res) => {
  res.sendFile(path.join(__dirname,"index.html"))
});

app.get("/Codemian.jpg", (req, res) => {
	res.sendFile(path.join(__dirname,"Codemian.jpg"))
})

app.listen(port, () => {
  console.log(`FOR06 listening at http://localhost:${port}`);
});
