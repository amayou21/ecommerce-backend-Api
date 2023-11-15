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

// @desc  set image url
const imageUrld = (doc) => {
  if (doc.image) {
    const imageUrl = doc.image;
    doc.image = `${process.env.BASE_URL}/categories/${imageUrl}`;
  }
};

// getOne ,getAll and update
CategorySchema.post("init", (doc) => {
  imageUrld(doc);
});

// create
CategorySchema.post("save", (doc) => {
  imageUrld(doc);
});

// 2- convert schema to model to apply some query
exports.CategoryModel = mongoose.model("Category", CategorySchema);
