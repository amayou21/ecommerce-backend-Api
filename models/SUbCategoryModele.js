const { default: mongoose } = require("mongoose");

const subCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "SubCategory name is required"],
      unique: [true, "SubCategory must be unique"],
      maxLength: [32, "Too long SubCategory name"],
      minLength: [2, "Too short SubCategory name"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    category: {
      type: mongoose.Schema.ObjectId,
      ref: "Category",
      required: [true, "SubCategory must br belong to parent Category"],
    },
    image:String
  },
  { timestamps: true }
);


// @desc  set image url
const imageUrld=(doc)=>{
  if (doc.image) {
    const imageUrl = doc.image;
    doc.image = `${process.env.BASE_URL}/subcategories/${imageUrl}`;
  }
}

// getOne ,getAll and update
subCategorySchema.post("init", (doc) => {
  imageUrld(doc)
});

// create
subCategorySchema.post("save", (doc) => {
  imageUrld(doc)

});

module.exports = mongoose.model("SubCategory", subCategorySchema);
