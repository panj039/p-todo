<template>
	<div>
		<label v-for="option in options" :key="option.value">
			{{ option.label }}
			<input type="checkbox" :value="option.value" v-model="localSelected" />
		</label>
	</div>
	<div>
		<input type="button" value="Add Todo" @click="d_todos.unshift(new Todo('', false))" />
	</div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import Todo from '@/defines/todo.ts';
import { Selected } from '@/defines/selected.ts';

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

</script>