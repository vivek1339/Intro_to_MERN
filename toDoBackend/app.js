var express = require("express");
var cors = require("cors");
var mongoose = require("mongoose");
var createError = require("http-errors");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

var allowedOrigins = ["http://localhost:3000"];
app.use(cors({
  origin: '*'
}));
app.options("*", (req, res) => {
  res.sendStatus(200);
});

app.use("/", indexRouter);
app.use("/users", usersRouter);

mongoose
  .connect("mongodb+srv://express_user:express_user@cluster0.fnfbvfq.mongodb.net/?retryWrites=true&w=majority", { useNewUrlParser: true })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

app.listen(3001, function() {
  console.log("API server listening on port 3001");
});

module.exports = app;