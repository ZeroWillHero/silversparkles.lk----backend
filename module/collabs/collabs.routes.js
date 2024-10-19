const express = require('express');
const router = express.Router();
const multer = require('multer');

const addCollabs = require('./controllers/addCollabs');


const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/add', upload.array('images', 5), addCollabs);

module.exports = router;