const express = require('express');
const router = express.Router();
const middleware = require("../../middleware/auth");
const addCartItem = require('./controllers/addCartItem');
const removeCartItem = require('./controllers/removeCartItem');
const getCartItems = require('./controllers/getCartItems');


// router.use(middleware);
router.post('/add', addCartItem);
router.get('/all/:id', getCartItems);
router.delete('/removeitem', removeCartItem);


// export router 
module.exports = router;
