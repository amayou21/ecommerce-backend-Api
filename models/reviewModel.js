const mongoose = require("mongoose")
const productModel = require("../models/ProductModel")
const reviewSchema = new mongoose.Schema({
    title: {
        type: String
    },
    retings: {
        type: Number,
        min: [1, "Min rating value is 1.0"],
        max: [5, "Max rating value is 5.0"],
        required: [true, "review ratings required"]
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: [true, "Review must belong to user"]
    },


    // parent reference (one to many)
    product: {
        type: mongoose.Schema.ObjectId,
        ref: "Product",
        required: [true, "Review must belong to product"]
    }
}, { timestamps: true })

reviewSchema.pre(/^find/, function (next) {
    this.populate({
        path: "user",
        select: "name _id"
    })
    next()
})

reviewSchema.statics.calcRatingsAverageAndQuantity = async function (productID) {
    const result = await this.aggregate([
        // stage 1
        { $match: { product: productID } },

        // stage 2
        {
            $group: {
                _id: "product",
                avgRatings: { $avg: "$retings" },
                ratingsQty: { $sum: 1 }
            }
        }
    ])
    if (result.length > 0) {
        await productModel.findByIdAndUpdate(productID,
            {
                ratingsAverage: result[0].avgRatings,
                ratingQuantity: result[0].ratingsQty
            }
        )
    } else {
        await productModel.findByIdAndUpdate(productID,
            {
                ratingsAverage: 0,
                ratingQuantity: 0
            }
        )
    }
}

reviewSchema.post("save", async function () {
    await this.constructor.calcRatingsAverageAndQuantity(this.product)
})

reviewSchema.post("remove", async function () {
    await this.constructor.calcRatingsAverageAndQuantity(this.product);
});

module.exports = mongoose.model("Review", reviewSchema)