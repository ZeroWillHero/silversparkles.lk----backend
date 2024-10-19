const express = require('express');
const router = express.Router();

const addCollabs = require('./controllers/addCollabs');

router.post('/add', addCollabs);

module.exports = router;