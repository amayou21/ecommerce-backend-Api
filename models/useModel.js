const mongoos = require("mongoose")
const bcrypt = require("bcryptjs")
const userSChema = new mongoos.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, "name required"]
    },
    slug: {
        type: String,
        lowercase: true
    },
    email: {
        type: String,
        required: [true, "email required"],
        unique: true,
    },
    phone: String,
    profileImg: String,
    password: {
        type: String,
        required: [true, "password required"],
        minlength: [6, "too short password"]
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    }
}, { timestamps: true })


userSChema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next()
    }

    // hashing user password 
    this.password = await bcrypt.hash(this.password, 12)
    next()

})


module.exports = mongoos.model("User", userSChema);
