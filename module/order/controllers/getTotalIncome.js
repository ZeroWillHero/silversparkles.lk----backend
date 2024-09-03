// controllers/getTotalIncome.js

const db = require('../../../model/mysql/index'); // Adjust the path as necessary
const { order: Order } = db;
const { sequelize } = db;

const getTotalIncome = async (req, res) => {
    try {
        // Sum the totalPrice of all orders to calculate total income
        const totalIncome = await Order.findAll({
            attributes: [
                [sequelize.fn('SUM', sequelize.col('totalPrice')), 'totalIncome']
            ]
        });

        res.status(200).json(totalIncome);
    } catch (error) {
        console.error('Error fetching total income:', error);
        res.status(500).json({ message: 'An error occurred while fetching total income.' });
    }
};

module.exports = getTotalIncome;
