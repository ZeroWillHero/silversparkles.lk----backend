const express = require('express');
const router = express.Router();
const multer = require('multer');
const adminMiddleware = require("../../middleware/adminauth");
const addMedia = require('./controllers/addAds');
const getMedia = require('./controllers/getAds');
const deleteMedia = require('./controllers/removeCartItem');


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



router.get('/all', getMedia);
router.use(adminMiddleware);
router.post('/add', upload.array('images', 5), addMedia);
router.delete('/delete/:id', deleteMedia);

// export router 
module.exports = router;
