const express = require('express');
const router = express.Router();
const middleware = require("../../middleware/auth");
const addWishlistItem = require("./controllers/addWishlist");
const getWishlistItems = require("./controllers/getWishlist");
const removeWishlistItem = require("./controllers/removeWishlist");
const clearWishlist = require("./controllers/allClear");



router.use(middleware);
router.post('/add', addWishlistItem);
router.get('/all/:userId', getWishlistItems);
router.delete('/removeitem', removeWishlistItem);
router.delete('/clear', clearWishlist);

// export router 
module.exports = router;
