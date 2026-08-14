import axios from 'axios';
import { useAuthStore } from '../stores/auth.store';

export const apiClient = axios.create({
    baseURL : import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api/v1',
    withCredentials : true,
    headers : {
        'Content-Type': 'application/json',
    },
})

// Track if token refresh is in progress to prevent multiple refresh requests
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    })
    
    isRefreshing = false;
    failedQueue = [];
}

apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken')
        if(token){
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)

apiClient.interceptors.response.use(
    (response) => response,
    async (error) =>{
        const originalRequest = error.config;

        // Check if error is 401 (Unauthorized) and not already a refresh attempt
        if (error.response?.status === 401 && !originalRequest._retry) {
            
            // Prevent infinite loops - don't retry refresh token endpoint itself
            if (originalRequest.url.includes('/auth/refresh-token')) {
                // Refresh token is invalid, redirect to login
                useAuthStore.getState().setLogout();
                window.location.href = '/login';
                return Promise.reject(error);
            }

            if (isRefreshing) {
                // If refresh is already in progress, queue this request
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                }).then(token => {
                    originalRequest.headers.Authorization = `Bearer ${token}`;
                    return apiClient(originalRequest);
                });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                // Call refresh token endpoint
                const response = await axios.post(
                    `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api/v1'}/auth/refresh-token`,
                    {},
                    { withCredentials: true }
                );

                const { accessToken } = response.data.data;

                // Update token in localStorage
                localStorage.setItem('accessToken', accessToken);

                // Update authorization header for the failed request
                originalRequest.headers.Authorization = `Bearer ${accessToken}`;

                // Process queued requests with new token
                processQueue(null, accessToken);

                // Retry the original request
                return apiClient(originalRequest);

            } catch (refreshError) {
                // Refresh failed, logout user and redirect to login
                useAuthStore.getState().setLogout();
                processQueue(refreshError, null);
                window.location.href = '/login';
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error)
    }
)