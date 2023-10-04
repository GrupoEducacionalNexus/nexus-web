import api from "./api";

const listaDeTiposDeBanca = async (token) => {
    try {
        const response = await fetch(`${api.baseURL}/tipo_banca`,
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
       
        if (data.status === 200) {
            return data.resultados;
        }
    } catch (error) {
        console.log(error);
    }
}

export { listaDeTiposDeBanca };
