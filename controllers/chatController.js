const chatService = require('../services/chatService');

// Send a chat message
exports.sendMessage = async (req, res) => {
    try {
        const { projectId, message } = req.body;
        const chatMessage = await chatService.sendMessage(req.user._id, projectId, message);
        res.status(201).json(chatMessage);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Get chat history for a project
exports.getChatHistory = async (req, res) => {
    try {
        const { projectId } = req.params;
        const messages = await chatService.getChatHistory(projectId);
        res.status(200).json(messages);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
