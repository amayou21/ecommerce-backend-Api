const fs = require("fs");
const colors = require("colors");
const dotenv = require("dotenv");
const dbConnection = require("../../config/databse");
const ProductModel = require("../../models/ProductModel");

dotenv.config({ path: "../../config.env" });


dbConnection();

const products = JSON.parse(fs.readFileSync( "./Products.json" ));

// @desc   insert products
const insertProducts = async () => {
  try {
    await ProductModel.create(products);
    console.log("inserted success".green.inverse);
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

// @desc   delete products
const deleteProducts = async () => {
  try {
    await ProductModel.deleteMany();
    console.log("destroed success".red.inverse);
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

if (process.argv[2] === "-i") {
  insertProducts();
} else if (process.argv[2] === "-d") {
  deleteProducts();
}
