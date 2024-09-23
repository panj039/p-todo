import { Router } from 'express';
import { authMiddleware } from '@/middleware/auth';
import { todo_list, todo_create, todo_get, todo_update, todo_delete } from '@/controllers/todo';

const router = Router();

// Get all todos
router.get('/', authMiddleware, todo_list);

// Create a new todo
router.post('/', authMiddleware, todo_create);

// Get a single todo by ID
router.get('/:id', authMiddleware, todo_get);

// Update a todo
router.put('/:id', authMiddleware, todo_update);

// Delete a todo
router.delete('/:id', authMiddleware, todo_delete);

export default router;
