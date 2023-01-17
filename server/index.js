// const cluster = require("cluster");

// if (cluster.isMaster) {
//   console.log("in ifffffffff");
//   const cpuCount = require("os").cpus().length;
//   console.log(cpuCount);
//   cluster.fork();
//   cluster.fork();
//   cluster.fork();
//   cluster.fork();
// } else {
//   console.log("in elssssssssssssssss");
//   const express = require("express");
//   const app = express();

//   function doWork(duration) {
//     const start = Date.now();
//     while (Date.now() - start < duration) {}
//   }
//   console.log("i am instance");

//   app.get("/", (req, res) => {
//     doWork(10000);
//     res.send("hi there");
//   });

//   app.get("/fast", (req, res) => {
//     res.send("i am fast");
//   });

//   app.listen(3000, () => {
//     console.log("listening on 3000");
//   });
// }

const cluster = require("cluster");
const express = require("express");
const app = express();

if (cluster.isMaster) {
  cluster.fork();
  cluster.fork();
  cluster.fork();
} else {
  function doWork(duration) {
    const start = Date.now();

    while (Date.now() - start < duration) {}
  }

  app.get("/", (req, res) => {
    console.log("Cluster ID", cluster.worker.id); // publish the workerid

    doWork(10000);
    res.send("Done");
  });

  app.get("/fast", (req, res) => {
    console.log("Cluster ID", cluster.worker.id); // publish the workerid
    res.send("i am fast");
  });

  app.listen(3000);
}
