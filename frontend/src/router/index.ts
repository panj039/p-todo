// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/components/Home.vue';
import LoginPage from '@/components/Login.vue';

const routes = [
	{
		path: '/',
		name: 'Home',
		component: HomePage,
		meta: { requiresAuth: true } // 需要登录的路由
	},
	{
		path: '/login',
		name: 'Login',
		component: LoginPage
	}
];

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes
});

// 导航守卫
router.beforeEach((to, from, next) => {
	const isLoggedIn = !!localStorage.getItem('token'); // 检查 localStorage 中是否有 token

	if (to.matched.some(record => record.meta.requiresAuth)) {
		// 如果需要登录，且用户没有登录
		if (!isLoggedIn) {
			next({ name: 'Login' }); // 跳转到登录页面
		} else {
			next(); // 继续导航
		}
	} else {
		next(); // 继续导航
	}
});

export default router;
