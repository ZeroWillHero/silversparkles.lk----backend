const db = require('../../../model/mysql/index');
const Wishlist = db.wishlist;


const getWishlist = async (req, res) => {

    try {
        const userId = req.params.userId; // Assuming user ID is available in req.user
        console.log(userId);
        const wishlistItems = await Wishlist.findAll({
            where: { userId },
            include: db.products
        });
        res.status(200).json(wishlistItems);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

}

module.exports = getWishlist;