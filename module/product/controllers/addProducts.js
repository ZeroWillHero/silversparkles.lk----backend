const fs = require('fs');
const path = require('path');
const db = require("../../../model/mysql/index");
const cloudinary = require("../../../manager/cloudnary");

// Mysql DB model call
const Product = db.products;
const multer = require('multer');

const addProducts = async (req, res) => {
    const {
        title,
        category,
        price,
        description,
        stock,
        metal,
        weight,
        width,
        stone,
        gender,
        iced_product,
        style,
        ring_size,
        length,
        color
    } = req.body;

    try {
        let length1 = [];
        let color1 = [];

        if (length) {
            length1 = length.map(len => {
                return {
                    length: len
                };
            });
        }

        if (color) {
            color1 = color.map(co => {
                return {
                    color: co
                };
            });
        }

        // Check if all required fields are present
        const requiredFields = ['title', 'category', 'price', 'description', 'stock', 'stone', 'gender', 'style', 'metal'];
        const missingFields = requiredFields.filter(field => !req.body[field]);

        if (missingFields.length > 0) {
            return res.status(400).json({ error: `Missing required fields: ${missingFields.join(', ')}` });
        }

        // Upload images to Cloudinary
        const images = await Promise.all(req.files.map(file => {
            return new Promise((resolve, reject) => {
                cloudinary.uploader.upload_stream({ resource_type: 'image' }, (error, result) => {
                    if (error) return reject(error);
                    resolve({ url: result.secure_url });
                }).end(file.buffer);
            });
        }));

        if (images.length === 0) {
            return res.status(400).json({ error: 'At least one image is required' });
        }

        const product = await Product.create({
            title,
            category,
            price,
            description,
            stock,
            metal,
            weight,
            length: length1.length ? JSON.stringify(length1) : null,
            width: width || null,
            ring_size: ring_size || null,
            color: color1.length ? JSON.stringify(color1) : null,
            stone,
            images: JSON.stringify(images), // Store image paths as JSON string in the database
            gender,
            iced_product: iced_product || false,
            style
        });

        res.status(201).json(product);
    } catch (error) {
        console.log("error", error);
        res.status(400).json({ error: error.message });
    }
};

module.exports = addProducts;