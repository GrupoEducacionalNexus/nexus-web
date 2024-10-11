// PerguntaAvaliacao.js
import React from 'react';

const PerguntaAvaliacao = ({
  numeroPergunta,
  textoPergunta,
  nomeEstadoResposta,
  nomeEstadoResumo,
  valorSelecionado,
  valorResumo,
  aoAlterarResposta,
  aoAlterarResumo,
  opcoes = ['SIM', 'PARCIALMENTE', 'NÃO'],
}) => (
  <>
    <p>{numeroPergunta} - {textoPergunta}</p>
    {opcoes.map((opcao) => (
      <div className="form-check" key={opcao}>
        <label className="form-check-label">
          <input
            type="radio"
            className="form-check-input"
            name={`radioQ${numeroPergunta}Option`}
            value={opcao}
            checked={valorSelecionado === opcao}
            onChange={() => aoAlterarResposta(nomeEstadoResposta, opcao)}
          />
          {opcao}
        </label>
      </div>
    ))}
    <hr />
    <div className="form-group">
      <label>Resumo:*</label>
      <textarea
        className="form-control form-control-sm"
        id={`textareaResumoQ${numeroPergunta}`}
        placeholder="Digite o resumo"
        onChange={(e) => aoAlterarResumo(nomeEstadoResumo, e.target.value)}
        value={valorResumo}
        rows="4"
        cols="100"
      ></textarea>
    </div>
  </>
);

export default PerguntaAvaliacao;
