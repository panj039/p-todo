import Todo from '@/models/Todo';
import { Request, Response } from 'express';
import { Constant } from '@/defines/consts';

export const todo_list = async (req: Request, res: Response) => {
	try {
		const { page_no, page_size, selected_value } = req.query;
		const pageNo = Number(page_no) || 1;
		const pageSize = Math.min(Number(page_size) || 10, Constant.MaxPageSize);
		const selectedValue = Number(selected_value);

		// console.log(pageNo, pageSize, selectedValue);

		let todos;
		let totalCount;

		const username = req.user.username;
		const sortCondition = {
			completed: 1,   // 未完成 (completed: false) 排前面, 已完成 (completed: true) 排后面
			createdAt: 1    // 根据 createdAt 升序，老数据排前面
		};

		if (selectedValue == 1) {
			// 查询 completed 为 false 的 todos 的数量，并分页
			totalCount = await Todo.countDocuments({ username: username, completed: false });
			todos = await Todo.paginate({ username: username, completed: false }, { page: pageNo, limit: pageSize, sort: sortCondition });
		} else if (selectedValue == 2) {
			// 查询 completed 为 true 的 todos 的数量，并分页
			totalCount = await Todo.countDocuments({ username: username, completed: true });
			todos = await Todo.paginate({ username: username, completed: true }, { page: pageNo, limit: pageSize, sort: sortCondition });
		} else if (selectedValue == 3) {
			// 查询所有 todos，并分页
			totalCount = await Todo.countDocuments({ username: username });
			todos = await Todo.paginate({ username: username }, { page: pageNo, limit: pageSize, sort: sortCondition });
		} else {
			totalCount = 0;
			todos = [];
		}

		// 返回结果，包括分页后的 todos 和总数
		res.json({
			totalCount, // 总的 todo 数量
			todos       // 当前页面的 todos
		});
	} catch (err) {
		const error = err as Error; // 将 err 断言为 Error 类型
		res.status(500).json({ message: error.message });
	}
};

export const todo_create = async (req: Request, res: Response) => {
	const { title, completed, username } = req.body;
	const todo = new Todo({
		username,
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
};

export const todo_get = async (req: Request, res: Response) => {
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
};

export const todo_update = async (req: Request, res: Response) => {
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
};

export const todo_delete = async (req: Request, res: Response) => {
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
};