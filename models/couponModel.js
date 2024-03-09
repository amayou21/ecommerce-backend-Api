const mongoose = require("mongoose")
const couponSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, "Coupon name is required"],
        unique: true,
    },
    expire: {
        type: Date,
        required: [true, "Coupon expired time is required"]
    },
    discount: {
        type: Number,
        required: [true, "Coupon discount value is required"]
    },
}, { timestamps: true }
)

module.exports = mongoose.model("Coupon", couponSchema)