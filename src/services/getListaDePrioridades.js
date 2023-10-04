import api from './api';

const listaDePrioridades = async (token) => {
    try {
        const response = await fetch(`${api.baseURL}/prioridades`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': token
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

export { listaDePrioridades };

