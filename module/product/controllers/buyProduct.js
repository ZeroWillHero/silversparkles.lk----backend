const db = require("../../../model/mysql/index");
const { Op } = require('sequelize');

const buyProduct = async (req, res) => {
    const { userId, productId, quantity } = req.body;

    try {
        // Find the product
        const product = await db.products.findByPk(productId);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Check if stock is available
        if (product.stock < quantity) {
            return res.status(400).json({ message: 'Not enough stock available' });
        }

        // Calculate total price
        const totalPrice = product.price * quantity;

        // Create order
        const order = await db.order.create({
            userId,
            productId,
            quantity,
            totalPrice
        });

        // Remove item from cart
        await db.cart.destroy({
            where: {
                [Op.and]: [
                    { userId },
                    { productId }
                ]
            }
        });

        // Update stock
        product.stock -= quantity;
        await product.save();

        return res.status(200).json({ message: 'Purchase successful', order });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = buyProduct;
