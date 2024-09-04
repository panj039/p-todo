import { createApp } from 'vue'
import App from './App.vue'
import Toast, { POSITION } from 'vue-toastification';
import 'vue-toastification/dist/index.css';

const app = createApp(App);

app.use(Toast, {
	position: POSITION.TOP_RIGHT, // 你可以根据需求调整位置
	timeout: 3000, // 提示 3 秒后自动消失
});

app.mount('#app')