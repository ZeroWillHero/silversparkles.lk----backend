const express = require('express'); 
const router = express.Router();
const middleware = require("../../middleware/auth");

const addReview = require('./controllers/addReview');

router.use(middleware);
router.post('/add', addReview);

module.exports = router;