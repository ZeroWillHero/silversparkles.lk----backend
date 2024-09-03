const db = require('../../../model/mysql/index'); // Adjust the path as necessary
const { order: Order } = db;
const { Op } = require('sequelize');
const moment = require('moment');

const getMonthlySalesData = async (req, res) => {
    try {
        const startOfMonth = moment().startOf('month').toDate();
        const endOfMonth = moment().endOf('month').toDate();

        const salesData = await Order.findAll({
            attributes: [
                [db.sequelize.fn('DATE', db.sequelize.col('createdAt')), 'date'],
                [db.sequelize.fn('SUM', db.sequelize.col('totalPrice')), 'totalSales']
            ],
            where: {
                createdAt: {
                    [Op.between]: [startOfMonth, endOfMonth]
                }
            },
            group: ['date'],
            order: [[db.sequelize.fn('DATE', db.sequelize.col('createdAt')), 'ASC']]
        });

        res.status(200).json(salesData);
    } catch (error) {
        console.error('Error fetching monthly sales data:', error);
        res.status(500).json({ message: 'An error occurred while fetching monthly sales data.' });
    }
};

module.exports =  getMonthlySalesData ;