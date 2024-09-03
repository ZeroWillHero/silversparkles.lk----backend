const db = require('../../../model/mysql/index');
const Cart = db.cart;

const removeCartItem = async (req, res) => {
    try {
        const { cartItemId  } = req.body;
        // Find the cart item by its ID and delete it
        const deletedCartItem = await Cart.destroy({
            where: {
                id: cartItemId
            }
        });

        if (deletedCartItem === 1) {
            res.status(200).json({ message: 'Cart item deleted successfully' });
        } else {
            res.status(404).json({ error: 'Cart item not found' });
        }
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = removeCartItem;
