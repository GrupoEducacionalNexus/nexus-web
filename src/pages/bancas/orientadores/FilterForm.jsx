import React from 'react';

function FilterForm({ nome, linhasDePesquisas, tiposDeBanca, onNomeChange, onLinhaPesquisaChange, onFaseProcessoChange }) {
  return (
    <div className='row d-flex align-items-center text-light'>
      <div className='col'>
        <div className="form-group">
          <label htmlFor="nome">Nome</label>
          <input
            type="text"
            className="form-control form-control-sm"
            id="nome"
            placeholder="Digite o nome completo do orientando"
            autoComplete='off'
            value={nome}
            onChange={onNomeChange}
          />
        </div>
      </div>

      <div className="col">
        <div className="form-group">
          <label>Linha de pesquisa:</label>
          <select
            className="form-control form-control-sm"
            id="selectLinhaPesquisa"
            onChange={onLinhaPesquisaChange}
          >
            <option value="0">Selecione</option>
            {linhasDePesquisas?.length > 0
              ? linhasDePesquisas.map(linha => (
                  <option key={linha.id} value={linha.id}>{linha.linha_pesquisa}</option>
                ))
              : <option value="0">Nenhum resultado encontrado</option>
            }
          </select>
        </div>
      </div>

      <div className='col'>
        <div className="form-group">
          <label>Fase do processo:</label>
          <select
            className="form-control form-control-sm"
            id="selectFaseProcesso"
            onChange={onFaseProcessoChange}
          >
            <option value="0">Selecione</option>
            {tiposDeBanca.length > 0
              ? tiposDeBanca.map(tipo => (
                  <option key={tipo.id} value={tipo.id}>{tipo.nome}</option>
                ))
              : <option value="0">Nenhum resultado encontrado</option>
            }
          </select>
        </div>
      </div>
    </div>
  );
}

export default FilterForm;
