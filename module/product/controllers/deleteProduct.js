// const mongoose = require('mongoose');

// const deleteProduct = async (req, res) => {
//     const Product = mongoose.model('product');

//     try {
//         const product = await Product.findByIdAndDelete(req.params.id);
//         if (!product) {
//             return res.status(404).json(
//                 {
//                     status: "fail",
//                     message: "Product not found"
//                 }
//             );
//         }
//         res.status(200).json(
//             {
//                 status: "success",
//                 message: "Product deleted successfully",
//                 product: product
//             }
//         );
//     } catch (error) {
//         res.status(500).json(
//             {
//                 status: "fail",
//                 message: error.message
//             }
//         )
//     }
// };

// module.exports = deleteProduct;


// -----------------------------sequelize Mysql------------------------------------------------

const fs = require('fs');
const path = require('path');
const db = require("../../../model/mysql/index");
const Product = db.products;
const cloudinary = require("../../../manager/cloudnary");

const deleteProduct = async (req, res) => {
    const productId = req.params.id; // Assuming the product ID is passed as a route parameter

    try {
        // Find the product by ID
        const product = await Product.findByPk(productId);

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        // Parse the images field to get image paths
        // const images = JSON.parse(product.images);

        // Function to extract public_id from secure_url
        const getPublicIdFromUrl = (url) => {
            const parts = url.split('/');
            const fileName = parts.pop();
            const publicId = parts.slice(7).join('/') + fileName.split('.')[0];
            //console.log('publicId:', publicId);
            return publicId;
        };

        // Delete existing images from Cloudinary
        if (product.images) {
            const existingImages = JSON.parse(product.images);
            await Promise.all(existingImages.map(image => {
                const publicId = getPublicIdFromUrl(image.url);
                return cloudinary.uploader.destroy(publicId);
            }));
        }

        // Delete the product
        await product.destroy();

        // // Delete the image files from the filesystem
        // images.forEach(image => {
        //     const filePath = path.join(__dirname, '../../../', image.url);
        //     fs.unlink(filePath, err => {
        //         if (err) {
        //             console.error(`Failed to delete image file: ${filePath}`, err);
        //         }
        //     });
        // });


        res.status(200).json({ message: 'Product and associated images deleted successfully' });
    } catch (error) {
        //console.log(error);
        if (error.parent.sqlMessage.split(":")[1]) {
            return res.status(500).json({ error: error.parent.sqlMessage.split(":")[1] });
            //console.log("error", error.parent.sqlMessage.split(":")[1]);
        } else {
            res.status(500).json({ error: 'Failed to delete product' });
            console.log("error", error);
        }
    }
};

module.exports = deleteProduct;

