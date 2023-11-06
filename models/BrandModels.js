const { default: mongoose } = require("mongoose");

// 1-create mongodb schema
const BrandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Brand name required"],
      unique: [true, "Brand name must be unique"],
      minLength: [3, "too short Brand name"],
      maxLength: [32, "too long Brand name"],
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
exports.BrandModel = mongoose.model("Brand", BrandSchema);
