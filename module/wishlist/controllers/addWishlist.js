const db = require('../../../model/mysql/index');
const Wishlist = db.wishlist;

const addWishlist = async (req, res) => {
    try {
        const { productId } = req.body;
        const userId = req.body.userId; // Assuming user ID is available in req.user

        // Create new wishlist item
        const data ={
            userId:userId,
            productId:productId
        }
        console.log("data",data);
        await Wishlist.create(data).then((result) => {
            res.status(200).json({
                status: "success",
                message: "Item added to wishlist",
                data: result
            });
        }).catch((error) => {
            console.error("Error:", error);
            res.status(500).json({ error: error.message });
        });
    } catch (error) {
        // Handle errors
        console.error("Error:", error);
        res.status(500).json({ error: error.message });
    }
}

module.exports = addWishlist;