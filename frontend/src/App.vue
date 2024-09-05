<template>
	<div class="app-container">
		<!-- 待办事项头部 -->
		<V_Header :d_todos="d_todos" v-model:selected="selected" />

		<!-- 待办事项列表 -->
		<V_Todos :d_todos="d_todos" :selected_value="selectedValue" :page="page" />
	</div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, provide, watch } from 'vue';
import axios from 'axios';
import V_Header from './components/Header.vue';
import V_Todos from './components/Todos.vue';
import Todo from '@/defines/todo';
import Page from '@/defines/page';
import { Selected } from '@/defines/selected';

const d_todos = ref<Todo[]>([]);
const selected = ref<number[]>([Selected.Incomplete]);
const page = ref(new Page());

const selectedValue = computed(() => {
	let sum: number = 0;
	for (let index = 0; index < selected.value.length; index++) {
		sum += selected.value[index];
	}
	return sum;
});

watch(selectedValue, () => {
	page.value.no = 1;
	getTodos();
});


async function getTodos() {
	try {
		const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/todos`, {
			params: {
				page_no: page.value.no,
				page_size: page.value.size,
				selected_value: selectedValue.value
			}
		});

		page.value.total = response.data.totalCount;
		d_todos.value = [];
		response.data.todos.docs.forEach((todo: Todo) => {
			d_todos.value.push(new Todo(todo.title, todo.completed, todo.createdAt, todo._id));
		});
	} catch (err) {
		console.error('拉取数据报错:', err);
	}
}
provide('getTodos', getTodos);

onMounted(async () => {
	getTodos();
});

// 取消添加新的待办事项
function cancelAdd() {
	const l = d_todos.value.length;
	for (let index = 0; index < l; index++) {
		if (d_todos.value[index]._id === undefined) {
			d_todos.value.splice(index, 1);
			break;
		}
	}
}
provide('cancelAdd', cancelAdd);

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