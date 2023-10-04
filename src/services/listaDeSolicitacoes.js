import api from './api';
const listaDeSolicitacoes = async (token) => {
    try {
        const response = await fetch(`${api.baseURL}/solicitacao`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': token
            }
        });

        const data = await response.json();

        if (data.status === 200) {
            console.log(data.resultados);
            return data.resultados;
        }
    } catch (error) {
        return error;
    }
};

export {listaDeSolicitacoes};