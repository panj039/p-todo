<template>
	<div>
		<li v-for="d_todo in filteredTodos" :key="d_todo.id">
			<V_Todo :d_todo="d_todo" />
		</li>
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
		} else if (props.selected_value === Selected.Incomplete ) {
			return !d_todo.completed;
		} else {
			return false;
		}
	});
});

// setInterval(() => {
// 	console.log(props.selected_value);
// 	console.log(props.d_todos);
// 	console.log(filteredTodos.value);
// }, 5000);
</script>

<style scoped></style>
