import api from './api';
const listaDeOrientacao = async (token, id_areaConcentracao = 0) => {
    try {
        const response = await fetch(`${api.baseURL}/orientacao?id_areaConcentracao=${id_areaConcentracao}`, {
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

export {listaDeOrientacao};