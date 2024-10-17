import React from 'react';
import { Form } from 'react-bootstrap';
import FormModal from './FormModal';
import FormField from './FormField';
import PerguntaAvaliacao from './PerguntaAvaliacao';
import SuccessErrorMessage from './SuccessErrorMessage';
import { FaRegSave } from 'react-icons/fa';
import { getPerguntas } from './perguntas';

const FormModalEditarFichaDeAvaliacao = ({
  show,
  onHide,
  handleAtualizarFichaDeAvaliacao,
  id_orientando,
  setIdOrientando,
  array_orientandos,
  id_curso,
  setIdCurso,
  array_cursos,
  success,
  error,
  handleOptionChange,
  handleResumoChange,
  titulo_projeto,
  pergunta_condutora,
  hipotese,
  fundamentacao_teorica,
  objetivo,
  metodo,
  cronograma,
  conclusao_avaliacao,
  resumoQ1,
  resumoQ2,
  resumoQ3,
  resumoQ4,
  resumoQ5,
  resumoQ6,
  resumoQ7,
  resumoQ8,
}) => {
  return (
    <FormModal
      show={show}
      onHide={onHide}
      title="Atualizar ficha de avaliação"
      size="lg"
      onSubmit={handleAtualizarFichaDeAvaliacao}
    >
      <div className="row">
        <div className="col-sm-6">
          <FormField
            label="Orientando:*"
            id="selectOrientando"
            value={id_orientando}
            onChange={(e) => setIdOrientando(e.target.value)}
            isSelect
            options={
              array_orientandos.length > 0
                ? array_orientandos.map((orientando) => (
                  <option key={orientando.id} value={orientando.id}>
                    {orientando.nome}
                  </option>
                ))
                : [
                  <option key="0" value="0">
                    Nenhum orientando encontrado
                  </option>,
                ]
            }
          />
        </div>
        <div className="col-sm-6">
          <FormField
            label="Curso:*"
            id="selectCurso"
            value={id_curso}
            onChange={(e) => setIdCurso(e.target.value)}
            isSelect
            options={
              array_cursos.length > 0
                ? array_cursos.map((curso) => (
                  <option key={curso.id} value={curso.id}>
                    {curso.nome}
                  </option>
                ))
                : [
                  <option key="0" value="0">
                    Nenhum curso encontrado
                  </option>,
                ]
            }
          />
        </div>
      </div>
      {getPerguntas.map((pergunta) => (
        <PerguntaAvaliacao
          key={pergunta.numeroPergunta}
          numeroPergunta={pergunta.numeroPergunta}
          textoPergunta={pergunta.textoPergunta}
          nomeEstadoResposta={pergunta.nomeEstadoResposta}
          nomeEstadoResumo={pergunta.nomeEstadoResumo}
          valorSelecionado={pergunta.valorSelecionado}
          valorResumo={pergunta.valorResumo}
          aoAlterarResposta={(e) => handleOptionChange(pergunta.nomeEstadoResposta, e.target.value)}
          aoAlterarResumo={(e) => handleResumoChange(pergunta.nomeEstadoResumo, e.target.value)}
          opcoes={pergunta.opcoes}
        />
      ))}
      {/* {getPerguntas({
        titulo_projeto,
        pergunta_condutora,
        hipotese,
        fundamentacao_teorica,
        objetivo,
        metodo,
        cronograma,
        conclusao_avaliacao,
        resumoQ1,
        resumoQ2,
        resumoQ3,
        resumoQ4,
        resumoQ5,
        resumoQ6,
        resumoQ7,
        resumoQ8,
      }).map((pergunta) => (
        <PerguntaAvaliacao
          key={pergunta.numeroPergunta}
          numeroPergunta={pergunta.numeroPergunta}
          textoPergunta={pergunta.textoPergunta}
          nomeEstadoResposta={pergunta.nomeEstadoResposta}
          nomeEstadoResumo={pergunta.nomeEstadoResumo}
          valorSelecionado={pergunta.valorSelecionado}
          valorResumo={pergunta.valorResumo}
          aoAlterarResposta={(e) => handleOptionChange(pergunta.nomeEstadoResposta, e.target.value)}
          aoAlterarResumo={(e) => handleResumoChange(pergunta.nomeEstadoResumo, e.target.value)}
          opcoes={pergunta.opcoes}
        />
      ))} */}

      <SuccessErrorMessage success={success} error={error} />

      <div className="d-flex justify-content-end">
        <button className="button" type="submit">
          <FaRegSave /> Salvar
        </button>
      </div>
    </FormModal>
  );
};

export default FormModalEditarFichaDeAvaliacao;
