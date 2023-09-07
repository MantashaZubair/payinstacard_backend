const JWT = require('jsonwebtoken');

const requireSignin = async (req, res, next) => {
    const token = req.headers.authorization;
    console.log(token);
    
    try {
        const decoded = JWT.verify(token, process.env.JWT_SECRET);
        console.log(decoded);
        
        // Check if the token has expired
        if (Date.now() >= decoded.exp * 1000) {
            return res.status(401).json({ error: 'Token has expired' });
        }
        
        req.user = decoded;
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({ error: 'Invalid token' });
    }
};

module.exports = { requireSignin };



