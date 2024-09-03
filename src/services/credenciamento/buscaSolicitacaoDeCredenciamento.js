import api from "../api";

export const buscaSolicitacaoDeCredenciamento = async (token, idUsuario) => {
    try {
      const response = await fetch(`${api.baseURL}/usuarios/${idUsuario}/credenciamento`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'x-access-token': token
        }
      });
  
      if (!response.ok) {
        throw new Error(`Erro ao buscar solicitação de credenciamento: ${response.statusText}`);
      }
  
      const data = await response.json();
  
      if (data.status !== 200) {
        throw new Error(`Erro na resposta da API: ${data.msg || 'Status não especificado'}`);
      }
  
      const resultados = data.resultados;
  
      if (!resultados || resultados.length === 0) {
        throw new Error('Nenhum resultado encontrado para o credenciamento do usuário.');
      }
  
      const resultado = resultados[0];
  
      // Retorna um objeto com os dados relevantes
      return {
        id_usuario: resultado.id_usuario,
        id_credenciamento: resultado.id_credenciamento,
        nome: resultado.gestor,
        email: resultado.email,
        telefone: resultado.telefone,
        cpf: resultado.cpf_cnpj,
        cnpj: resultado.cnpj,
        razao_social: resultado.razao_social,
        nome_fantasia: resultado.nome_fantasia,
        status: resultado.id_status,
        id_estado: resultado.id_estado
      };
    } catch (error) {
      console.error(`Erro ao buscar solicitação de credenciamento: ${error.message}`);
      throw error; // Lançar o erro para que ele possa ser tratado onde a função é chamada
    }
  };
  
  
  export const listaDeStatus = async (token) => {
    try {
      const response = await fetch(`${api.baseURL}/status`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'x-access-token': token
        }
      });
  
      const data = await response.json();
      return data.resultados;
    } catch (error) {
      console.error(`Erro ao buscar lista de status: ${error.message}`);
      throw error;
    }
  };
  
  export const uploadFile = async (file, path) => {
    // Implementar lógica de upload de arquivo aqui
    console.log('Uploading file', file);
  };
  