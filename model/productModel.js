const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "title is required"]
    },

    category: {
        type: String,
        enum: ['chains', 'pendants', 'rings', 'earrings', 'bracelets', 'anklets', 'bundles', 'watches'],
        required: [true, "category is required"]
    },

    price: {
        type: Number,
        required: [true, "price is required"]
    },

    description: {
        type: String,
        required: [true, "description is required"]
    },

    stock: {
        type: Number,
        required: [true, "stock is required"]
    },

    metal: {
        type: String,
        required: [true, "metal is required"]
    },

    weight: {
        type: Number,
        required: [true, "weight is required"]
    },

    length: {
        type: Number,
        required: [true, "length is required"]

    },

    width: {
        type: Number,
        required: [true, "width is required"]
    },

    ring_size: {
        type: Number,
    },

    color: {
        type: String,
        required: [true, "color is required"],
        enum: ['gold', 'silver', 'rose gold', 'white gold']
    },

    stone: {
        type: String,
        required: [true, "stone is required"],
        enum: ['natural-diamonds', 'american-diamonds']
    },

    images: {
        type: Array,
        required: [true, "images are required"]
    },

    gender: {
        type: String,
        required: [true, "Gender is required"],
        enum: ['men', 'women']
    },

    review: {
        type: Array,
        default: []
    },

    iced_product: {
        type: Boolean,
        default: false
    },

    style: {
        type: String,
        required: [true, "product style is required"],
        enum: ['Cuban', 'Tennis', 'Figaro', 'Rope', 'Palm', 'Our Exclusive']
    }


},

    {
        timestamps: true
    }

);

const productModel = mongoose.model('product', productSchema);

module.exports = productModel;

