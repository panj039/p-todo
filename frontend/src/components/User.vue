<template>
	<span>{{ username }}</span>
	<button @click="logout">退出</button>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const username = ref(localStorage.getItem('username'));

const router = useRouter(); // 使用 useRouter 进行路由跳转

const logout = () => {
	localStorage.removeItem('token'); // 移除 token
	localStorage.removeItem('username'); // 移除 token
	router.push({ name: 'Login' }); // 跳转到登录页面
};
</script>
