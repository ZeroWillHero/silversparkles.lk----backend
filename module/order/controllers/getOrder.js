const db = require('../../../model/mysql/index');
const Order = db.order;
const User = db.user;
const Product = db.products;

const getOrders = async (req, res) => {
    try {
        const { status } = req.query;
        let whereCondition = {};

        // Filter by status if provided
        if (status) {
            whereCondition.status = status;
        }
        const orders = await Order.findAll({
            where: whereCondition,
            include: [
                {
                    model: User,
                    attributes: ['name', 'email'] // Include necessary user attributes
                },
                {
                    model: Product,
                    attributes: ['title', 'images', 'color', 'ring_size','metal'], // Include necessary product attributes
                }
            ]
        });

        const ordersWithParsedImages = orders.map(order => {
            const productsWithImages = order.product ? {
                ...order.product.toJSON(), // Convert Sequelize instance to JSON object
                images: typeof order.product.images === 'string' ? JSON.parse(order.product.images) : order.product.images // Parse images JSON string to array of objects
            } : null;

            return {
                ...order.toJSON(),
                product: productsWithImages
            };
        });

        res.status(200).json(ordersWithParsedImages);
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ message: 'An error occurred while fetching orders.' });
    }
};

module.exports = getOrders;
