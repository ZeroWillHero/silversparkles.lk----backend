const express = require('express');
const router = express.Router();
const multer = require('multer');
const middleware = require("../../middleware/auth");
const adminMiddleware = require("../../middleware/adminauth")
const getAllProducts = require("./controllers/getAllProducts").getAllProducts;
const getProduct = require("./controllers/getAllProducts").getProduct;
const addProducts = require("./controllers/addProducts");
const deleteProduct = require("./controllers/deleteProduct");
const updateProduct = require("./controllers/updateProduct");
const productFilters = require("./controllers/productFilters");
const buyProduct = require("./controllers/buyProduct");

// Setup Multer for file uploads
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'uploads/') // Specify the directory where files should be stored
//     },
//     filename: function (req, file, cb) {
//         cb(null, Date.now() + '-' + file.originalname) // Specify a unique file name
//     }
// });
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


// Routes 
router.get('/all',getAllProducts);
router.get('/get/:id',getProduct);
router.get('/filter',productFilters);

router.use(middleware);
router.post('/buy', buyProduct);

router.use(adminMiddleware);
router.post('/add', upload.array('images', 5), addProducts);
router.delete('/delete/:id',deleteProduct);
router.put('/update/:id',upload.array('images', 5), updateProduct)


// export router 
module.exports = router;
