<template>
	<div class="auth-container">
		<form @submit.prevent="login" v-if="!showRegister" class="auth-form">
			<h2>登录</h2>
			<input v-model="username" placeholder="账号" />
			<input v-model="password" type="password" placeholder="密码" />
			<button type="submit">登录</button>
		</form>

		<!-- 注册表单 -->
		<form @submit.prevent="register" v-else class="auth-form">
			<h2>注册</h2>
			<input v-model="newUsername" placeholder="用户名" />
			<input v-model="newPassword" type="password" placeholder="密码" />
			<button type="submit">注册</button>
		</form>

		<!-- 切换登录/注册按钮 -->
		<button @click="toggleForm" class="toggle-button">
			{{ showRegister ? '已有账号？去登录' : '没有账号？去注册' }}
		</button>

		<!-- 错误信息 -->
		<div v-if="error" class="error-message">{{ error }}</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import RequestUtil from '@/utils/request';

// 定义响应式变量
const username = ref('');
const password = ref('');
const newUsername = ref('');
const newPassword = ref('');
const showRegister = ref(false);
const error = ref('');

const router = useRouter(); // 使用 useRouter 进行路由跳转

// 定义登录方法
const login = async () => {
	try {
		const response = await RequestUtil.post('/auth/login', {
			username: username.value,
			password: password.value,
		});
		localStorage.setItem('token', response.data.token); // 存储 token
		localStorage.setItem('username', username.value);
		router.push('/'); // 登录成功后跳转
	} catch (err) {
		error.value = `登录失败：${err}`; // 处理登录失败
	}
};

const register = async () => {
	try {
		// 注册请求
		await RequestUtil.post('/auth/register', {
			username: newUsername.value,
			password: newPassword.value,
		});
		error.value = '注册成功，请登录。';
		showRegister.value = false; // 注册成功后切换回登录界面
	} catch (err) {
		error.value = `注册失败，用户名可能已存在。${err}`;
	}
};

// 切换表单显示
const toggleForm = () => {
	showRegister.value = !showRegister.value;
	error.value = ''; // 切换时清空错误信息
};
</script>

<style scoped>
.auth-container {
	max-width: 400px;
	margin: 50px auto;
	padding: 20px;
	border: 1px solid #ddd;
	border-radius: 4px;
	background-color: #f0f8ff;
	/* Light blue background */
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.auth-form {
	display: flex;
	flex-direction: column;
}

.auth-form h2 {
	text-align: center;
	margin-bottom: 20px;
	color: #333;
	/* Darker heading color */
}

.auth-form input {
	margin-bottom: 15px;
	padding: 10px;
	font-size: 16px;
	border: 1px solid #ccc;
	border-radius: 4px;
	background-color: #fff;
}

.auth-form input:focus {
	outline: none;
	border-color: #007bff;
	/* Blue border on focus */
}

.auth-form button {
	padding: 10px;
	font-size: 16px;
	cursor: pointer;
	background-color: #007bff;
	/* Blue button */
	color: white;
	border: none;
	border-radius: 4px;
}

.auth-form button:hover {
	background-color: #0056b3;
	/* Darker blue on hover */
}

.toggle-button {
	margin-top: 15px;
	width: 100%;
	padding: 10px;
	font-size: 14px;
	cursor: pointer;
	background-color: #f8f9fa;
	/* Light gray toggle button */
	color: #007bff;
	border: 1px solid #007bff;
	border-radius: 4px;
}

.toggle-button:hover {
	background-color: #007bff;
	color: white;
}

.error-message {
	margin-top: 15px;
	color: red;
	text-align: center;
	background-color: #ffe6e6;
	padding: 10px;
	border-radius: 4px;
	border: 1px solid #ffcccc;
}
</style>
