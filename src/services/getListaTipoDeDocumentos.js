import api from '../services/api';

const listaTipoDeDocumentos = async () => {
    try {
        const response = await fetch(`${api.baseURL}/tipo_documento`, {
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

export {listaTipoDeDocumentos};