import api from './api';

const listaDeUsuariosDoSetor = async (token, id_setor) => {
    try {
        const response = await fetch(`${api.baseURL}/setores/${id_setor}/usuarios`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': token
            }
        });
 
        const data = await response.json();
        
        if (data.status === 200) {
            return data.resultados;
        }
    } catch (error) {
        return error;
    }
};

export { listaDeUsuariosDoSetor };

