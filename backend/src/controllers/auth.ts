// controllers/auth.ts
import { Request, Response } from 'express';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// 注册逻辑
export const register = async (req: Request, res: Response) => {
	const { username, password } = req.body;

	try {
		const hashedPassword = await bcrypt.hash(password, 10);
		const user = new User({ username, password: hashedPassword });
		await user.save();
		res.status(201).json({ message: 'User created' });
	} catch (error) {
		res.status(500).json({ error: 'Registration failed' });
	}
};

// 登录逻辑
export const login = async (req: Request, res: Response) => {
	const { username, password } = req.body;

	try {
		const user = await User.findOne({ username });
		if (!user) return res.status(404).json({ error: 'User not found' });

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

		const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET!, { expiresIn: '1h' });
		res.json({ token });
	} catch (error) {
		console.log(process.env.JWT_SECRET)
		console.log(error);
		res.status(500).json({ error: 'Login failed' });
	}
};
