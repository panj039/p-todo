<template>
	<div class="todos-container">
		<!-- 循环渲染每个待办事项 -->
		<ul>
			<li v-for="d_todo in filteredTodos" :key="d_todo.id" class="todo-item">
				<V_Todo :d_todo="d_todo" />
			</li>
		</ul>
	</div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import V_Todo from './Todo.vue'
import Todo from '@/defines/todo.ts'
import { Selected } from '@/defines/selected.ts'

const props = defineProps<{
	d_todos: Todo[],
	selected_value: number
}>()

const filteredTodos = computed(() => {
	return props.d_todos.filter(d_todo => {
		if (props.selected_value === Selected.All) {
			return true;
		} else if (props.selected_value === Selected.Completed) {
			return d_todo.completed;
		} else if (props.selected_value === Selected.Incomplete) {
			return !d_todo.completed;
		} else {
			return false;
		}
	});
});

// setInterval(() => {
//  console.log(props.selected_value);
//  console.log(props.d_todos);
//  console.log(filteredTodos.value);
// }, 5000);
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
	margin-bottom: 10px;
	background-color: #ffffff;
	border-radius: 4px;
	box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
}
</style>