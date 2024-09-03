<template>
	<label v-if="d_todo.completed">✔</label>
	<label v-else>✘</label>
	<input type="text" v-model="d_todo.title" :readonly="d_todo._id !== undefined">
	<input v-if="d_todo._id === undefined" type="button" value="添加" @click="add">
	<input v-else-if="!d_todo.completed" type="button" value="完成" @click="complete">
</template>

<script setup lang="ts">
import axios from 'axios';
import Todo from './defines/todo.ts'

const props = defineProps<{
	d_todo: Todo
}>()

function add() {
	// console.log(props.d_todo);

	if (props.d_todo.title.trim() === '') {
		console.error('标题不能为空');
		return;
	}

	axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/todos`, props.d_todo).then(response => {
		props.d_todo._id = response.data._id;
	}).catch(error => {
		console.error(error);
	});
}

function complete() {
	props.d_todo.completed = true;
	axios.put(`${import.meta.env.VITE_API_BASE_URL}/api/todos/${props.d_todo._id}`, props.d_todo).catch(error => {
		props.d_todo.completed = false;
		console.error(error);
	});
}

</script>