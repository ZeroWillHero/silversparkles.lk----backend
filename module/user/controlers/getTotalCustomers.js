
const db = require('../../../model/mysql/index'); // Adjust the path as necessary
const { user: User } = db;

const getTotalCustomers = async (req, res) => {
    try {
        // Count the total number of customers in the user table
        const totalCustomers = await User.count();

        res.status(200).json({ totalCustomers });
    } catch (error) {
        console.error('Error fetching total customers:', error);
        res.status(500).json({ message: 'An error occurred while fetching total customers.' });
    }
};

module.exports = getTotalCustomers;
