import api from './api';

const listaDeOrientandos = async (token, id_areaConcentracao) => {
    try {
        const response = await fetch(
            `${api.baseURL}/orientandos?id_areaConcentracao=${id_areaConcentracao}`,
            {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'x-access-token': token,
                },
            }
        );

        const data = await response.json();
        console.log(data)

        if (data.status === 200) {
            return data.resultados;
        }
    } catch (error) {
        return error;
    }
};

export {listaDeOrientandos};