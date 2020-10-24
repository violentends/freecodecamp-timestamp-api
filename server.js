// server.js
// where your node app starts

// init project
require("dotenv").config();
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.get("/api/timestamp", function (req, res) {
  let date = new Date();
  res.json({ utc: date.toUTCString(), unix: date.getTime() });
});
app.get("/api/timestamp/:time", function (req, res) {
  let date = new Date(req.params.time);
  if(date.toString() === "Invalid Date"){
    date.setTime(parseInt(req.params.time))
  }
  if(date.toString() === "Invalid Date"){
    res.json({error: date.toString()})
  }
  res.json({ utc: date.toUTCString(), unix: date.getTime() });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
