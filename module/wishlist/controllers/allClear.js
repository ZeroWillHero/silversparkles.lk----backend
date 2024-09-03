const db = require('../../../model/mysql/index');
const Wishlist = db.wishlist;

const removeAllWishlistItems = async (req, res) => {
    try {
        const userId = req.user.id; 

        // Delete all Wishlist items for the user
        const deletedCount = await Wishlist.destroy({
            where: {
                userId: userId
            }
        });

        res.status(200).json({ message: `Deleted ${deletedCount} wishlist items for user ${userId}` });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = removeAllWishlistItems;
