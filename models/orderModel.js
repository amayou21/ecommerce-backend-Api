const mongoose = require("mongoose")


const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: [true, "order must be belong to user"]
    },
    cartItem: [
        {
            product: {
                type: mongoose.Schema.ObjectId,
                ref: 'Product'
            },
            quantity: Number,
            color: String,
            price: Number
        },
    ],
    taxPrice: {
        type: Number,
        default: 0,
    },
    shippingAddress: {
        details: String,
        phone: String,
        city: String,
        postalCode: String,
    },
    shippingPrice: {
        type: Number,
        default: 0,
    },
    totalOrderPrice: {
        type: Number
    },

    paymentMethodType: {
        type: String,
        enum: ["card", "cash"],
        default: "cash",
    },
    isPaid: {
        type: Boolean,
        default: false,
    },
    paidAt: Date,
    isDelivered: {
        type: Boolean,
        default: false,
    },
    deliveredAt: Date

}, { timestamps: true })



// populate
orderSchema.pre(/^find/, function (next) {
    this.populate({
        path: "user",
        select: "name profileImg phone email"
    }).populate({
        path: "cartItem.product",
        select: "title imageCover"
    })
    next()
})


module.exports = mongoose.model("Order", orderSchema)