// OrientandosTab.js
import React from 'react';
import FilterForm from './FilterForm';
import OrientandosTable from './OrientandosTable';

const OrientandosTab = ({
  nome,
  array_orientandos,
  arrayLinhasDePesquisas,
  array_tiposBanca,
  handlerShowModalEditarOrientando,
  loadOrientandos,
  setState,
}) => (
  <div className="container">
    {/* Formulário de Filtros */}
    <FilterForm
      nome={nome}
      linhasDePesquisas={arrayLinhasDePesquisas}
      tiposDeBanca={array_tiposBanca}
      onNomeChange={(e) => {
        setState({ nome: e.target.value });
        loadOrientandos(e.target.value);
      }}
      onLinhaPesquisaChange={(e) => {
        setState({ idLinhaPesquisa: e.target.value });
        loadOrientandos('', e.target.value, 0);
      }}
      onFaseProcessoChange={(e) => {
        setState({ fase_processo: e.target.value });
        loadOrientandos('', 0, e.target.value);
      }}
    />

    {/* Tabela de Orientandos */}
    <OrientandosTable
      orientandos={array_orientandos}
      onEditarOrientando={handlerShowModalEditarOrientando}
    />

    {/* Total de Registros */}
    <div className="text-center text-white font-weight-bold mt-3 mb-5">
      Total de Registros: {array_orientandos.length}
    </div>
  </div>
);

export default OrientandosTab;
