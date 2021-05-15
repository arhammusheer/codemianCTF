var express = require("express");
var router = express.Router();
var jwt = require("jsonwebtoken");
var fs = require("fs");
var path = require("path");
var privateKey = fs.readFileSync(path.join(__dirname, "../keys/jwtRS256.key"));
var publicKey = fs.readFileSync(
  path.join(__dirname, "../keys/jwtRS256.key.pub")
);

/* GET home page. */
router.get("/", function (req, res, next) {
  res.json({
    status: "success",
    endpoints: [
      {
        path: "/admin",
        authorization: "admin token",
      },
      {
        path: "/user",
        authorization: "token",
      },
      {
        path: "/login",
        method: "POST",
        authorization: "none",
      },
    ],
  });
});

router.post("/login", async function (req, res, next) {
  if (!req.body.name)
    return res.json({ status: "warning", message: "Requires name in body" });
  if (req.body.name == "admin")
    return res.json({
      status: "warning",
      message: "You're not worthy to be admin",
    });
  jwt.sign(
    { name: req.body.name, message: "robots might help you" },
    privateKey,
    { algorithm: "RS512" },
    function (err, token) {
      if (err) throw err;
      res.json({ status: "success", authToken: token });
    }
  );
});

router.get("/user", function (req, res, next){
  token = req.headers.authorization.split(' ')[1];
  jwt.verify(token, publicKey, function(err, decoded) {
    res.json({status:"success", message: `Hi ${decoded.name}`})
  });
})

router.get("/admin", function (req, res, next){
  token = req.headers.authorization.split(' ')[1];
  jwt.verify(token, publicKey, function(err, decoded) {
    if(decoded.name !=="admin") return res.json({status:"success", message: `No flag for you. You ain't admin`})
    res.json({status:"success", flag:"Y29kZW1pYW5DVEZ7WW9VX1MzRW1fTDFrM19BX1ByMH0="})
  });
})

router.get("/robots.txt", function (req, res, next){
  res.sendFile(path.join(__dirname,"../robots.txt"))
})

router.get("/private.pem", function (req, res, next){
  res.sendFile(path.join(__dirname, "../keys/jwtRS256.key"))
})

module.exports = router;
