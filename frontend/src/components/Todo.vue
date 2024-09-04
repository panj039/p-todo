<template>
	<div class="todo-item">
		<!-- 根据完成情况显示不同的图标 -->
		<label v-if="d_todo.completed" class="completed-icon">✔</label>
		<label v-else class="incomplete-icon">✘</label>

		<!-- 显示待办事项的标题 -->
		<input type="text" v-model="d_todo.title" :readonly="d_todo._id !== undefined" class="todo-title">

		<!-- 显示待办事项的创建时间 -->
		<span class="todo-date">{{ formatDate(d_todo.createdAt) }}</span>

		<!-- 如果Todo还没有ID，显示添加按钮 -->
		<input v-if="d_todo._id === undefined" type="button" value="添加" @click="add" class="add-button">

		<!-- 如果Todo没有完成，显示完成按钮 -->
		<input v-else-if="!d_todo.completed" type="button" value="完成" @click="complete" class="complete-button">
	</div>
</template>

<script setup lang="ts">
import axios from 'axios';
import Todo from './defines/todo.ts'

const props = defineProps<{
	d_todo: Todo
}>()

function add() {
	// 检查标题是否为空
	if (props.d_todo.title.trim() === '') {
		console.error('标题不能为空');
		return;
	}

	// 向服务器发送请求，添加新的待办事项
	axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/todos`, props.d_todo).then(response => {
		props.d_todo._id = response.data._id;
	}).catch(error => {
		console.error(error);
	});
}

function complete() {
	// 更新待办事项为已完成
	props.d_todo.completed = true;
	axios.put(`${import.meta.env.VITE_API_BASE_URL}/api/todos/${props.d_todo._id}`, props.d_todo).catch(error => {
		props.d_todo.completed = false;
		console.error(error);
	});
}

function formatDate(dateString: string): string {
	const date = new Date(dateString);
	return date.toLocaleString(); // 格式化日期为本地字符串形式
}
</script>

<style scoped>
.todo-item {
	display: flex;
	align-items: center;
	margin-bottom: 10px;
}

.completed-icon {
	color: green;
	margin-right: 10px;
	font-size: 18px;
}

.incomplete-icon {
	color: red;
	margin-right: 10px;
	font-size: 18px;
}

.todo-title {
	flex-grow: 1;
	padding: 5px;
	margin-right: 10px;
	border: 1px solid #ccc;
	border-radius: 4px;
}

.todo-date {
	font-size: 12px;
	color: #666;
	margin-right: 10px;
}

.add-button,
.complete-button {
	padding: 5px 10px;
	font-size: 14px;
	background-color: #007bff;
	color: white;
	border: none;
	border-radius: 4px;
	cursor: pointer;
}

.add-button:hover,
.complete-button:hover {
	background-color: #0056b3;
}
</style>