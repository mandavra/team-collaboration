const authService = require('../services/authService');

exports.register = async (req, res) => {
    try {
        const result = await authService.register(req.body);
        res.status(201).json(result);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.login = async (req, res) => {
    try {
        const result = await authService.login(req.body);
        res.status(200).json(result);
    } catch (err) {
        res.status(401).json({ error: err.message });
    }
};

exports.assignRole = async (req, res) => {
    try {
        const result = await authService.assignRole(req.params.id, req.body.role);
        res.status(200).json(result);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
