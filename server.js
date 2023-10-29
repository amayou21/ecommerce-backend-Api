const express = require("express");
const dotenv = require("dotenv");

// if I create file name's config.env u gonna have to set the dote env configs
dotenv.config({ path: "config.env" });

const app = express();

app.get("/", (req, res) => {
  res.send("Our Api v1");
});

app.listen(process.env.PORT, () => {
  console.log(`App Runing on port ${process.env.PORT}`);
});
