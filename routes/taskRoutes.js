const express = require('express');
const taskController = require('../controllers/taskController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

const router = express.Router();

// Protected routes (authMiddleware ensures user is authenticated)
router.post('/', authMiddleware, taskController.createTask);  // Create a new task
router.get('/', authMiddleware, taskController.getTasks);     // Get tasks (with optional filters)
router.put('/:id', authMiddleware, taskController.updateTask);  // Update a task
router.delete('/:id', authMiddleware, roleMiddleware('Admin'), taskController.deleteTask);  // Delete a task (only Admin)

// Export the router
module.exports = router;
