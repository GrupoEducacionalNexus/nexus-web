import api from './api';
const listaDeMembrosExternos = async () => {
    try {
        const response = await fetch(`${api.baseURL}/membro_externo`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
        });

        const data = await response.json();

        if (data.status === 200) {
            return data.resultados;
        }
    } catch (error) {
        return error;
    }
};

export {listaDeMembrosExternos};