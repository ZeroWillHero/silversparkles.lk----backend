// const mongoose = require('mongoose');

// const addProducts = async (req, res) => {
//   const Product = mongoose.model('product');
//  // one product add 
//   // try {
//   //   const newProduct = new Product({
//   //     title: req.body.title,
//   //     category: req.body.category,
//   //     price: req.body.price,
//   //     description: req.body.description,
//   //     stock: req.body.stock,
//   //     metal: req.body.metal,
//   //     weight: req.body.weight,
//   //     length: req.body.length,
//   //     width: req.body.width,
//   //     ring_size: req.body.ring_size,
//   //     color: req.body.color,
//   //     stone: req.body.stone,
//   //     images: req.body.images,
//   //     gender: req.body.gender,
//   //     iced_product: req.body.iced_product,
//   //     style: req.body.style,
//   //   });
//   //   await newProduct.save();
//   //   res.status(201).json ({ status: "success", product: newProduct, message: "Product added successfully" });
//   // } catch (error) {
//   //   res.status(409).json({ status: "unsuccess", message: error.message });
//   // }


//   // bulk products add 
//   try {
//     const products = req.body; // assuming that you're sending an array of products
//     const newProducts = products.map(product => new Product(product));
//     const result = await Product.insertMany(newProducts);
//     res.status(201).json({status : "success", message : "Products added successfully", data: result});
// } catch (error) {
//     res.status(409).json({ status:"unsuccess", message: error.message });  
// }
// };

// module.exports = addProducts;



// -----------------------------sequelize Mysql------------------------------------------------

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
        length,
        width,
        color,
        stone,
        gender,
        iced_product,
        style,
        ring_size,
    } = req.body;

    console.log("length  ", length)
    console.log("color  ", color)

    try {
        // const images = req.files.map(file => {
        //     return {
        //         url: '/uploads/' + file.filename // Store the file path in the database//
        //     };
        // });




        const length1 = length.map(len => {
            return {
                length: len
            }
        })

        const color1 = color.map(co => {
            return {
                color: co
            }
        })

        console.log("color", color1)

        //console.log("length1", length1)

        // Check if all required fields are present
        const requiredFields = ['title', 'category', 'price', 'description', 'stock', 'metal', 'weight', 'length', 'width', 'color', 'stone', 'gender', 'style', 'ring_size'];
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
            length: JSON.stringify(length1),
            width,
            ring_size,
            color: JSON.stringify(color1),
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

