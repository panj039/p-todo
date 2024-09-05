<template>
	<div class="header">
		<div class="checkbox-group">
			<label v-for="option in options" :key="option.value" class="checkbox-label">
				{{ option.label }}
				<input type="checkbox" :value="option.value" v-model="localSelected" class="checkbox-input" />
			</label>
		</div>
		<div class="add-todo">
			<input type="button" value="Add Todo" @click="onAdd" class="add-todo-button" />
		</div>
	</div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import Todo from '@/defines/todo';
import { Selected } from '@/defines/selected';
import { useToast } from 'vue-toastification'; // 引入 Toast

const props = defineProps<{
	d_todos: Todo[],
	selected: number[]
}>();

const options = ref([
	{ value: Selected.Incomplete, label: '未完成' },
	{ value: Selected.Completed, label: '已完成' }
]);

// 定义 emit
const emit = defineEmits(['update:selected']);

// 创建一个本地的 ref 来存储选中的值
const localSelected = ref([...props.selected]);

// 当localSelected发生变化时，向父组件发出更新的事件
watch(localSelected, (newValue) => {
	emit('update:selected', newValue);
});

// 监听 props.selected 的变化，并同步到 localSelected 中
watch(() => props.selected, (newValue) => {
	if (localSelected.value !== newValue) {
		localSelected.value = [...newValue];
	}
});

// 初始化 Toast
const toast = useToast();

function onAdd() {
	// 如果存在未完成的 Todo 项，弹出浮动提示
	if ((props.d_todos.length > 0) && (props.d_todos[0]._id === undefined)) {
		toast.info('请先完成未完成的 Todo 任务！');
		return;
	}
	props.d_todos.unshift(new Todo('', false));
};

</script>

<style scoped>
.header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 10px;
	background-color: #f5f5f5;
	border-bottom: 1px solid #ccc;
}

.checkbox-group {
	display: flex;
	gap: 10px;
}

.checkbox-label {
	display: flex;
	align-items: center;
	font-size: 14px;
}

.checkbox-input {
	margin-left: 5px;
}

.add-todo {
	display: flex;
	justify-content: center;
	align-items: center;
}

.add-todo-button {
	padding: 5px 10px;
	font-size: 14px;
	background-color: #007bff;
	color: white;
	border: none;
	border-radius: 4px;
	cursor: pointer;
}

.add-todo-button:hover {
	background-color: #0056b3;
}
</style>
