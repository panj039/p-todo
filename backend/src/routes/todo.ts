import { Router, Request, Response } from 'express';
import Todo from '../models/Todo';

const router = Router();

// Get all todos
router.get('/', async (req: Request, res: Response) => {
	try {
		const todos = await Todo.find();
		res.json(todos);
	} catch (err) {
		const error = err as Error; // 将 err 断言为 Error 类型
		res.status(500).json({ message: error.message });
	}
});

// Create a new todo
router.post('/', async (req: Request, res: Response) => {
	const { title, completed } = req.body;
	const todo = new Todo({
		title,
		completed: completed || false,
	});

	try {
		const newTodo = await todo.save();
		res.status(201).json(newTodo);
	} catch (err) {
		const error = err as Error; // 将 err 断言为 Error 类型
		res.status(400).json({ message: error.message });
	}
});

// Get a single todo by ID
router.get('/:id', async (req: Request, res: Response) => {
	try {
		const todo = await Todo.findById(req.params.id);
		if (!todo) {
			return res.status(404).json({ message: 'Todo not found' });
		}
		res.json(todo);
	} catch (err) {
		const error = err as Error; // 将 err 断言为 Error 类型
		res.status(500).json({ message: error.message });
	}
});

// Update a todo
router.put('/:id', async (req: Request, res: Response) => {
	try {
		const todo = await Todo.findById(req.params.id);
		if (!todo) {
			return res.status(404).json({ message: 'Todo not found' });
		}
		todo.title = req.body.title ?? todo.title;
		todo.completed = req.body.completed ?? todo.completed;
		const updatedTodo = await todo.save();
		res.json(updatedTodo);
	} catch (err) {
		const error = err as Error; // 将 err 断言为 Error 类型
		res.status(400).json({ message: error.message });
	}
});

// Delete a todo
router.delete('/:id', async (req: Request, res: Response) => {
	try {
		const todo = await Todo.findById(req.params.id);
		if (!todo) {
			return res.status(404).json({ message: 'Todo not found' });
		}
		await todo.deleteOne();
		res.json({ message: 'Todo deleted' });
	} catch (err) {
		const error = err as Error; // 将 err 断言为 Error 类型
		res.status(500).json({ message: error.message });
	}
});

export default router;
