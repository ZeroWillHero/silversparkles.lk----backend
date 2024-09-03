const e = require('express');
const db = require('../../../model/mysql/index');
const Review = db.review;
const Product = db.products;

const addReview = async (req, res) => {
    const { userId, productId, rating } = req.body;
    console.log(req.body);

    if (rating < 1 || rating > 5) {
        return res.status(400).send({ message: 'Rating must be between 1 and 5' });
    }

    try {
        // Check if a review by the same user for the same product already exists
        let review = await Review.findOne({ where: { userId, productId } });

        if (review) {
            return res.status(400).send({ message: 'You have already reviewed this product' });
        } else {
            // Create a new review
            review = await Review.create({ userId, productId, rating });
        }


        const product = await Product.findByPk(productId);
        const productReview = JSON.parse(product.dataValues.review);

        if (1 === rating) {
            productReview[0].one = parseInt(productReview[0].one) + 1;
        } else if (2 === rating) {
            productReview[1].two = parseInt(productReview[1].two) + 1;
        } else if (3 === rating) {
            productReview[2].three = parseInt(productReview[2].three) + 1;
        } else if (4 === rating) {
            productReview[3].four = parseInt(productReview[3].four) + 1;
        } else if (5 === rating) {
            productReview[4].five = parseInt(productReview[4].five) + 1;
        }

        product.review = JSON.stringify(productReview);
        await product.save();

        return res.status(200).send({ message: 'Review added or updated successfully', review });
    } catch (error) {
        console.error('Error adding or updating review:', error);
        return res.status(500).send({ message: 'Internal server error' });
    }
};

module.exports = addReview;