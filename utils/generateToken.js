const jwt = require('jsonwebtoken');

// Function to generate a JWT
const generateToken = (userId, role) => {
    const payload = {
        id: userId,
        role: role,
    };

    // Sign the token with the secret key, set the expiration (e.g., 1 day)
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });

    return token;
};

module.exports = generateToken;
