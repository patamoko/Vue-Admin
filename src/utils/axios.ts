import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosError, AxiosResponse } from "axios";
import { ElNotification } from 'element-plus'
const service: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 5000
});
// 请求拦截器
service.interceptors.request.use((config: InternalAxiosRequestConfig) => {

    return config
}, (error: AxiosError) => {
    ElNotification({
        title: "Error",
        message: error.message,
        type: 'error',
    });
    return Promise.reject(error)
}
)

// 响应拦截器
service.interceptors.response.use((response: AxiosResponse) => {
    if (response.data.code != 200) {
        ElNotification({
            title: "Error",
            message: response.data.message,
            type: 'error',
        });
        // 非 200 状态码，返回 rejected Promise 让调用方感知错误
        return Promise.reject(new Error(response.data?.message || '请求失败'))
    } else {
        return response.data
    }

}, (error: AxiosError) => {
    ElNotification({
        title: "Error",
        message: error.message,
        type: 'error',
    });
    return Promise.reject(error)
})

export default service