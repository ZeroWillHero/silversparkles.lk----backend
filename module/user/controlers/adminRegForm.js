const path = require('path');
const fs = require('fs');
require('dotenv').config();

const adminRegForm = async (req, res) => {
    try {
        const htmlFilePath = path.join(__dirname, 'public', 'adminReg.html');
        fs.readFile(htmlFilePath, 'utf8', (err, data) => {
            if (err) {
                return res.status(500).send('Error reading the HTML file');
            }
            // Replace the placeholder with the environment variable value
            const updatedHtml = data.replace('{{BASE_URL}}', process.env.BASE_URL);
            res.send(updatedHtml);
        });
    } catch (error) {
        res.status(400).send('Something went wrong!');
    }
};

module.exports = adminRegForm;
