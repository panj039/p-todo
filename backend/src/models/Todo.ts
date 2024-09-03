import { Schema, model, Document } from 'mongoose';

// Define an interface for the Todo document
interface ITodo extends Document {
	title: string;
	completed: boolean;
	createdAt: Date;
}

// Create a schema corresponding to the interface
const todoSchema = new Schema<ITodo>({
	title: { type: String, required: true },
	completed: { type: Boolean, default: false },
	createdAt: { type: Date, default: Date.now }
});

// Create a model
const Todo = model<ITodo>('Todo', todoSchema);

export default Todo;
