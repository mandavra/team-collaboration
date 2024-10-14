const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');
const socketIO = require('socket.io');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const chatRoutes = require('./routes/chatRoutes');

const app = express();

// Middleware
app.use(express.json());
app.use(helmet());
app.use(cors());

// API Routes
app.use('/auth', authRoutes);
app.use('/tasks', taskRoutes);
app.use('/chat', chatRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Real-time Chat with Socket.IO
const server = app.listen(process.env.PORT || 5000, () => {
    console.log(`Server running on port ${process.env.PORT || 5000}`);
});

const io = socketIO(server);
io.on('connection', (socket) => {
    console.log('New client connected');
    
    socket.on('joinProjectRoom', (projectId) => {
        socket.join(projectId);
        console.log(`User joined room for project ${projectId}`);
    });

    socket.on('sendMessage', (data) => {
        const { projectId, message } = data;
        io.to(projectId).emit('receiveMessage', message);
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});
