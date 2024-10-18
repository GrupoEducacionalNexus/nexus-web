// nexus-web/src/pages/bancas/orientadores/apiServices.js

import api from '../../../services/api';
import { getToken } from '../../../services/auth';

// Função para listar cursos
export const listaDeCursos = async (token) => {
  try {
    const response = await fetch(`${api.baseURL}/cursos`, {
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
    } else {
      return [];
    }
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const listaDeMembrosExternos = async () => {
    try {
        const response = await fetch(`${api.baseURL}/membro_externo`, {
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

export const listaDeMembrosInternos = async (token) => {
  try {
    const response = await fetch(`${api.baseURL}/orientadores`, {
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
    } else {
      throw new Error(data.msg || 'Erro ao buscar membros internos');
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// listaDeTiposDeBanca = async (token) => {
//   try {
//     const response = await fetch(`${api.baseURL}/tipo_banca`, {
//       method: 'GET',
//       headers: {
//         Accept: 'application/json',
//         'Content-Type': 'application/json',
//         'x-access-token': token,
//       },
//     });

//     if (!response.ok) {
//       throw new Error(`Erro HTTP! status: ${response.status}`);
//     }

//     const data = await response.json();
//     console.log('Tipos de Banca:', data.resultados);

//     if (data.status === 200 && data.resultados.length > 0) {
//       this.setState({ array_tiposBanca: data.resultados });
//     } else {
//       console.error('Erro ao obter tipos de banca:', data);
//     }
//   } catch (error) {
//     console.error('Erro ao tentar buscar tipos de banca:', error);
//   }
// };


// Função para excluir banca
export const excluirBanca = async (id_banca, id_tipoBanca, id_orientando) => {
  try {
    const response = await fetch(`${api.baseURL}/bancas/${id_banca}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': getToken(),
      },
      body: JSON.stringify({ id_banca, id_tipoBanca, id_orientando }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return { status: 500, msg: 'Erro ao excluir a banca' };
  }
};

// Função para cadastrar orientando
export const cadastrarOrientando = async (orientandoData) => {
  try {
    const response = await fetch(`${api.baseURL}/orientandos`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': getToken(),
      },
      body: JSON.stringify(orientandoData),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return { status: 500, msg: 'Erro ao cadastrar orientando' };
  }
};

// Função para atualizar orientando
export const atualizarOrientando = async (id_orientando, orientandoData) => {
  try {
    const response = await fetch(`${api.baseURL}/orientandos/${id_orientando}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': getToken(),
      },
      body: JSON.stringify(orientandoData),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return { status: 500, msg: 'Erro ao atualizar orientando' };
  }
};

// Função para cadastrar banca
export const cadastrarBanca = async (bancaData) => {
  try {
    const response = await fetch(`${api.baseURL}/bancas`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': getToken(),
      },
      body: JSON.stringify(bancaData),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return { status: 500, msg: 'Erro ao cadastrar banca' };
  }
};

// Função para atualizar banca
export const atualizarBanca = async (id_banca, bancaData) => {
  try {
    const response = await fetch(`${api.baseURL}/bancas/${id_banca}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': getToken(),
      },
      body: JSON.stringify(bancaData),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return { status: 500, msg: 'Erro ao atualizar banca' };
  }
};

// Função para listar orientandos
export const listaDeOrientandos = async (
  token,
  idOrientador,
  nome = "",
  idLinhaPesquisa = 0,
  idFaseProcesso = 0
) => {
  try {
    const response = await fetch(
      `${api.baseURL}/orientadores/${idOrientador}/orientandos?nome=${nome}&idLinhaPesquisa=${idLinhaPesquisa}&idFaseProcesso=${idFaseProcesso}`,
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
    } else {
      return [];
    }
  } catch (error) {
    console.error(error);
    return [];
  }
};

// Função para listar tipos de banca
export const listaDeTiposDeBanca = async (token) => {
  try {
    const response = await fetch(`${api.baseURL}/tipo_banca`, {
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
    } else {
      return [];
    }
  } catch (error) {
    console.error(error);
    return [];
  }
};

// Função para listar bancas
export const listaDeBancas = async (token, idOrientador, id_tipoBanca) => {
  try {
    const response = await fetch(`${api.baseURL}/orientadores/${idOrientador}/bancas?tipo_banca=${id_tipoBanca}`, {
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
    } else {
      return [];
    }
  } catch (error) {
    console.error(error);
    return [];
  }
};

// Função para cadastrar ATA
export const cadastrarATA = async (ataData) => {
  try {
    const response = await fetch(`${api.baseURL}/ata`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': getToken(),
      },
      body: JSON.stringify(ataData),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return { status: 500, msg: 'Erro ao cadastrar ATA' };
  }
};

// Função para atualizar ATA
export const atualizarATA = async (id_ata, ataData) => {
  try {
    const response = await fetch(`${api.baseURL}/ata/${id_ata}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': getToken(),
      },
      body: JSON.stringify(ataData),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return { status: 500, msg: 'Erro ao atualizar ATA' };
  }
};

// Função para cadastrar ficha de avaliação
export const cadastrarFichaDeAvaliacao = async (fichaData) => {
  try {
    const response = await fetch(`${api.baseURL}/ficha_avaliacao`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': getToken(),
      },
      body: JSON.stringify(fichaData),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return { status: 500, msg: 'Erro ao cadastrar ficha de avaliação' };
  }
};

// Função para atualizar ficha de avaliação
export const atualizarFichaDeAvaliacao = async (id_fichaAvaliacao, fichaData) => {
  try {
    const response = await fetch(`${api.baseURL}/ficha_avaliacao/${id_fichaAvaliacao}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': getToken(),
      },
      body: JSON.stringify(fichaData),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return { status: 500, msg: 'Erro ao atualizar ficha de avaliação' };
  }
};

// Função para gerar UUID
export const uuid = () => {
  return Date.now().toString().substring(16, 20) + Math.random().toString().substring(10);
};

// Função para cadastrar declaração de participação
export const cadastrarDeclaracaoDeParticipacao = async (declaracaoData) => {
  try {
    const response = await fetch(`${api.baseURL}/declaracao_participacao`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': getToken(),
      },
      body: JSON.stringify(declaracaoData),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return { status: 500, msg: 'Erro ao cadastrar declaração de participação' };
  }
};

// Função para listar declarações de participação
export const listaDeDeclaracoesDeParticipacao = async (id_banca) => {
  try {
    const response = await fetch(`${api.baseURL}/bancas/${id_banca}/declaracoes_participacao`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': getToken(),
      },
    });

    const data = await response.json();

    if (data.status === 200) {
      return data.resultados;
    } else {
      return [];
    }
  } catch (error) {
    console.error(error);
    return [];
  }
};

// Função para listar membros da banca
export const listaDeMembrosDaBanca = async (id_banca) => {
  try {
    const response = await fetch(`${api.baseURL}/bancas/${id_banca}/membros`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': getToken(),
      },
    });

    const data = await response.json();

    if (data.status === 200) {
      return data.resultados;
    } else {
      return [];
    }
  } catch (error) {
    console.error(error);
    return [];
  }
};

// Função para cadastrar ou atualizar orientação
export const cadastrarOuAtualizarOrientacao = async (orientacaoData, id_orientacao = 0) => {
  try {
    const method = id_orientacao === 0 ? 'POST' : 'PUT';
    const url = id_orientacao === 0 ? 'orientacao' : `orientacao/${id_orientacao}`;

    const response = await fetch(`${api.baseURL}/${url}`, {
      method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': getToken(),
      },
      body: JSON.stringify(orientacaoData),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return { status: 500, msg: 'Erro ao cadastrar ou atualizar orientação' };
  }
};

// Função para listar orientações
export const listaDeOrientacao = async (token, id_orientando) => {
  try {
    const response = await fetch(`${api.baseURL}/orientandos/${id_orientando}/orientacao`, {
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
    } else {
      return [];
    }
  } catch (error) {
    console.error(error);
    return [];
  }
};

// Função para buscar informações do orientador
export const buscaInformacoesDoOrientador = async (token) => {
  try {
    const response = await fetch(`${api.baseURL}/orientadores/${token}`, {
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
    } else {
      return [];
    }
  } catch (error) {
    console.error(error);
    return [];
  }
};

// Função para cadastrar ou atualizar folha de aprovação
export const cadastrarEatualizarFolhaDeAprovacao = async (folhaData, idFolhaDeAprovacao = 0) => {
  try {
    const url = idFolhaDeAprovacao === 0 ? `${api.baseURL}/folha_aprovacao` : `${api.baseURL}/folha_aprovacao/${idFolhaDeAprovacao}`;
    const method = idFolhaDeAprovacao === 0 ? 'POST' : 'PUT';

    const response = await fetch(url, {
      method: method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': getToken(),
      },
      body: JSON.stringify(folhaData),
    });

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
    return { status: 500, msg: 'Erro ao cadastrar ou atualizar folha de aprovação' };
  }
};

// Função para cadastrar ou atualizar declaração de orientação
export const cadastrarEatualizarDeclaracaoDeOrientacao = async (declaracaoData, idDeclaracaoDeOrientacao = 0) => {
  try {
    const url = idDeclaracaoDeOrientacao === 0 ? `${api.baseURL}/declaracao_orientacao` : `${api.baseURL}/declaracao_orientacao/${idDeclaracaoDeOrientacao}`;
    const method = idDeclaracaoDeOrientacao === 0 ? 'POST' : 'PUT';

    const response = await fetch(url, {
      method: method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': getToken(),
      },
      body: JSON.stringify(declaracaoData),
    });

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
    return { status: 500, msg: 'Erro ao cadastrar ou atualizar declaração de orientação' };
  }
};
