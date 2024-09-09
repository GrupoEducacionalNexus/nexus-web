import api from '../api'; // Importando a base URL da API
import { getToken } from '../auth';

// Busca a solicitação de credenciamento para um usuário
export const buscaSolicitacaoDeCredenciamentoApi = async (idUsuario) => {
  try {
    const token = getToken();
    const response = await fetch(`${api.baseURL}/usuarios/${idUsuario}/credenciamento`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': token,
      },
    });
    return await response.json();
  } catch (error) {
    console.error('Erro ao buscar solicitação de credenciamento:', error);
    throw error;
  }
};

// Lista os status
export const listaDeStatus = async () => {
  try {
    const token = getToken();
    const response = await fetch(`${api.baseURL}/status`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': token,
      },
    });
    return await response.json();
  } catch (error) {
    console.error('Erro ao listar status:', error);
    throw error;
  }
};

// Lista o checklist de credenciamento
export const listaDochecklistDoCredenciamentoApi = async () => {
  try {
    const token = getToken();
    const response = await fetch(`${api.baseURL}/checklist_credenciamento`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': token,
      },
    });
    return await response.json();
  } catch (error) {
    console.error('Erro ao listar checklist de credenciamento:', error);
    throw error;
  }
};

// Lista o checklist de um estado específico
export const listaDoChecklistDoEstado = async (idEstado) => {
  try {
    const token = getToken();
    const response = await fetch(`${api.baseURL}/estados/${idEstado}/checklist_credenciamento`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': token,
      },
    });
    const data = await response.json();
    if (data.status === 200) {
      return data.resultados;
    }
  } catch (error) {
    console.error('Erro ao listar checklist do estado:', error);
    throw error;
  }
};

// Cadastrar um novo documento de credenciamento
export const cadastrarDocumentoDoCredenciamentoApi = async (dados) => {
  try {
    const token = getToken();
    const response = await fetch(`${api.baseURL}/documento_credenciamento`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': token,
      },
      body: JSON.stringify(dados),
    });
    return await response.json();
  } catch (error) {
    console.error('Erro ao cadastrar documento de credenciamento:', error);
    throw error;
  }
};

// Lista os documentos do credenciamento de um checklist específico
export const listaDedocumentosDoCredenciamentoApi = async (id_checklist_credenciamento, id_credenciamento) => {
  try {
    const token = getToken();
    const response = await fetch(`${api.baseURL}/checklist_credenciamento/${id_checklist_credenciamento}/documento_credenciamento?id_credenciamento=${id_credenciamento}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': token,
      },
    });
    return await response.json();
  } catch (error) {
    console.error('Erro ao listar documentos do credenciamento:', error);
    throw error;
  }
};

// Lista as instruções do checklist
export const listaDeInstrucoesDoChecklistApi = async (id_checklist) => {
  try {
    const token = getToken();
    const response = await fetch(`${api.baseURL}/checklist_credenciamento/${id_checklist}/instrucoes`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': token,
      },
    });
    return await response.json();
  } catch (error) {
    console.error('Erro ao listar instruções do checklist:', error);
    throw error;
  }
};
