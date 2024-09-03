// controllers/addOrder.js

const db = require('../../../model/mysql/index'); // Adjust the path as necessary
const Order = db.order;
const Product = db.products;
const User = db.user;
const sendMail = require('../../../manager/mail');

const addOrder = async (req, res) => {
    const transaction = await db.sequelize.transaction();
    try {
        const { userId, productId, quantity, address, name, phone, email } = req.body;

        console.log('Order data:', req.body);
        // Validate the input data
        if (!userId || !Array.isArray(productId) || !Array.isArray(quantity) || !address || !name || !phone || !email) {
            return res.status(400).json({ message: 'All fields are required and productId, quantity must be arrays.' });
        }

        if (productId.length !== quantity.length) {
            return res.status(400).json({ message: 'Product IDs and quantity arrays must have the same length.' });
        }

        // Find the user to ensure they exist
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        let totalOrderPrice = 0;
        let orderedProducts = [];
        let productname = [];

        // Process each product in the order
        for (let i = 0; i < productId.length; i++) {
            const product_Id = productId[i];
            const quan = quantity[i];

            // Find the product to ensure it exists
            const product = await Product.findByPk(product_Id);

            if (!product) {
                await transaction.rollback();
                return res.status(404).json({ message: `Product with ID ${product_Id} not found.` });
            }

            if (product.stock < quan) {
                await transaction.rollback();
                return res.status(400).json({ message: `Insufficient stock for product with ID ${product_Id}.` });
            }

            // Update the product stock
            product.stock -= quan;
            await product.save({ transaction });

            // Calculate the total price for this product
            const totalPrice = product.price * quan;
            totalOrderPrice += totalPrice;

            // Create the order entry for this product
            const newOrder = await Order.create({
                userId,
                productId: product_Id,
                quantity:quan,
                totalPrice,
                address,
                name,
                phone,
                email,
                status: 'pending'
            }, { transaction });

            orderedProducts.push(newOrder);
            productname.push(product.title);
        }

        await transaction.commit();

        res.status(201).json({ message: 'Order created successfully', orders: orderedProducts });
        console.log('Order created successfully:', orderedProducts);

        console.log(productname);
        
        const data = {
            name,
            phone,
            email,
            address,
            products: orderedProducts.map((order, index) => ({
                title: productname[index], 
                quantity: order.quantity,
                totalPrice: order.totalPrice
            })),
            totalOrderPrice
        };
        console.log('Order data:', data);

        sendMail(email, "Order", data);
    } catch (error) {
        await transaction.rollback();
        console.error('Error creating order:', error);
        res.status(500).json({ message: 'An error occurred while creating the order.' });
    }
};

module.exports = addOrder;
