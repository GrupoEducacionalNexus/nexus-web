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
  opcoes,
}) => (
  <div className="pergunta-avaliacao">
    <p>
      <strong>
        {numeroPergunta}. {textoPergunta}
      </strong>
    </p>
    {/* Opções de resposta */}
    {opcoes.map((opcao, index) => (
      <div key={index} className="form-check">
        <input
          className="form-check-input"
          type="radio"
          name={nomeEstadoResposta}
          value={opcao.valor}
          checked={valorSelecionado === opcao.valor}
          onChange={(e) => aoAlterarResposta(nomeEstadoResposta, e.target.value)}
        />
        <label className="form-check-label">{opcao.label}</label>
      </div>
    ))}
    {/* Campo de resumo, se aplicável */}
    <div className="form-group mt-2">
      <label htmlFor={nomeEstadoResumo}>Resumo:</label>
      <textarea
        className="form-control"
        id={nomeEstadoResumo}
        rows="3"
        value={valorResumo}
        onChange={(e) => aoAlterarResumo(nomeEstadoResumo, e.target.value)}
      ></textarea>
    </div>
  </div>
);

export default PerguntaAvaliacao;
