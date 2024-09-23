import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import authRoutes from '@/routes/auth';
import todoRoutes from '@/routes/todo';

const result = dotenv.config();
if (result.error) {
	console.error('Error loading .env file:', result.error);
} else {
	console.log('Successfully loaded .env');
	console.log('Parsed variables:', result.parsed); // 输出读取到的环境变量
}

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
app.use('/api/auth', authRoutes);
app.use('/api/todo', todoRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
