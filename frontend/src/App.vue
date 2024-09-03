<template>
	<V_Header :d_todos="d_todos" v-model:selected="selected" />
	<V_Todos :d_todos="d_todos" :selected_value="selectedValue" />
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
})

// setInterval(() => {
// 	console.log(selected.value);
// 	console.log(selectedValue.value);
// }, 5000);

const sortTodos = () => {
	d_todos.value.sort((a: Todo, b: Todo) => {
		// 首先根据 completed 状态排序，未完成的在前
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
