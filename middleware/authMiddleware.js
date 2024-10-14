const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
    // Extract token from the Authorization header
    const token = req.header('Authorization')?.replace('Bearer ', '');

    // If no token is found, return an unauthorized error
    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        // Verify the token using the secret
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach the user info (decoded payload) to the request object
        req.user = decoded;

        // Continue to the next middleware or route handler
        next();
    } catch (err) {
        // If token is invalid or expired, return an unauthorized error
        res.status(401).json({ message: 'Token is not valid' });
    }
};
