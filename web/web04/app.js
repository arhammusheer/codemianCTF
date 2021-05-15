var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var useragent = require("express-useragent");

var indexRouter = require("./routes/index");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
app.use(useragent.express());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(function (req, res, next) {
  if (req.useragent.browser !== "codemianBrowser")
    return res.status(400).send("You're not visiting from codemianBrowser");
  if (req.useragent.version !== "1.9.2")
    return res.status(400).send("Your codemian browser version is not 1.9.2");
  return next();
});

app.use(function (req, res, next) {
  if (req.get("Origin") !== "https://ctf.codemian.ml")
    return res.status(400).send("You're not coming from https://ctf.codemian.ml");
  next();
});

app.use("/", indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({
    status: "error",
    code: err.status || 500,
    message: err.message,
  });
});

module.exports = app;
