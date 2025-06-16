import axios from "axios";

export const publicApi = axios.create({
    baseURL: 'https://security-back-uyhc.onrender.com'
});

publicApi.interceptors.request.use(async config => {
    config.headers['Content-Type'] = 'application/json';
    return config;
})