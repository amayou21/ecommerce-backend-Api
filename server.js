const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const dbConnection = require("./config/databse");
const ApiError = require("./utility/apiError");
const globalError = require("./middleware/globalError");
const mountError = require("./routes")
const cors = require("cors");
const compression=require("compression")

// if you create file with the name "config.env" u gonna have to set the dote env configs
dotenv.config({ path: "config.env" });

// create express server
const app = express();

// mongoDB connection
dbConnection();

// middelwires
app.use(express.json());

// Allow requests from a specific origin (http://localhost:3000 in this case)
const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

// allow other domain to access this pplication
app.use(cors(corsOptions));

// compress all responses
app.use(compression())

app.use(express.static(path.join(__dirname, "uploads")));

if (process.env.MODE === "developement") {
  app.use(morgan("dev"));
  console.log(`mode :${process.env.MODE}`);
}

// Mount routes
mountError(app)

app.all("*", (req, res, next) => {
  next(new ApiError(`we can't fin this route : ${req.originalUrl}`, 400));
});

// Global error handling middleware
app.use(globalError);

// runing server with listen port
const server = app.listen(process.env.PORT, () => {
  console.log(`App Runing on port ${process.env.PORT}`);
});

// @desc   handle rejections outside express
process.on("unhandledRejection", (err) => {
  console.log(`unhandledRejection : ${err.name} || ${err.message}`);
  server.close(() => {
    console.log("shuting down...");
    process.exit(1);
  });
});
