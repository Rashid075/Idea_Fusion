const jwt = require('jsonwebtoken');
const User = require('../Models/UserModel');

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.header('Authorization');
        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }
        const jwtToken = token.split(" ")[1]; // Remove "Bearer" prefix
        const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET);
        const userData = await User.findById(decoded.id).select('-password');
        req.user = userData;
        req.token = jwtToken; // Store the token without "Bearer"
        req.id = userData.id;
        next();
    } catch (error) {
        console.log(error.message);
        res.status(401).json({ message: 'Unauthorized' });
    }
}

module.exports = authMiddleware;
