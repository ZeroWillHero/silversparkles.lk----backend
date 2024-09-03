const jwt = require('jsonwebtoken');
const db = require('../../../model/mysql/index');

const User = db.user;

const verifyEmail = async (req, res) => {
    const { token } = req.query;
    

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Sequelize code 
        // Check if the user exists
        const user = await User.findOne({ where: { email: decoded.data } });
        if (!user) {
            return res.status(400).send('Invalid Email.');
        }

        // Update the user status to active
        await User.update({ status: 'active' }, { where: { email: decoded.data } });
        return res.status(200).send(`Email ${decoded.data} verified successfully!`);


    } catch (error) {
        res.status(400).send('Invalid or expired token.');
    }
};

module.exports = verifyEmail;

