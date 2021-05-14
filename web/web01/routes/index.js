var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get("/robots.txt", function(req, res, next) {
  res.sendFile("../../robots.txt")
})

module.exports = router;
