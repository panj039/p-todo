<template>
	<div :class="['todo-item', d_todo.completed ? 'completed' : 'incomplete']">
		<!-- 输入框单独一行 -->
		<div class="todo-title-container">
			<input type="text" v-model="d_todo.title" :readonly="d_todo._id !== undefined" class="todo-title">
		</div>

		<!-- 如果Todo还没有ID，显示添加和取消按钮 -->
		<div v-if="d_todo._id === undefined" class="todo-actions">
			<span class="todo-date"></span>
			<div class="button-group">
				<input type="button" value="✔" @click="add" class="add-button" title="添加">
				<input type="button" value="✘" @click="cancelAdd" class="cancel-button" title="取消">
			</div>
		</div>

		<!-- 如果Todo有ID，显示时间、完成与删除按钮 -->
		<div v-else class="todo-actions">
			<span class="todo-date">{{ formatDate(d_todo.createdAt) }}</span>
			<div class="button-group">
				<input v-if="!d_todo.completed" type="button" value="✔" @click="complete" class="complete-button"
					title="完成">
				<input v-else type="button" value=" " class="complete-button hidden-button" title="占位按钮">
				<input type="button" value="✘" @click="todo_delete" class="delete-button" title="删除">
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { inject } from 'vue';
import RequestUtil from '@/utils/request';
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
	RequestUtil.post("", props.d_todo).then(response => {
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
	RequestUtil.put(props.d_todo._id, props.d_todo).catch(error => {
		props.d_todo.completed = false;
		console.error(error);
	});
}

function todo_delete() {
	// 向服务器发送请求，删除待办事项
	RequestUtil.delete(props.d_todo._id).then(() => {
		if (getTodos) {
			getTodos();
		} else {
			console.error('获取函数getTodos失败');
		}
	});
}

function formatDate(date: Date | undefined): string {
	if (!date) {
		return '';
	}
	return date.toLocaleString(); // 格式化日期为本地字符串形式
}
</script>

<style scoped>
.todo-item {
	display: flex;
	flex-direction: column;
	margin-bottom: 10px;
	padding: 15px;
	border-radius: 8px;
	border: 1px solid transparent;
	/* 默认透明边框 */
	width: 100%;
	/* 让 todo-item 占据整个容器宽度 */
}

/* 未完成的任务样式 */
.incomplete {
	background-color: #ffe6e6;
	/* 浅红色背景 */
	/* border-color: #ff4d4d; */
	/* 红色边框 */
	box-shadow: 0 0 10px rgba(255, 77, 77, 0.2);
	/* 红色阴影 */
}

/* 已完成的任务样式 */
.completed {
	background-color: #e6ffe6;
	/* 浅绿色背景 */
	/* border-color: #28a745; */
	/* 绿色边框 */
	box-shadow: 0 0 10px rgba(40, 167, 69, 0.2);
	/* 绿色阴影 */
}

/* 输入框单独一行 */
.todo-title-container {
	margin: 5px;
}

/* 右对齐时间和按钮 */
.todo-actions {
	display: flex;
	justify-content: flex-end;
	align-items: center;
}

/* 日期和按钮组 */
.todo-date {
	font-size: 12px;
	color: #666;
	margin-right: 10px;
}

.button-group {
	display: flex;
	gap: 5px;
	/* 控制按钮之间的间距 */
	margin-right: 5px;
}

.todo-title {
	width: 100%;
	padding: 5px;
	border: 1px solid #ccc;
	border-radius: 4px;
	background-color: #ffffff;
	box-sizing: border-box;
}

/* 按钮样式 */
.add-button,
.complete-button,
.cancel-button,
.delete-button {
	margin-bottom: 5px;
	padding: 5px 8px;
	font-size: 12px;
	background-color: #007bff;
	color: white;
	border: none;
	border-radius: 4px;
	cursor: pointer;
}

.hidden-button {
	visibility: hidden; /* 隐藏的按钮占位符，保持布局 */
}

.cancel-button,
.delete-button {
	background-color: #dc3545;
}

.cancel-button:hover,
.delete-button:hover {
	background-color: #c82333;
}

.add-button:hover,
.complete-button:hover {
	background-color: #0056b3;
}
</style>