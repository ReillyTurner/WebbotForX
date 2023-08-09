const doThings = require("./trademe.js");
const doThings2 = require("./trademe2.js");

const express = require("express");
const app = express();
const port = 3000;

const winston = require("winston");
const consoleTransport = new winston.transports.Console();
const myWinstonOptions = {
  transports: [consoleTransport],
};
const logger = new winston.createLogger(myWinstonOptions);

function logRequest(req, res, next) {
  logger.info(req.url);
  next();
}
app.use(logRequest);

function logError(err, req, res, next) {
  logger.error(err);
  next();
}
app.use(logError);

app.use(express.json());

app.post("/trademe", (req, res) => {
  // console.log(req.body);
  var subject = req.body.headerLines
    .find((element) => element.key == "subject")
    .line.slice(9);

  if (subject == "ONE") {
    doThings();
  }

  if (subject == "TWO") {
    doThings2();
  }

  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
