const express = require('express');
const router = express.Router();
const multer = require('multer');
const middleware = require("../../middleware/auth");
const addOrder = require("./controllers/addOder");
const getOrders = require("./controllers/getOrder");
const updateOrder = require("./controllers/updateOder");
const mostorder = require("./controllers/mostOder");
const getTotalIncome = require("./controllers/getTotalIncome");
const getOrderIncomeChartData  = require("./controllers/oderIncomeChart");
const adminMiddleware = require("../../middleware/adminauth")
const upload = multer();


router.use(middleware);
router.post('/add',upload.none(), addOrder);
router.get('/get', getOrders);

router.use(adminMiddleware);
router.put('/update/:id', updateOrder);
router.get('/mostorder', mostorder);
router.get('/total-income', getTotalIncome);
router.get('/income-chart-data', getOrderIncomeChartData);


// export router 
module.exports = router;
