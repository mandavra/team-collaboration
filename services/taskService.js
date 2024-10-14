const Task = require('../modes/Task');

// Create a new task
exports.createTask = async (taskData) => {
    const newTask = new Task(taskData);
    return await newTask.save();
};

// Get tasks with optional filtering (e.g., by status or assigned user)
exports.getTasks = async (filters) => {
    const query = {};

    if (filters.status) {
        query.status = filters.status;
    }
    if (filters.assignedTo) {
        query.assignedTo = filters.assignedTo;
    }

    return await Task.find(query)
                     .populate('assignedTo', 'name email')
                     .populate('createdBy', 'name email');
};

// Update a task by ID
exports.updateTask = async (taskId, updateData) => {
    return await Task.findByIdAndUpdate(taskId, updateData, { new: true });
};

// Delete a task by ID
exports.deleteTask = async (taskId) => {
    return await Task.findByIdAndDelete(taskId);
};
