const User = require('../modes/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const generateToken = require('../utils/generateToken');

exports.register = async ({ name, email, password }) => {
    const userExists = await User.findOne({ email });
    if (userExists) {
        throw new Error('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });
    return { token: generateToken(user._id), user };
};

exports.login = async ({ email, password }) => {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new Error('Invalid email or password');
    }
    return { token: generateToken(user._id), user };
};

exports.assignRole = async (userId, role) => {
    const user = await User.findById(userId);
    if (!user) {
        throw new Error('User not found');
    }
    user.role = role;
    await user.save();
    return user;
};
