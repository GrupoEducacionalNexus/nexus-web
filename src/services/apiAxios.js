import axios from 'axios';
import { getToken } from './auth';

//servidor: https://www.gestorgruponexus.com.br:21160

const apiAxios = axios.create({
    baseURL: 'http://localhost:4000',
});

// Adiciona um interceptor para incluir o token em todas as requisições
apiAxios.interceptors.request.use(
    (config) => {
        const token = getToken();
        if (token) {
            config.headers['x-access-token'] = token;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default apiAxios;
