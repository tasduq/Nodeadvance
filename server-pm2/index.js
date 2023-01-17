const express = require("express");
const app = express();

function doWork(duration) {
  const start = Date.now();
  while (Date.now() - start < duration) {}
}

app.get("/", (req, res) => {
  doWork(10000);
  res.send("hi there");
});

app.get("/fast", (req, res) => {
  res.send("i am fast");
});

app.listen(3000, () => {
  console.log("listening on 3000");
});
