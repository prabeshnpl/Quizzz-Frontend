import axios from 'axios';
import { useAuth } from '../context/authcontext';

const api = axios.create();

api.interceptors.request.use(
    async (config) => {
        const { accessToken, refreshAccessToken } = useAuth();

        if (isTokenExpired(localStorage.getItem('access_token_expiry'))) {
            const newAccessToken = await refreshAccessToken();
            if (newAccessToken) {
                config.headers['Authorization'] = `Bearer ${newAccessToken}`;
            }
        } else {
            if (accessToken) {
                config.headers['Authorization'] = `Bearer ${accessToken}`;
            }
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
