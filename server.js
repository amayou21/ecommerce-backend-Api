const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const dbConnection = require("./config/databse");
const categoryRoute = require("./routes/categoryRoute");
const subcategoryRoute = require("./routes/subCategoryRoute");
const brandsRoute = require("./routes/brandsRoute");
const ApiError = require("./utility/apiError");
const globalError = require("./middleware/globalError");
const ProductRoute = require("./routes/productRoute");

// if you create file with the name "config.env" u gonna have to set the dote env configs
dotenv.config({ path: "config.env" });

// create express server
const app = express();

// mongoDB connection
dbConnection();

// middelwires
app.use(express.json());
app.use(express.static(path.join(__dirname,'uploads')))

if (process.env.MODE === "developement") {
  app.use(morgan("dev"));
  console.log(`mode :${process.env.MODE}`);
}


// Enable CORS for all routes
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// Mount routes
app.use("/api/v1/categories", categoryRoute);
app.use("/api/v1/subcategories", subcategoryRoute);
app.use("/api/v1/brands", brandsRoute);
app.use("/api/v1/products", ProductRoute);

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
