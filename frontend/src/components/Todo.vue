<template>
	<div :class="['todo-item', d_todo.completed ? 'completed' : 'incomplete']">
		<!-- 根据完成情况显示不同的图标 -->
		<label v-if="d_todo.completed" class="completed-icon">✔</label>
		<label v-else class="incomplete-icon">✘</label>

		<!-- 显示待办事项的标题 -->
		<input type="text" v-model="d_todo.title" :readonly="d_todo._id !== undefined" class="todo-title">

		<!-- 显示待办事项的创建时间 -->
		<span class="todo-date">{{ formatDate(d_todo.createdAt) }}</span>

		<!-- 如果Todo还没有ID，显示添加和取消按钮 -->
		<div v-if="d_todo._id === undefined">
			<input type="button" value="添加" @click="add" class="add-button">
			<input type="button" value="取消" @click="cancelAdd" class="cancel-button">
		</div>

		<!-- 如果Todo没有完成，显示完成按钮 -->
		<input v-else-if="!d_todo.completed" type="button" value="完成" @click="complete" class="complete-button">
	</div>
</template>

<script setup lang="ts">
import { inject } from 'vue';
import axios from 'axios';
import Todo from '@/defines/todo'

const props = defineProps<{
	d_todo: Todo
}>()

// 获取待办事项列表
const getTodos = inject<() => Promise<void>>('getTodos')
const cancelAdd = inject<() => void>('cancelAdd')

function add() {
	// 检查标题是否为空
	if (props.d_todo.title.trim() === '') {
		console.error('标题不能为空');
		return;
	}

	// 向服务器发送请求，添加新的待办事项
	axios.post(`${import.meta.env.VITE_API_URL}/api/todos`, props.d_todo).then(response => {
		props.d_todo._id = response.data._id;
		if (getTodos) {
			getTodos();
		} else {
			console.error('获取函数getTodos失败');
		}
	}).catch(error => {
		console.error(error);
	});
}

function complete() {
	// 更新待办事项为已完成
	props.d_todo.completed = true;
	axios.put(`${import.meta.env.VITE_API_URL}/api/todos/${props.d_todo._id}`, props.d_todo).catch(error => {
		props.d_todo.completed = false;
		console.error(error);
	});
}

function formatDate(date: Date | undefined): string {
	if (!date) {
		return '';
	}
	// const date = new Date(dateString);
	return date.toLocaleString(); // 格式化日期为本地字符串形式
}
</script>

<style scoped>
.todo-item {
	display: flex;
	align-items: center;
	margin-bottom: 10px;
	padding: 15px;
	border-radius: 8px;
	border: 1px solid transparent;
	/* 默认透明边框 */
}

/* 未完成的任务样式 */
.incomplete {
	background-color: #ffe6e6;
	/* 浅红色背景 */
	border-color: #ff4d4d;
	/* 红色边框 */
	box-shadow: 0 0 10px rgba(255, 77, 77, 0.2);
	/* 红色阴影 */
}

/* 已完成的任务样式 */
.completed {
	background-color: #e6ffe6;
	/* 浅绿色背景 */
	border-color: #28a745;
	/* 绿色边框 */
	box-shadow: 0 0 10px rgba(40, 167, 69, 0.2);
	/* 绿色阴影 */
}

/* 其他样式 */
.completed-icon {
	color: #28a745;
	margin-right: 10px;
	font-size: 18px;
}

.incomplete-icon {
	color: #ff4d4d;
	margin-right: 10px;
	font-size: 18px;
}

.todo-title {
	flex-grow: 1;
	padding: 5px;
	margin-right: 10px;
	border: 1px solid #ccc;
	border-radius: 4px;
	background-color: #ffffff;
	/* 输入框的背景颜色 */
}

.todo-date {
	font-size: 12px;
	color: #666;
	margin-right: 10px;
}

.add-button,
.complete-button,
.cancel-button {
	padding: 5px 10px;
	font-size: 14px;
	background-color: #007bff;
	color: white;
	border: none;
	border-radius: 4px;
	cursor: pointer;
}

.cancel-button {
	background-color: #dc3545;
}

.cancel-button:hover {
	background-color: #c82333;
}

.add-button:hover,
.complete-button:hover {
	background-color: #0056b3;
}
</style>