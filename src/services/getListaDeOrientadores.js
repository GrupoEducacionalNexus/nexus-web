import api from '../services/api';
const listaDeOrientadores = async (area_concentracao = 0) => {
    try {
        const response = await fetch(`${api.baseURL}/orientadores?area_concentracao=${area_concentracao}`, {
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

export {listaDeOrientadores};