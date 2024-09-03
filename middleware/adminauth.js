const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {

    try {
        const accessToken = req.headers.authorization.replace('Bearer ', ''); // get token from header
        const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
        //console.log("decoded data ",decoded.role);
        if(decoded.role !== 'admin' || decoded.status !== 'active'){
            return res.status(401).json({
                error: "Admin Authentication failed!"
            });
        }
        req.user = decoded; // add user data to request
        //console.log("decode data ",decoded);   
    } catch (error) {
        return res.status(401).json({
            error: "Admin Authentication failed!"
        });
    }

    next();
}

module.exports = auth;
