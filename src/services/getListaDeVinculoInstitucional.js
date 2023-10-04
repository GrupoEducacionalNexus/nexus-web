import api from './api';

const listaDeVinculoInstitucional = async () => {
    try {
        const response = await fetch(
            `${api.baseURL}/vinculo_institucional`,
            {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
            }
        );

        const data = await response.json();
        if (data.status === 200) {
            return data.resultados;
        }
    } catch (error) {
        return error;
    }
};

export {listaDeVinculoInstitucional};
