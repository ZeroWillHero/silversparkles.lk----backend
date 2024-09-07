const { Op } = require('sequelize');
const db = require('../../../model/mysql/index');
const Product = db.products;

const filterProducts = async (req, res) => {
    try {
        // Parse query parameters for filtering
        const { category, priceMin, priceMax, color, metal, stone, gender, iced_product, stock,style } = req.query;
        const filterCriteria = {};

        if (category) {
            filterCriteria.category = category;
        }
        if (priceMin && priceMax) {
            filterCriteria.price = {
                [Op.between]: [parseFloat(priceMin), parseFloat(priceMax)]
            };
        } else if (priceMin) {
            filterCriteria.price = {
                [Op.gte]: parseFloat(priceMin)
            };
        } else if (priceMax) {
            filterCriteria.price = {
                [Op.lte]: parseFloat(priceMax)
            };
        }
        
        if (color) {
            filterCriteria.color = color;
        }
        if (metal) {
            filterCriteria.metal = metal;
        }
        if (stone) {
            filterCriteria.stone = stone;
        }
        if (gender) {
            filterCriteria.gender = gender;
        }
        if (iced_product) {
            filterCriteria.iced_product = (iced_product === 'true'); // Convert string to boolean
        }
        if (stock) {
            filterCriteria.stock = stock;
        }
        if (style){
            filterCriteria.style = style;
        }

        // Query products based on filter criteria
        const filteredProducts = await Product.findAll({
            where: filterCriteria
        });

        if (filteredProducts.length === 0) {
            return res.status(404).json({ message: 'No products found matching the criteria' });
        }

        res.status(200).json(filteredProducts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to filter products' });
    }
};

module.exports = filterProducts;
