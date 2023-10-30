const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const mongoose = require("mongoose");
// if I create file name's config.env u gonna have to set the dote env configs
dotenv.config({ path: "config.env" });
const app = express();

mongoose.connect(process.env.DB_URL).then((conn) => {
  console.log(`Database Connected: ${conn.connection.host}`)
}).catch((err) => {
    console.log(`Database Errod : ${err}`);
    process.exit(1);
  });

if (process.env.MODE === "developement") {
  app.use(morgan("dev"));
  console.log(`mode :${process.env.MODE}`);
}

app.get("/", (req, res) => {
  res.send("Our Api v1");
});

app.listen(process.env.PORT, () => {
  console.log(`App Runing on port ${process.env.PORT}`);
});
