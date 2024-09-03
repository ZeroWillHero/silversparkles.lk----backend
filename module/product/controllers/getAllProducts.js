// const mongoose = require('mongoose');

// const getAllProducts = async (req, res) => {
//     const Product = mongoose.model('product');
//     const page = parseInt(req.query.page);
//     const limit = parseInt(req.query.limit);

//     const startIndex = (page - 1) * limit;
//     const endIndex = page * limit;

//     const filter = {};

//     if (req.query.category) {
//         filter.category = req.query.category;
//     }

//     if (req.query.min_price && req.query.max_price) {
//         filter.price = { $gte: req.query.min_price, $lte: req.query.max_price }
//     }else if (req.query.min_price) {
//         filter.price = { $gte: req.query.min_price }
//     }
//     else if (req.query.max_price){
//         filter.price = { $lte: req.query.max_price }
//     }

//     if (req.query.gender){
//         filter.gender = req.query.gender
//     }

//     if (req.query.color){
//         filter.color = req.query.color
//     }

//     if (req.query.metal){
//         filter.metal = req.query.metal
//     }

//     if (req.query.weight){
//         filter.weight = req.query.weight
//     }

//     if (req.query.length){
//         filter.length = req.query.length
//     }

//     if (req.query.min_width && req.query.max_width){
//         filter.width = { $gte: req.query.min_width, $lte: req.query.max_width }
//     }else if (req.query.min_width){
//         filter.width = { $gte: req.query.min_width }
//     }else if (req.query.max_width){
//         filter.width = { $lte: req.query.max_width }
//     }

//     if (req.query.ring_size){
//         filter.ring_size = req.query.ring_size
//     }

//     if (req.query.stock){
//         filter.stock = req.query.stock > 0;
//     }

//     let sort = {};

// // Check if sort parameter is provided in the request
// if (req.query.sort_by_price) {
//     // If sort_by_price is 'asc', sort price in ascending order
//     // If sort_by_price is 'desc', sort price in descending order
//     sort.price = req.query.sort_by_price === 'asc' ? 1 : -1;
// }



//     try {
//         // count the toatal no of documents in the collecion Product
//         const totalItems = await Product.countDocuments();
//         // filtering results for the current page according to the query parameter limit & page
//         const products = await Product.find(filter).sort(sort).skip(startIndex).limit(limit);
//         // generate results object 
//         let results = {
//             // calculate total pages 
//             "totalPages": Math.ceil(totalItems / limit),
//             "totalItems": totalItems,
//             // assign the filtred products to data
//             "data": products
//         }

//         // calculate the next page (if exist) 
//         if (endIndex < totalItems) {
//             results.next = {
//                 page: page + 1,
//                 limit: limit
//             }
//         }

//         // calculate the previous page (if exist)
//         if (startIndex > 0) {
//             results.previous = {
//                 page: page - 1,
//                 limit: limit
//             }
//         }
        
//         res.status(200).json({
//             "status": "success",
//             "message": "All Products",
//             "data": results
//         })

//     } catch (error) {
//         res.status(500).json({
//             "status": "error",
//             "message": error.message
//         })
//     }
// }

// module.exports = getAllProducts;



// -----------------------------sequelize Mysql------------------------------------------------
const db = require("../../../model/mysql/index");

// Mysql DB model call
const Product = db.products;
const getAllProducts = async (req, res) => {
    try {
        const products = await Product.findAll();

        // Map through products to ensure images is a string and parse it
        const productsWithImages = products.map(product => {
            let parsedImages;
            let parsedLengths;
            let parsedColors;
            let parsedReviews;
            if (typeof product.images === 'string') {
                parsedImages = JSON.parse(product.images); // Parse images JSON string to array of objects
            } else {
                parsedImages = product.images; // If already an object, use it as-is
            }

            if (typeof product.length === 'string') {
                parsedLengths = JSON.parse(product.length); // Parse images JSON string to array of objects
            }else {
                parsedLengths = product.length; // If already an object, use it as-is
            }


            if (typeof product.color === 'string') {
                parsedLengths = JSON.parse(product.color); // Parse images JSON string to array of objects
            }else {
                parsedLengths = product.color; // If already an object, use it as-is
            }

            if (typeof product.review === 'string') {
                parsedReviews= JSON.parse(product.review); // Parse images JSON string to array of objects
            }else {
                parsedReviews = product.review; // If already an object, use it as-is
            }


            



            
            return {
                ...product.toJSON(), // Convert Sequelize instance to JSON object
                images: parsedImages,
                length: parsedLengths,
                color: parsedColors,
                review: parsedReviews
            };
        });

        res.status(200).json(productsWithImages);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

const getProduct = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        // Ensure images is a string and parse it
        let parsedImages;
        let parsedLengths;
        let parsedColors;
        let parsedReviews;
        if (typeof product.images === 'string') {
            parsedImages = JSON.parse(product.images); // Parse images JSON string to array of objects
        } else {
            parsedImages = product.images; // If already an object, use it as-is
        }

        if (typeof product.length === 'string') {
            parsedLengths = JSON.parse(product.length); // Parse images JSON string to array of objects
        }
        else {
            parsedLengths = product.length; // If already an object, use it as-is
        }

        if (typeof product.color === 'string') {
            parsedColors = JSON.parse(product.color); // Parse images JSON string to array of objects
        }else{
            parsedColors = product.color; // If already an object, use it as-is
        }

        if (typeof product.review === 'string') {
            parsedReviews = JSON.parse(product.review); 
            console.log("parsed : ",parsedReviews)// Parse images JSON string to array of objects
        }
        else {
            parsedReviews = product.review; // If already an object, use it as-is
        }
        const productWithImages = {
            ...product.toJSON(), // Convert Sequelize instance to JSON object
            images: parsedImages,
            length: parsedLengths,
            color: parsedColors,
            review : parsedReviews
            
        };

        res.status(200).json(productWithImages);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};


module.exports = {getAllProducts, getProduct};

