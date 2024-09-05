import mongoose, { Schema, model, Document } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

// 定义 ITodo 接口
interface ITodo extends Document {
	title: string;
	completed: boolean;
	createdAt: Date;
}

// 定义 todoSchema
const todoSchema = new Schema<ITodo>({
	title: { type: String, required: true },
	completed: { type: Boolean, default: false },
	createdAt: { type: Date, default: Date.now }
});

// 将 paginate 插件应用到 schema
todoSchema.plugin(mongoosePaginate);

// 导出模型，并通过 PaginateModel 扩展 Model 类型
const Todo = model<ITodo, mongoose.PaginateModel<ITodo>>('Todo', todoSchema);

export default Todo;
