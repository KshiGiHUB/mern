const mongoose = require("mongoose")
const userSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    email: {
        required: true,
        type: String
    },
    password: {
        required: true,
        type: String
    },
    location: {
        required: true,
        type: String
    },
    date: {
        default: Date.now(),
        type: Date
    },
})

module.exports = mongoose.model("users", userSchema)