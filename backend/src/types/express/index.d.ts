import { JwtPayload } from 'jsonwebtoken';
import User from '@/models/User'

declare global {
	namespace Express {
		interface Request {
			user?: User | JwtPayload; // 你可以根据实际需求设置 user 的类型
		}
	}
}
