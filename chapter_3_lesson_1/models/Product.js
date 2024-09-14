


const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter the name of the product"],
        unique: [true, "Name of product must be unique!"]
    },
    price: {
        type: Number,
        required: [true, "Please enter the price"],
        default: 0
    },
    quantity: {
        type: Number,
        required: [true, "Please enter the quantity"],
        default: 0
    }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;


