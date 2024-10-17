// FormModalEditarOrientando.js
import React from 'react';
import { FaUserGraduate, FaPlus, FaRegEdit, FaRegSave } from 'react-icons/fa';
import FormModal from './FormModal';
import FormField from './FormField';
import SuccessErrorMessage from './SuccessErrorMessage';
import DataTable from './DataTable';

const FormModalEditarOrientando = ({
  show,
  onHide,
  handleAtualizarOrientando,
  nome,
  email,
  id_curso,
  senha,
  confirmarSenha,
  fase_processo,
  informacoes_adicionais,
  dataHoraInicialFaseProcesso,
  dataHoraFinalFaseProcesso,
  dataHoraConclusao,
  array_cursos,
  array_tiposBanca,
  arrayOrientacao,
  success,
  error,
  setState,
  handlerShowModalCadastrarEAtualizarOrientacao,
}) => {
  return (
    <FormModal
      show={show}
      onHide={onHide}
      title={
        <>
          <FaUserGraduate /> Atualizar as informações do orientando - {nome}
        </>
      }
      size="lg"
      onSubmit={handleAtualizarOrientando}
    >
      <p className="text-danger">
        As informações cadastrais serão utilizadas pelo aluno para acessar a plataforma.
      </p>

      <div className="row">
        <div className="col-sm-6">
          {/* Nome */}
          <FormField
            label="Nome"
            id="nome"
            value={nome}
            onChange={(e) => setState({ nome: e.target.value })}
            placeholder="Digite seu nome completo"
            className="form-control form-control-sm"
          />
        </div>
        <div className="col-sm-6">
          {/* Email */}
          <FormField
            label="Email"
            id="email"
            type="email"
            value={email}
            onChange={(e) => setState({ email: e.target.value })}
            placeholder="Informe o seu email"
            className="form-control form-control-sm"
          />
        </div>
      </div>

      <div className="row">
        {/* Curso */}
        <div className="col-sm-6">
          <FormField
            label="Curso:*"
            id="selectCurso"
            value={id_curso}
            onChange={(e) => setState({ id_curso: e.target.value })}
            isSelect
            className="form-control form-control-sm"
            options={[
              <option key="0" value="0">
                Selecione
              </option>,
              array_cursos && array_cursos.length > 0
                ? array_cursos.map((curso) =>
                    <option key={curso.id} value={curso.id}>
                      {curso.nome}
                    </option>
                  )
                : (
                    <option key="0" value="0">
                      Nenhum curso encontrado
                    </option>
                  ),
            ]}
          />
        </div>

        {/* Fase do processo */}
        <div className="col-sm-6">
          <FormField
            label="Fase do processo:*"
            id="selectFaseProcesso"
            value={fase_processo}
            onChange={(e) => setState({ fase_processo: e.target.value })}
            isSelect
            className="form-control form-control-sm"
            options={[
              <option key="0" value="0">
                Selecione
              </option>,
              array_tiposBanca && array_tiposBanca.length > 0
                ? array_tiposBanca.map((tipo) => (
                    <option key={tipo.id} value={tipo.id}>
                      {tipo.nome}
                    </option>
                  ))
                : (
                    <option key="0" value="0">
                      Nenhum resultado encontrado
                    </option>
                  ),
            ]}
          />
        </div>
      </div>

      {/* Senha */}
      <div className="row">
        <div className="col-md-6">
          <FormField
            label="Senha"
            id="senha"
            type="password"
            value={senha}
            onChange={(e) => setState({ senha: e.target.value })}
            placeholder="Informe sua senha"
            className="form-control form-control-sm"
          />
        </div>

        {/* Repetir Senha */}
        <div className="col-md-6">
          <FormField
            label="Repetir Senha"
            id="confirmarSenha"
            type="password"
            value={confirmarSenha}
            onChange={(e) => setState({ confirmarSenha: e.target.value })}
            placeholder="Informe sua senha novamente"
            className="form-control form-control-sm"
          />
        </div>
      </div>

      {/* Informações adicionais */}
      <FormField
        label="Informações adicionais"
        id="informacoes_adicionais"
        value={informacoes_adicionais}
        onChange={(e) => setState({ informacoes_adicionais: e.target.value })}
        isTextarea
        className="form-control form-control-sm"
      />

      {/* Datas */}
      <div className="row">
        {/* Data/hora inicial do processo */}
        <div className="col-sm-4">
          <FormField
            label="Data/hora inicial do processo:"
            id="dataHoraInicialFaseProcesso"
            type="datetime-local"
            value={dataHoraInicialFaseProcesso}
            onChange={(e) => setState({ dataHoraInicialFaseProcesso: e.target.value })}
            additionalProps={{ min: '2022-01' }}
            className="form-control form-control-sm"
          />
        </div>

        {/* Data/hora final do processo */}
        <div className="col-sm-4">
          <FormField
            label="Data/hora final do processo:"
            id="dataHoraFinalFaseProcesso"
            type="datetime-local"
            value={dataHoraFinalFaseProcesso}
            onChange={(e) => setState({ dataHoraFinalFaseProcesso: e.target.value })}
            additionalProps={{ min: '2022-01' }}
            className="form-control form-control-sm"
          />
        </div>

        {/* Data/hora de conclusão */}
        <div className="col-sm-4">
          <FormField
            label="Data/hora de conclusão:"
            id="dataHoraConclusao"
            type="datetime-local"
            value={dataHoraConclusao}
            onChange={(e) => setState({ dataHoraConclusao: e.target.value })}
            additionalProps={{ min: '2022-01' }}
            className="form-control form-control-sm"
          />
        </div>
      </div>

      {/* Mensagens de Sucesso ou Erro */}
      <SuccessErrorMessage success={success} error={error} />

      {/* Botão de Salvar */}
      <div className="float-right">
        <button className="button">
          <FaRegSave /> Salvar
        </button>
      </div>

      {/* Orientações */}
      <hr />

      <div className="row">
        <div className="col-sm-10">
          <h3>
            <FaUserGraduate /> Orientações
          </h3>
        </div>
        <div className="col-sm-2">
          {/* Botão para Cadastrar Nova Orientação */}
          <button
            className="btn btn-primary"
            onClick={() =>
              handlerShowModalCadastrarEAtualizarOrientacao({
                id_orientacao: 0,
              })
            }
          >
            <FaPlus /> Nova Orientação
          </button>
        </div>
      </div>

      <hr />

      {/* Tabela de Orientações */}
      <DataTable
        headers={[
          'N° da orientação',
          'Link',
          'Orientando',
          'Observação',
          'Data/hora prevista',
          'Ações',
        ]}
        data={arrayOrientacao}
        renderRow={(orientacao) => (
          <tr
            key={orientacao.id}
            title="Clique aqui para obter mais informações sobre a orientação"
          >
            <td>{orientacao.id}</td>
            <td>
              {orientacao.link ? (
                <a href={orientacao.link}>Link da orientação</a>
              ) : (
                'Nenhum link anexado'
              )}
            </td>
            <td>{orientacao.orientando}</td>
            <td>{orientacao.observacao}</td>
            <td>{orientacao.dataHoraPrevistaTb}</td>
            <td>
              <button
                className="btn btn-sm btn-outline-primary"
                onClick={() =>
                  handlerShowModalCadastrarEAtualizarOrientacao(orientacao)
                }
              >
                <FaRegEdit /> Atualizar
              </button>
            </td>
          </tr>
        )}
        noDataText="Nenhum resultado encontrado"
      />

      {/* Total de Registros */}
      <div className="text-center font-weight-bold mt-3 mb-5">
        Total de Registros: {arrayOrientacao.length}
      </div>
    </FormModal>
  );
};

export default FormModalEditarOrientando;
