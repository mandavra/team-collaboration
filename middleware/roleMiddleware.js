module.exports = (requiredRole) => {
    return (req, res, next) => {
        // If the user is not authenticated, return a 401 Unauthorized response
        if (!req.user) {
            return res.status(401).json({ message: 'Unauthorized: No user found' });
        }

        // Check if the user has the required role
        if (req.user.role !== requiredRole) {
            return res.status(403).json({ message: 'Forbidden: Insufficient role' });
        }

        // If the user has the correct role, proceed to the next middleware or route handler
        next();
    };
};
