var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  return res.render("index", { title: "codemianCTF WEB03" });
});

router.post("/", function (req, res, next) {
  return res.render("bin");
});

module.exports = router;
