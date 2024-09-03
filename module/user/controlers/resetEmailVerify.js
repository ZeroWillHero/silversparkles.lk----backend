const path = require('path');
const fs = require('fs');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const db = require("../../../model/mysql/index");

// Mysql DB model call
const UserDB = db.user;

const verifyEmail = async (req, res) => {
    const { token } = req.query;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Check if the user exists
        const user = await UserDB.findOne({ where: { email: decoded.data } });
        if (!user) {
            return res.status(400).send('Invalid Email.');
        }

        // Read the HTML file
        const htmlFilePath = path.join(__dirname, 'public', 'passwordReset.html');
        fs.readFile(htmlFilePath, 'utf8', (err, data) => {
            if (err) {
                return res.status(500).send('Error reading the HTML file');
            }

            // Replace the placeholder with the environment variable value
            const updatedHtml = data.replace('{{BASE_URL}}', process.env.BASE_URL);
            res.send(updatedHtml);
        });
    } catch (error) {
        res.status(400).send('Invalid or expired token.');
    }
};

module.exports = verifyEmail;
