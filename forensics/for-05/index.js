const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.json({
    math: "random",
    number: Math.random(),
  });
});

app.get("/f", (req, res) => {
  res.json({
    flag: "Y29kZW1pYW5DVEZ7WTBVX2pVNXRfU24xZkYzZF9zMG1FX3BBY2szdFN9",
    cipher: "b64",
  });
});

app.listen(port, () => {
  console.log(`FOR05 listening at http://localhost:${port}`);
});
