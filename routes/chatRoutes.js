const express = require('express');
const chatController = require('../controllers/chatController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Protected routes
router.post('/', authMiddleware, chatController.sendMessage);  // Send chat message
router.get('/:projectId', authMiddleware, chatController.getChatHistory); // Get chat history for a project

module.exports = router;
