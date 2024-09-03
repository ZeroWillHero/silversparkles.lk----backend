// controllers/getTopSoldProducts.js

const db = require('../../../model/mysql/index'); // Adjust the path as necessary
const { order: Order, products: Product } = db;
const { sequelize } = db;

const getTopSoldProducts = async (req, res) => {
    try {
        // Aggregate orders to count total quantity sold for each product
        const topSoldProducts = await Order.findAll({
            attributes: [
                'productId',
                [sequelize.fn('SUM', sequelize.col('quantity')), 'totalSold']
            ],
            group: ['productId'],
            order: [[sequelize.literal('totalSold'), 'DESC']],
            limit: 5,
            include: [{
                model: Product,
                attributes: ['title', 'price', 'images'] // Include additional product details if needed
            }]
        });

        res.status(200).json(topSoldProducts);
    } catch (error) {
        console.error('Error fetching top sold products:', error);
        res.status(500).json({ message: 'An error occurred while fetching top sold products.' });
    }
};

module.exports = getTopSoldProducts;
