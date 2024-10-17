// funcoesBanca.js

// Importações necessárias
import {
    listaDeLinhasDePesquisas,
    listaDeMembrosExternos,
    listaDeOrientadores,
    listaDeAreasConcentracao,
    listaDeMembrosDaBanca,
    listaDeDeclaracoesDeParticipacao, // Assumindo que existe
    cadastrarOrientando,
    atualizarOrientando,
    cadastrarBanca,
    atualizarBanca,
    excluirBanca,
    // ... outros serviços que você utiliza
  } from './apiServices'; // Ajuste o caminho conforme a estrutura do seu projeto
  
  // Funções para manipular modais e eventos
  
  // Modal Cadastrar Banca
  export const setModalMostrarCadastrarBanca = (component, valor) => {
    component.setState({ modalMostrarCadastrarBanca: valor });
  };
  
  export const handlerMostrarModalCadastrarBanca = async (component) => {
    const { setState, context } = component;
  
    setModalMostrarCadastrarBanca(component, true);
    await component.loadTiposDeBanca();
  
    // Carregar áreas de concentração
    try {
      const areasConcentracaoData = await listaDeAreasConcentracao();
      setState({ arrayAreaConcentracao: areasConcentracaoData });
    } catch (error) {
      console.error('Erro ao carregar áreas de concentração:', error);
      setState({ error: 'Erro ao carregar áreas de concentração.' });
    }
  
    // Carregar linhas de pesquisas
    try {
      const linhasDePesquisasData = await listaDeLinhasDePesquisas(component.state.idAreaConcentracao);
      setState({ arrayLinhasDePesquisas: linhasDePesquisasData });
    } catch (error) {
      console.error('Erro ao carregar linhas de pesquisas:', error);
      setState({ error: 'Erro ao carregar linhas de pesquisas.' });
    }
  
    // Carregar orientadores internos
    try {
      const orientadoresData = await listaDeOrientadores(0);
      let arrayMembrosInternos = [];
      if (orientadoresData.length > 0) {
        orientadoresData.forEach((item) => {
          if (item.id_usuario !== context.user.id) {
            arrayMembrosInternos.push({ value: item.id_usuario, label: item.nome });
          }
        });
        setState({ arrayMembrosInternos });
      }
    } catch (error) {
      console.error('Erro ao carregar orientadores:', error);
      setState({ error: 'Erro ao carregar orientadores.' });
    }
  
    // Carregar membros externos
    try {
      const membrosExternosData = await listaDeMembrosExternos();
      let arrayMembrosExternos = [];
      if (membrosExternosData.length > 0) {
        membrosExternosData.forEach((item) => {
          arrayMembrosExternos.push({ value: item.id_usuario, label: item.nome });
        });
        setState({ arrayMembrosExternos });
      }
    } catch (error) {
      console.error('Erro ao carregar membros externos:', error);
      setState({ error: 'Erro ao carregar membros externos.' });
    }
  
    // Carregar membros da declaração de participação
    try {
      const membrosDeclaracaoData = await listaDeDeclaracoesDeParticipacao();
      setState({ arrayMembrosDaDeclaracaoDeParticipacao: membrosDeclaracaoData });
    } catch (error) {
      console.error('Erro ao carregar membros da declaração de participação:', error);
      setState({ error: 'Erro ao carregar membros da declaração de participação.' });
    }
  };
  
  export const handlerFecharModalCadastrarBanca = (component) => {
    setModalMostrarCadastrarBanca(component, false);
    component.setState({
      success: '',
      error: '',
      id_orientando: '',
      id_tipoBanca: '',
      data_horaPrevista: '',
      arraySelectedMembrosInternos: [],
      arraySelectedMembrosExternos: [],
      titulo: '',
      title: '',
      resumo: '',
      palavra_chave: '',
    });
  };
  
  // Modal Atualizar Banca
  export const setModalMostrarAtualizarBanca = (component, valor) => {
    component.setState({ modalMostrarAtualizarBanca: valor });
  };
  
  export const handlerMostrarModalAtualizarBanca = async (component, banca) => {
    const { setState } = component;
  
    setModalMostrarAtualizarBanca(component, true);
    setState({
      id_banca: banca.id,
      id_orientador: banca.id_orientador,
      id_orientando: banca.id_orientando,
      id_tipoBanca: banca.id_tipoBanca,
      idAreaConcentracao: banca.id_areaConcentracao,
      idLinhaPesquisa: banca.id_linhaPesquisa,
      data_horaPrevista: banca.dataHoraPrevista,
      titulo: banca.titulo,
      title: banca.title,
      resumo: banca.resumo,
      palavra_chave: banca.palavra_chave,
    });
  
    // Carregar membros da banca
    try {
      const membrosDaBancaData = await listaDeMembrosDaBanca(banca.id);
      let arraySelectedMembrosInternos = [];
      let arraySelectedMembrosExternos = [];
  
      membrosDaBancaData.forEach((membro) => {
        if (membro.id_tipo === 2) {
          arraySelectedMembrosInternos.push({ value: membro.id, label: membro.nome });
        }
        if (membro.id_tipo === 3) {
          arraySelectedMembrosExternos.push({ value: membro.id, label: membro.nome });
        }
      });
  
      setState({ arraySelectedMembrosInternos, arraySelectedMembrosExternos });
    } catch (error) {
      console.error('Erro ao carregar membros da banca:', error);
      setState({ error: 'Erro ao carregar membros da banca.' });
    }
  
    // Carregar áreas de concentração
    try {
      await component.loadTiposDeBanca();
      const areasConcentracaoData = await listaDeAreasConcentracao();
      setState({ arrayAreaConcentracao: areasConcentracaoData });
    } catch (error) {
      console.error('Erro ao carregar áreas de concentração:', error);
      setState({ error: 'Erro ao carregar áreas de concentração.' });
    }
  
    // Carregar linhas de pesquisas
    try {
      const linhasDePesquisasData = await listaDeLinhasDePesquisas(component.state.idAreaConcentracao);
      setState({ arrayLinhasDePesquisas: linhasDePesquisasData });
    } catch (error) {
      console.error('Erro ao carregar linhas de pesquisas:', error);
      setState({ error: 'Erro ao carregar linhas de pesquisas.' });
    }
  
    // Carregar orientadores internos
    try {
      const orientadoresData = await listaDeOrientadores(0);
      let arrayMembrosInternos = [];
      if (orientadoresData.length > 0) {
        orientadoresData.forEach((item) => {
          if (item.id_usuario !== component.context.user.id) {
            arrayMembrosInternos.push({ value: item.id_usuario, label: item.nome });
          }
        });
        setState({ arrayMembrosInternos });
      }
    } catch (error) {
      console.error('Erro ao carregar orientadores:', error);
      setState({ error: 'Erro ao carregar orientadores.' });
    }
  
    // Carregar membros externos
    try {
      const membrosExternosData = await listaDeMembrosExternos();
      let arrayMembrosExternos = [];
      if (membrosExternosData.length > 0) {
        membrosExternosData.forEach((item) => {
          arrayMembrosExternos.push({ value: item.id_usuario, label: item.nome });
        });
        setState({ arrayMembrosExternos });
      }
    } catch (error) {
      console.error('Erro ao carregar membros externos:', error);
      setState({ error: 'Erro ao carregar membros externos.' });
    }
  
    // Carregar membros da declaração de participação
    try {
      const membrosDeclaracaoData = await listaDeDeclaracoesDeParticipacao();
      setState({ arrayMembrosDaDeclaracaoDeParticipacao: membrosDeclaracaoData });
    } catch (error) {
      console.error('Erro ao carregar membros da declaração de participação:', error);
      setState({ error: 'Erro ao carregar membros da declaração de participação.' });
    }
  };
  
  export const handlerFecharModalAtualizarBanca = (component) => {
    setModalMostrarAtualizarBanca(component, false);
    component.setState({
      success: '',
      error: '',
      id_orientando: '',
      id_tipoBanca: '',
      data_horaPrevista: '',
      arraySelectedMembrosInternos: [],
      arraySelectedMembrosExternos: [],
      titulo: '',
      title: '',
      resumo: '',
      palavra_chave: '',
    });
  };
  
  // Modal Excluir Banca
  export const setModalMostrarExcluirBanca = (component, valor) => {
    component.setState({ modalMostrarExcluirBanca: valor });
  };
  
  export const handlerMostrarModalExcluirBanca = (component, banca) => {
    component.setState({
      id_banca: banca.id,
      tipo_banca: banca.tipo_banca,
      nome: banca.orientando,
      id_tipoBanca: banca.id_tipoBanca,
      id_orientando: banca.id_orientando,
    });
    setModalMostrarExcluirBanca(component, true);
  };
  
  export const handlerFecharModalExcluirBanca = (component) => {
    setModalMostrarExcluirBanca(component, false);
    component.setState({
      success: '',
      error: '',
      id_banca: '',
      tipo_banca: '',
      nome: '',
    });
  };
  
  // Modal Finalizar Banca
  export const setModalMostrarFinalizarBanca = (component, valor) => {
    component.setState({ modalMostrarFinalizarBanca: valor });
  };
  
  export const handlerMostrarModalFinalizarBanca = (component, banca) => {
    component.setState({
      id_banca: banca.id,
      tipo_banca: banca.tipo_banca,
      nome: banca.orientando,
      id_tipoBanca: banca.id_tipoBanca,
      id_orientando: banca.id_orientando,
    });
    setModalMostrarFinalizarBanca(component, true);
  };
  
  export const handlerFecharModalFinalizarBanca = (component) => {
    setModalMostrarFinalizarBanca(component, false);
    component.setState({
      success: '',
      error: '',
      id_banca: '',
      tipo_banca: '',
      nome: '',
    });
  };
  
  // Funções de manipulação de formulários
  
  // Cadastrar Orientando
  export const handleCadastrarOrientando = async (component, e) => {
    e.preventDefault();
  
    const {
      nome,
      email,
      senha,
      confirmarSenha,
      id_curso,
      informacoes_adicionais,
      fase_processo,
      dataHoraInicialFaseProcesso,
      dataHoraFinalFaseProcesso,
      dataHoraConclusao,
    } = component.state;
  
    if (
      !nome ||
      !email ||
      !senha ||
      !confirmarSenha ||
      !id_curso ||
      !informacoes_adicionais ||
      !fase_processo ||
      !dataHoraInicialFaseProcesso ||
      !dataHoraFinalFaseProcesso ||
      !dataHoraConclusao
    ) {
      component.setState({ error: 'Por favor, preencher todos os campos!' });
      return;
    }
  
    if (senha !== confirmarSenha) {
      component.setState({ error: 'Por favor, informe senhas iguais!' });
      return;
    }
  
    const orientandoData = {
      nome,
      email,
      senha,
      id_curso: parseInt(id_curso),
      informacoes_adicionais,
      fase_processo,
      dataHoraInicialFaseProcesso,
      dataHoraFinalFaseProcesso,
      dataHoraConclusao,
    };
  
    try {
      const result = await cadastrarOrientando(orientandoData);
  
      if (result.status === 200) {
        component.setState({ success: result.msg });
        component.loadOrientandos();
        component.handlerFecharModalCadastrarOrientando();
      } else {
        component.setState({ error: result.msg || 'Erro ao cadastrar orientando' });
      }
    } catch (error) {
      console.error('Erro ao cadastrar orientando:', error);
      component.setState({ error: 'Erro ao cadastrar orientando.' });
    }
  };
  
  // Atualizar Orientando
  export const handleAtualizarOrientando = async (component, e) => {
    e.preventDefault();
  
    const {
      id_usuario,
      id_orientando,
      nome,
      email,
      senha,
      confirmarSenha,
      id_curso,
      informacoes_adicionais,
      fase_processo,
      dataHoraInicialFaseProcesso,
      dataHoraFinalFaseProcesso,
      dataHoraConclusao,
    } = component.state;
  
    if (!nome || !email || !senha || !confirmarSenha || !id_curso) {
      component.setState({ error: 'Por favor, preencher todos os campos!' });
      return;
    }
  
    if (senha !== confirmarSenha) {
      component.setState({ error: 'Por favor, informe senhas iguais!' });
      return;
    }
  
    const orientandoData = {
      id_usuario,
      nome,
      email,
      senha,
      id_curso: parseInt(id_curso),
      informacoes_adicionais,
      fase_processo,
      dataHoraInicialFaseProcesso,
      dataHoraFinalFaseProcesso,
      dataHoraConclusao,
    };
  
    try {
      const result = await atualizarOrientando(id_orientando, orientandoData);
  
      if (result.status === 200) {
        component.setState({ success: result.msg });
        component.loadOrientandos();
        component.handlerFecharModalEditarOrientando();
      } else {
        component.setState({ error: result.msg || 'Erro ao atualizar orientando' });
      }
    } catch (error) {
      console.error('Erro ao atualizar orientando:', error);
      component.setState({ error: 'Erro ao atualizar orientando.' });
    }
  };
  
  // Cadastrar Banca
  export const handleCadastrarBanca = async (component, e) => {
    e.preventDefault();
  
    const {
      id_orientando,
      id_tipoBanca,
      data_horaPrevista,
      idLinhaPesquisa,
      arraySelectedMembrosInternos,
      arraySelectedMembrosExternos,
      titulo,
      title,
      resumo,
      palavra_chave,
    } = component.state;
  
    if (
      !id_orientando ||
      !id_tipoBanca ||
      !idLinhaPesquisa ||
      !data_horaPrevista ||
      arraySelectedMembrosInternos.length === 0 ||
      arraySelectedMembrosExternos.length === 0
    ) {
      component.setState({ error: 'Por favor, preencher todos os campos!' });
      return;
    }
  
    const bancaData = {
      id_orientando,
      id_tipoBanca,
      id_linhaPesquisa: idLinhaPesquisa,
      arraySelectedMembrosInternos,
      arraySelectedMembrosExternos,
      data_horaPrevista,
      titulo,
      title,
      resumo,
      palavra_chave,
    };
  
    try {
      const result = await cadastrarBanca(bancaData);
  
      if (result.status === 200) {
        component.setState({ success: result.msg });
        component.loadBancas(1);
        component.loadBancas(2);
        component.handlerFecharModalCadastrarBanca();
      } else {
        component.setState({ error: result.msg || 'Erro ao cadastrar banca' });
      }
    } catch (error) {
      console.error('Erro ao cadastrar banca:', error);
      component.setState({ error: 'Erro ao cadastrar banca.' });
    }
  };
  
  // Atualizar Banca
  export const handleAtualizarBanca = async (component, e) => {
    e.preventDefault();
  
    const {
      id_banca,
      id_orientador,
      id_orientando,
      id_tipoBanca,
      data_horaPrevista,
      idLinhaPesquisa,
      arraySelectedMembrosInternos,
      arraySelectedMembrosExternos,
      titulo,
      title,
      resumo,
      palavra_chave,
    } = component.state;
  
    if (
      !id_orientando ||
      !id_tipoBanca ||
      !idLinhaPesquisa ||
      !data_horaPrevista ||
      arraySelectedMembrosInternos.length === 0 ||
      arraySelectedMembrosExternos.length === 0
    ) {
      component.setState({ error: 'Por favor, preencher todos os campos!' });
      return;
    }
  
    const bancaData = {
      id_orientador,
      id_orientando,
      id_tipoBanca,
      idLinhaPesquisa,
      arraySelectedMembrosInternos,
      arraySelectedMembrosExternos,
      data_horaPrevista,
      titulo,
      title,
      resumo,
      palavra_chave,
    };
  
    try {
      const result = await atualizarBanca(id_banca, bancaData);
  
      if (result.status === 200) {
        component.setState({ success: result.msg });
        component.loadBancas(1);
        component.loadBancas(2);
        component.handlerFecharModalAtualizarBanca();
      } else {
        component.setState({ error: result.msg || 'Erro ao atualizar banca' });
      }
    } catch (error) {
      console.error('Erro ao atualizar banca:', error);
      component.setState({ error: 'Erro ao atualizar banca.' });
    }
  };
  
  // Excluir Banca
  export const handleExcluirBanca = async (component, e) => {
    e.preventDefault();
    const { id_banca, id_tipoBanca, id_orientando } = component.state;
  
    try {
      const result = await excluirBanca(id_banca, id_tipoBanca, id_orientando);
  
      if (result.status === 200) {
        component.setState({ success: result.msg });
        component.loadBancas(1);
        component.loadBancas(2);
        component.handlerFecharModalExcluirBanca();
      } else {
        component.setState({ error: result.msg || 'Erro ao excluir banca' });
      }
    } catch (error) {
      console.error('Erro ao excluir banca:', error);
      component.setState({ error: 'Erro ao excluir banca.' });
    }
  };
  
  // Funções de manipulação de opções e resumos
  export const handleOptionChange = (component, nomeEstadoResposta, valor) => {
    component.setState({ [nomeEstadoResposta]: valor });
  };
  
  export const handleResumoChange = (component, nomeEstadoResumo, valor) => {
    component.setState({ [nomeEstadoResumo]: valor });
  };
  
  // Funções utilitárias
  
  // Função para obter o tipo de membro em inglês
  export const getMemberRoleEnglish = (component, membroNome) => {
    const membros = component.state.arrayMembrosDaDeclaracaoDeParticipacao;
    if (!membros || !Array.isArray(membros)) return '';
  
    const membro = membros.find(
      (membro) => membro.nome.slice(0, membro.nome.indexOf(' -')) === membroNome
    );
    if (membro) {
      const tipo = membro.nome.slice(membro.nome.indexOf('-') + 1).trim();
      if (tipo === 'presidente') return 'President';
      if (tipo === 'membro externo') return 'External Member';
      if (tipo === 'membro interno') return 'Internal Member';
    }
    return '';
  };
  
  // Função para obter o tipo de membro em português
  export const getMemberRolePortuguese = (component, membroNome) => {
    const membros = component.state.arrayMembrosDaDeclaracaoDeParticipacao;
    if (!membros || !Array.isArray(membros)) return '';
  
    const membro = membros.find(
      (membro) => membro.nome === membroNome
    );
    return membro ? membro.tipo : '';
  };
  
  // Função para obter o tipo de curso em inglês
  export const getCourseTypeEnglish = (component) => {
    const { id_curso } = component.state;
    if (id_curso === 1 || id_curso === 3) return 'DISSERTATION';
    if (id_curso === 2 || id_curso === 4) return 'THESIS';
    return '';
  };
  
  // Função para obter o tipo de curso em português
  export const getCourseTypePortuguese = (component) => {
    const { id_curso } = component.state;
    if (id_curso === 1 || id_curso === 3) return ' DA DISSERTAÇÃO';
    if (id_curso === 2 || id_curso === 4) return ' DE TESE';
    return '';
  };
  
  // Função para obter o tipo de banca em inglês
  export const getBancaTypeEnglish = (component) => {
    return component.state.id_tipoBanca === 1 ? 'QUALIFICATION' : 'DEFENSE';
  };
  
  // Função para obter o tipo de banca em português
  export const getBancaTypePortuguese = (component) => {
    return component.state.id_tipoBanca === 1 ? 'QUALIFICAÇÃO' : 'DEFESA';
  };
  
  // Função para obter o nome do programa em inglês
  export const getProgramNameEnglish = (component) => {
    const { id_curso } = component.state;
    if (id_curso === 1) return "Master's Program in EDUCATION SCIENCES";
    if (id_curso === 2) return 'Doctoral Program in EDUCATIONAL SCIENCES';
    if (id_curso === 3) return "Master's Program in THEOLOGY";
    if (id_curso === 4) return 'Doctoral Program in THEOLOGY';
    return '';
  };
  
  // Função para obter o nome do programa em português
  export const getProgramNamePortuguese = (component) => {
    const { id_curso } = component.state;
    if (id_curso === 1 || id_curso === 2)
      return 'Programa de Pós-Graduação em Ciências da Educação';
    if (id_curso === 3 || id_curso === 4)
      return 'Programa de Pós-Graduação em Teologia';
    return '';
  };
  
  // Fechar modal de visualizar declaração
  export const handlerFecharModalVisualizarDeclaracao = (component) => {
    component.setState({ modalMostrarVisualizarDeclaracao: false });
  };
  
  // Função para carregar membros da declaração de participação
  export const carregarMembrosDaDeclaracaoDeParticipacao = async (component) => {
    try {
      const membrosDeclaracaoData = await listaDeDeclaracoesDeParticipacao();
      if (Array.isArray(membrosDeclaracaoData)) {
        component.setState({ arrayMembrosDaDeclaracaoDeParticipacao: membrosDeclaracaoData });
      } else {
        console.error('Dados inválidos para membros da declaração de participação:', membrosDeclaracaoData);
        component.setState({ error: 'Dados inválidos recebidos para membros da declaração de participação.' });
      }
    } catch (error) {
      console.error('Erro ao carregar membros da declaração de participação:', error);
      component.setState({ error: 'Erro ao carregar membros da declaração de participação.' });
    }
  };
  
  // Continue exportando outras funções conforme necessário...
  