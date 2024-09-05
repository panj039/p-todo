<template>
	<div class="todos-container">
		<!-- 循环渲染每个待办事项 -->
		<ul>
			<li v-for="d_todo in props.d_todos" :key="d_todo.id" class="todo-item">
				<V_Todo :d_todo="d_todo" />
			</li>
		</ul>

		<!-- 分页控件 -->
		<div class="pagination">
			<button @click="prevPage" :disabled="page.no === 1">上一页</button>
			<span>第 {{ page.no }} 页 / 共 {{ totalPages }} 页</span>
			<button @click="nextPage" :disabled="page.no === totalPages">下一页</button>
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue';
import V_Todo from './Todo.vue';
import Todo from '@/defines/todo.ts';
import Page from '@/defines/page.ts';
import { Selected } from '@/defines/selected.ts';

const props = defineProps<{
	d_todos: Todo[],
	selected_value: number,
	page: Page
}>();

// 计算总页数
const totalPages = computed(() => {
	return Math.ceil(props.page.total / props.page.size);
});

// 获取待办事项列表
const getTodos = inject('getTodos')

// 切换到上一页
function prevPage() {
	if (props.page.no > 1) {
		props.page.no--;
		getTodos();
	}
}

// 切换到下一页
function nextPage() {
	if (props.page.no < totalPages.value) {
		props.page.no++;
		getTodos();
	}
}

</script>

<style scoped>
.todos-container {
	margin: 20px;
	padding: 10px;
	background-color: #f9f9f9;
	border-radius: 8px;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

ul {
	list-style-type: none;
	padding: 0;
}

.todo-item {
	padding: 10px;
	margin-bottom: 1px;
	border-radius: 4px;
}

.pagination {
	display: flex;
	justify-content: center;
	align-items: center;
	margin-top: 20px;
}

.pagination button {
	padding: 5px 10px;
	margin: 0 10px;
	background-color: #007bff;
	color: white;
	border: none;
	border-radius: 4px;
	cursor: pointer;
}

.pagination button:disabled {
	background-color: #ccc;
	cursor: not-allowed;
}

.pagination span {
	font-size: 14px;
}
</style>