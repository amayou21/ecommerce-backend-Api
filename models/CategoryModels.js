const { default: mongoose } = require("mongoose");

// 1-create mongodb schema
const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "category name required"],
      unique: [true, "category name must be unique"],
      minLength: [3, "too short category name"],
      maxLength: [32, "too long category name"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

// 2- convert schema to model to apply some query
exports.CategoryModel = mongoose.model("Category", CategorySchema);
