import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import todoRoutes from './routes/todo';

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
const MONGODB_URL = process.env.MONGODB_URL || 'mongodb://localhost:27017/p-todo';
mongoose.connect(MONGODB_URL)
	.then(() => console.log('MongoDB connected...'))
	.catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/todos', todoRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
