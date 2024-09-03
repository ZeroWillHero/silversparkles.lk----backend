// controllers/markAsSold.js

const db = require('../../../model/mysql/index'); // Adjust the path as necessary
const Order = db.order;

const markAsSold = async (req, res) => {
    try {
        const orderId = req.params.id;

        // Find the order by ID
        const order = await Order.findByPk(orderId);

        if (!order) {
            return res.status(404).json({ message: 'Order not found.' });
        }

        // Update the order status to 'sold'
        await order.update({ status: 'sold' });

        res.status(200).json({ message: 'Order marked as sold.' });
    } catch (error) {
        console.error('Error marking order as sold:', error);
        res.status(500).json({ message: 'An error occurred while marking order as sold.' });
    }
};

module.exports = markAsSold;
