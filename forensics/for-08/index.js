const express = require("express");
const app = express();
const port = 3000;

const faker = require("faker");
const path = require("path");
app.get("/", (req, res) => {
  res.json({
    name: faker.name.findName(),
    email: faker.internet.email(),
    card: faker.helpers.createCard(),
  });
});

app.get("/missing", (req, res) => {
	res.status(404).sendFile(path.join(__dirname,"sus.html"))
})

app.listen(port, () => {
  console.log(`FOR08 local listening at http://localhost:${port}`);
});
