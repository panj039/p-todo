import axios from 'axios';

export default class RequestUtil {
	static url_base = `${import.meta.env.VITE_API_URL}/api`;

	static async get(url: any, data?: any) {
		// 检查 data 是否存在，若存在，则传递到 params 中
		return axios.get(`${RequestUtil.url_base}${url}`, {
			params: data
		});
	}

	static async post(url: any, data?: any) {
		return axios.post(`${RequestUtil.url_base}${url}`, data);
	}

	static async put(url: any, data?: any) {
		return axios.put(`${RequestUtil.url_base}${url}`, data);
	}

	static async delete(url: any, data?: any) {
		return axios.delete(`${RequestUtil.url_base}${url}`, data);
	}
}

axios.interceptors.request.use(config => {
	const token = localStorage.getItem('token');
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
}, error => {
	return Promise.reject(error);
});
