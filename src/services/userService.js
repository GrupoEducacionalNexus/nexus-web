import api from './api';
import { getToken } from './auth';

export const fetchUsuarios = async () => {
    const response = await fetch(`${api.baseURL}/usuarios`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'x-access-token': getToken(),
        },
    });
    const data = await response.json();
    return data;
};

export const atualizarUsuario = async (userData) => {
    const { id_usuario, nome, email, cpf_cnpj, senha, id_setor } = userData;
    const response = await fetch(`${api.baseURL}/usuarios/${id_usuario}`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'x-access-token': getToken(),
        },
        body: JSON.stringify({ nome, email, cpf_cnpj, senha, id_setor }),
    });
    return await response.json();
};
