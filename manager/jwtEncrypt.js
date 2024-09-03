const jwt = require('jsonwebtoken');

const encrypt = (data) => {
    const token = jwt.sign(
        {
            data
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '1h'

        });

    return token;
}

module.exports = encrypt;