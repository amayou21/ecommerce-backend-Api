const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const dbConnection  = require("./config/databse");
const categoryRoute  = require("./routes/categoryRoute");

// if you create file with the name "config.env" u gonna have to set the dote env configs
dotenv.config({ path: "config.env" });

// create express server
const app = express();

// mongoDB connection
dbConnection()

// middelwires
app.use(express.json());

if (process.env.MODE === "developement") {
  app.use(morgan("dev"));
  console.log(`mode :${process.env.MODE}`);
}

// Mount routes
app.use("/api/v1/categories",categoryRoute)


// runing server with listen port
app.listen(process.env.PORT, () => {
  console.log(`App Runing on port ${process.env.PORT}`);
});