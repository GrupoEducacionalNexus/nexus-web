import api from '../services/api';

const listaDeStatus = async (token) => {
    try {
        const response = await fetch(`${api.baseURL}/status`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': token,
            },
        });

        const data = await response.json();
        
        if (data.status === 200) {
            return data.resultados; // retorna uma promisse
        }
    } catch (error) {
        return error;
    }
};


export { listaDeStatus };