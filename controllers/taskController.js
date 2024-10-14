const taskService = require('../services/taskService');

// Create a new task
exports.createTask = async (req, res) => {
    try {
        const { title, description, status, assignedTo } = req.body;
        const newTask = await taskService.createTask({
            title, description, status, assignedTo, createdBy: req.user._id
        });
        res.status(201).json(newTask);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Get all tasks (can filter by status or assignedTo)
exports.getTasks = async (req, res) => {
    try {
        const tasks = await taskService.getTasks(req.query);
        res.status(200).json(tasks);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Update a task
exports.updateTask = async (req, res) => {
    try {
        const updatedTask = await taskService.updateTask(req.params.id, req.body);
        if (!updatedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json(updatedTask);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Delete a task
exports.deleteTask = async (req, res) => {
    try {
        const deletedTask = await taskService.deleteTask(req.params.id);
        if (!deletedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
