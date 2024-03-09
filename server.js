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
const userRoute = require("./routes/userRoute");
const authRoute = require("./routes/authRoute")
const reviewsRoute = require("./routes/reviewsRoute")
const wishlistRoute = require("./routes/wislistRoute")
const addressesRoute = require("./routes/addressesRoute")
const couponsRoute = require("./routes/couponRoute")
const cors = require("cors");
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

app.use(cors(corsOptions));
app.use(express.static(path.join(__dirname, "uploads")));

if (process.env.MODE === "developement") {
  app.use(morgan("dev"));
  console.log(`mode :${process.env.MODE}`);
}

// Mount routes
app.use("/api/v1/categories", categoryRoute);
app.use("/api/v1/subcategories", subcategoryRoute);
app.use("/api/v1/brands", brandsRoute);
app.use("/api/v1/products", ProductRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/reviews", reviewsRoute);
app.use("/api/v1/wishlist", wishlistRoute);
app.use("/api/v1/addresses", addressesRoute);
app.use("/api/v1/coupons", couponsRoute);

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
