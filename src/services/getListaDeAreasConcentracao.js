import api from './api';

const listaDeAreasConcentracao = async () => {
    try {
        const response = await fetch(`${api.baseURL}/areas_concentracao`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        });
 
        const data = await response.json();
        console.log(data);
        
        if (data.status === 200) {
            return data.resultados;
        }
    } catch (error) {
        return error;
    }
};

export { listaDeAreasConcentracao };

