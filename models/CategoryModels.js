const { default: mongoose } = require("mongoose");

// 1-create mongodb schema
const CategorySchema = new mongoose.Schema({
  name: String,
});

// 2- convert schema to model to apply some query
exports.CategoryModel = mongoose.model("Category", CategorySchema);