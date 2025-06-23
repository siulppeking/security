import axios from "axios";

export const privateApi = axios.create({
    baseURL: 'https://security-back-uyhc.onrender.com'
});

privateApi.interceptors.request.use(async config => {
    config.headers['Content-Type'] = 'application/json';
    config.headers['Authorization'] = `Bearer ${localStorage.getItem('access_token') || ''}`;
    return config;
});