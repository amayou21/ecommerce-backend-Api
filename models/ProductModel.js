const { default: mongoose } = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      unique: true,
      required: [true, "product title is required"],
      trime: true,
      minLength: [3, "Too short Product title"],
      maxLength: [100, "Too long Product title"],
    },
    slug: {
      type: String,
      required: [true, "Product tiele is required"],
      lowercase: true,
    },
    description: {
      type: String,
      required: [true, "Product descreption is required"],
      minLength: [20, "Too short Product description"],
    },
    quantity: {
      type: Number,
      required: [true, "Product Quantity is required"],
    },
    sold: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, "Product Price is required"],
      trime: true,
      max: [20_000_000, "Too long Product price"],
    },
    priceAfterDescount: {
      type: Number,
      trime: true,
    },
    colors: [String],
    imageCover: {
      type: String,
      required: [true, "Product image cover is required"],
    },
    images: [String],
    category: {
      type: mongoose.Schema.ObjectId,
      ref: "Category",
      required: [true, "Product must be belong to category"],
    },
    subcategory: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "SubCategory",
      },
    ],
    brand: {
      type: mongoose.Schema.ObjectId,
      ref: "Brand",
    },
    ratingsAverage: {
      type: Number,
      min: [1, "Rating must be above or equal 1.0"],
      max: [5, "Rating must be below or equal 5.0"],
    },
    ratingQuantity: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

ProductSchema.pre(/^find/, function (next) {
  this.populate({
    path: "category",
    select: "name -_id",
  });
  next();
});

// @desc  set image url
const imageUrld = (doc) => {
  if (doc.imageCover) {
    const imageUrl = doc.imageCover;
    doc.imageCover = `${process.env.BASE_URL}/products/${imageUrl}`;
  }
  if (doc.images) {
    const imagesList = [];
    doc.images.forEach((element) => {
      imagesList.push(`${process.env.BASE_URL}/products/${element}`);
    });
    doc.images = imagesList;
  }
};

// getOne ,getAll and update
ProductSchema.post("init", (doc) => {
  imageUrld(doc);
});

// create
ProductSchema.post("save", (doc) => {
  imageUrld(doc);
});

module.exports = mongoose.model("Product", ProductSchema);
