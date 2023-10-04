import api from "./api";

const listaDeAnexos = async (token, id_orientacao) => {
    try {
        const response = await fetch(`${api.baseURL}/orientacao/${id_orientacao}/anexos`,
            {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'x-access-token': token
                }
            }
        );

        const data = await response.json();
        console.log(data);
        if (data.status === 200) {
            return data;
        }
    } catch (error) {
        console.log(error);
    }
};

export {listaDeAnexos};
