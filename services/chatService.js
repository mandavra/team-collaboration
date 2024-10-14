const Chat = require('../modes/chat');

// Send a chat message
exports.sendMessage = async (senderId, projectId, message) => {
    const newMessage = new Chat({
        sender: senderId,
        projectId,
        message
    });
    return await newMessage.save();
};

// Get chat history for a specific project
exports.getChatHistory = async (projectId) => {
    return await Chat.find({ projectId })
                     .populate('sender', 'name')
                     .sort({ timestamp: 1 });
};
