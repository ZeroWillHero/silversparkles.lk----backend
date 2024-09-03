const db = require('../../../model/mysql/index');
const Cart = db.cart;

const getCartItems = async (req, res) => {
    try {
        const userId = req.params.id; // Assuming user ID is available in req.user

        // Find all cart items for the user
        const cartItems = await Cart.findAll({
            where: {
                userId: userId
            },
            include: [db.products] // Include product details if needed
        });

        res.status(200).json(cartItems);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = getCartItems;
