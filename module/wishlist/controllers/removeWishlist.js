const db = require('../../../model/mysql/index');
const Wishlist = db.wishlist;

const removeWishlistItem = async (req, res) => {
    try {
        const { itemId } = req.body;

        // Find the Wishlist item by its ID and delete it
        const deletedWishlistItem = await Wishlist.destroy({
            where: {
                id: itemId
            }
        });

        if (deletedWishlistItem === 1) {
            res.status(200).json({ message: 'Wishlist item deleted successfully' });
        } else {
            res.status(404).json({ error: 'Wishlist item not found' });
        }
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = removeWishlistItem;
