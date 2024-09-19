// import api from './api';

// const listaDeSetores = async (token) => {
//     try {
//         const response = await fetch(`${api.baseURL}/setores`, {
//             method: 'GET',
//             headers: {
//                 Accept: 'application/json',
//                 'Content-Type': 'application/json',
//                 'x-access-token': token
//             }
//         });
 
//         const data = await response.json();
//         console.log(data);
        
//         if (data.status === 200) {
//             return data.resultados;
//         }
//     } catch (error) {
//         return error;
//     }
// };

// export { listaDeSetores };
import api from './api';
import { getToken } from './auth';

export const listaDeSetores = async () => {
    const response = await fetch(`${api.baseURL}/setores`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'x-access-token': getToken(),
        },
    });
    return await response.json();
};

