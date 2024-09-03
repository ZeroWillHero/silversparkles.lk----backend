const db = require('../../../model/mysql/index');
const Cart = db.cart;

const addCartItem = async (req, res) => {
    try {
        const { productId, quantity, price, increment, decrement,userId } = req.body;
        // const userId = req.body.userId;

        // Check if the item already exists in the cart for the user
        const existingCartItem = await Cart.findOne({
            where: {
                userId: userId,
                productId: productId
            }
        });

        if (existingCartItem) {
            // If item exists, update quantity and price
            if (increment) {
                existingCartItem.quantity += quantity;
                existingCartItem.price += price;
                await existingCartItem.save();
                res.status(200).json(existingCartItem);
            } else if (decrement) {
                existingCartItem.quantity -= quantity;
                existingCartItem.price -= price;
                await existingCartItem.save();
                res.status(200).json(existingCartItem);
            } else {
                res.status(404).json({ error: "something went to wrong" });
            }
        } else {
            // If item doesn't exist, create a new cart item
            const newCartItem = await Cart.create({
                userId: userId,
                productId: productId,
                quantity: quantity,
                price: price
            });
            res.status(201).json(newCartItem);
        }
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = addCartItem;
