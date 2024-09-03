const jwt = require('jsonwebtoken');
const db = require('../../../model/mysql/index');

const User = db.user;

const AdminVerifyEmail = async (req, res) => {
    const { token } = req.query;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded)

        const user = await User.findOne({ where: { email: decoded.data } });
        if (!user) {
            return res.status(400).send('Invalid Email.');
        }

        if (user.dataValues.role === 'admin_Pending' && user.dataValues.status === "active") {

            // Update the user status to active
            await User.update({ role: 'admin' }, { where: { email: decoded.data } });
            return res.status(200).send(`Email ${decoded.data} verified successfully!`);
        }else{
            return res.status(400).send('user not confrom email')
        }



    } catch (error) {
        res.status(400).send('Invalid or expired token.');
    }
};

module.exports = AdminVerifyEmail;

