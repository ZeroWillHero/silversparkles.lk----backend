const jwt = require('jsonwebtoken');

const jwtManager = (user) => {
    console.log("User data",user);
    const accessToken = jwt.sign({
        id: user.id,
        name: user.name,
        status: user.status,
        role: user.role
    }, process.env.JWT_SECRET, {
        expiresIn: '24h'
    });

    return accessToken;
}

module.exports = jwtManager;