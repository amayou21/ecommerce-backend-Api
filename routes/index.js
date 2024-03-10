
const categoryRoute = require("./categoryRoute");
const subcategoryRoute = require("./subCategoryRoute");
const brandsRoute = require("./brandsRoute");
const ProductRoute = require("./productRoute");
const userRoute = require("./userRoute");
const authRoute = require("./authRoute")
const reviewsRoute = require("./reviewsRoute")
const wishlistRoute = require("./wislistRoute")
const addressesRoute = require("./addressesRoute")
const couponsRoute = require("./couponRoute")
const cartRoute = require("./cartRoute")



const mountRout = (app) => {

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
    app.use("/api/v1/cart", cartRoute);
}

module.exports = mountRout;