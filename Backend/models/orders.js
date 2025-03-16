const mongoose = require("mongoose")
const orderSchema = new mongoose.Schema({

    email: {
        required: true,
        type: String,
        unique: true
    },
    order_data: {
        type: Array,
        required: true,
    }
})

module.exports = mongoose.model("order", orderSchema)