var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.cookie("admin","false");
  return res.render('index', { title: 'CodemianCTF WEB02' });
});

router.get("/admin", function(req, res, next) {
  if (req.cookies.admin == "true") return res.render("flag")
  return res.render("noflag")
})
module.exports = router;
