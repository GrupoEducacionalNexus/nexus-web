import api from './api';
import { getToken } from './auth';

export const fetchPermissoes = async () => {
    const response = await fetch(`${api.baseURL}/permissoes`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    });
    return await response.json();
};

export const fetchPermissoesDoUsuario = async (id_usuario) => {
    const response = await fetch(`${api.baseURL}/usuarios/${id_usuario}/permissoes`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'x-access-token': getToken(),
        },
    });
    return await response.json();
};
