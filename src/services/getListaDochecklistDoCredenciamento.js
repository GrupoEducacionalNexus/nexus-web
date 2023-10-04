import api from "./api";

const listaDochecklistDoCredenciamento = async (token) => {
    try {
        const response = await fetch(`${api.baseURL}/checklist_credenciamento`,
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

        if (data.status === 200) {
            return data.resultados;
        }
    } catch (error) {
        console.log(error);
    }
};

export { listaDochecklistDoCredenciamento };
