import api from './api';

const listaDeEventos = async () => {
    try {
        const response = await fetch(`${api.baseURL}/eventos`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
        });
        const data = await response.json();
        return data.resultados;
    } catch (error) {
        return error;
    }
};

export {listaDeEventos};