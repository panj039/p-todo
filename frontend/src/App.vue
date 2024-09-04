<template>
	<div class="app-container">
		<!-- 待办事项头部 -->
		<V_Header :d_todos="d_todos" v-model:selected="selected" />

		<!-- 待办事项列表 -->
		<V_Todos :d_todos="d_todos" :selected_value="selectedValue" />
	</div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue';
import axios from 'axios';
import V_Header from './components/Header.vue';
import V_Todos from './components/Todos.vue';
import Todo from '@/defines/todo.ts';
import { Selected } from '@/defines/selected.ts';

const d_todos = ref([]);
const selected = ref<number[]>([Selected.Incomplete]);

const selectedValue = computed(() => {
	sortTodos();

	let sum: number = 0;
	for (let index = 0; index < selected.value.length; index++) {
		sum += selected.value[index];
	}
	return sum;
});

const sortTodos = () => {
	d_todos.value.sort((a: Todo, b: Todo) => {
		// 根据 completed 状态排序，未完成的在前
		if (a.completed !== b.completed) {
			return a.completed ? 1 : -1;
		}
		// 如果 completed 状态相同，则根据 createdAt 排序，较早创建的在前
		return a.createdAt - b.createdAt;
	});
};

onMounted(async () => {
	try {
		const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/todos`);
		response.data.forEach((todo: Todo) => {
			d_todos.value.push(new Todo(todo.title, todo.completed, todo.createdAt, todo._id));
		});
		sortTodos();
	} catch (err) {
		console.error('拉取数据报错:', err);
	}
});
</script>

<style scoped>
.app-container {
	margin: 20px;
	padding: 20px;
	background-color: #f0f0f0;
	border-radius: 10px;
	box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.app-container h1 {
	font-size: 24px;
	font-weight: bold;
	color: #333;
	margin-bottom: 20px;
}
</style>