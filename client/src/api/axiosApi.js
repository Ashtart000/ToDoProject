import axios from 'axios';
import CONSTANTS from '../constants';
import history from '../BrowserHistory';

const instance = axios.create({
    baseURL: CONSTANTS.API_BASE
})

export const registerUser = async (userData) => await instance.post('users/sign-up', userData);

export const loginUser = async (userData) => await instance.post('users/sign-in', userData);

instance.interceptors.request.use((config) => {
    const accessToken = localStorage.getItem('accessToken');
    if(accessToken) {
        config.headers = {
            ...config.headers,
            Authorization: `Bearer ${accessToken}`
        }
    }
    return config;
}, (err) => Promise.reject(err));

instance.interceptors.response.use((response) => {
    if(response.data.tokens) {
        const { data: {tokens} } = response;
        localStorage.setItem('accessToken', tokens.accessToken);
        localStorage.setItem('refreshToken', tokens.refreshToken);
    }
    return response;
}, async (err) => {
    if(err.response.status === 403 && localStorage.getItem('refreshToken')) {
        refreshUser();
        return await instance(err.config) // викликаємо ініціатора помилки
    }
    if(err.response.status === 401) {
        history.replace('/');
    }

    return Promise.reject(err);
})

export const refreshUser = async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    const { data } = await instance.post('/users/refresh', {refreshToken})
    return data;
}


// TASK API

export const getTask = async () => await instance.get('/tasks')

export const createTask = async (taskData) => await instance.post('/tasks', taskData)

export const deleteTask = async (taskId) => await instance.delete(`/tasks/${taskId}`)