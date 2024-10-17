// FormModalOrientando.js
import React from 'react';
import { FaUserGraduate } from 'react-icons/fa';
import FormModal from './FormModal';
import FormField from './FormField';
import SuccessErrorMessage from './SuccessErrorMessage';

const FormModalOrientando = ({
  show,
  onHide,
  handleCadastrarOrientando,
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
  success,
  error,
  setState,
}) => {
  return (
    <FormModal
      show={show}
      onHide={onHide}
      title={
        <>
          <FaUserGraduate /> Cadastrar um novo orientando
        </>
      }
      size="md"
      onSubmit={handleCadastrarOrientando}
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
          />

          {/* Email */}
          <FormField
            label="Email"
            id="email"
            type="email"
            value={email}
            onChange={(e) => setState({ email: e.target.value })}
            placeholder="Informe o seu email"
          />

          {/* Curso */}
          <FormField
            label="Curso:*"
            id="selectCurso"
            value={id_curso}
            onChange={(e) => setState({ id_curso: e.target.value })}
            isSelect
            options={[
              <option key="0" value="0">
                Selecione
              </option>,
              array_cursos && array_cursos.length > 0
                ? array_cursos.map((curso) => (
                    <option key={curso.id} value={curso.id}>
                      {curso.nome}
                    </option>
                  ))
                : (
                    <option key="0" value="0">
                      Nenhum curso encontrado
                    </option>
                  ),
            ]}
          />

          {/* Senha */}
          <div className="row" style={{ marginBottom: 20 }}>
            <div className="col-md-6">
              <FormField
                label="Senha"
                id="senha"
                type="password"
                value={senha}
                onChange={(e) => setState({ senha: e.target.value })}
                placeholder="Informe sua senha"
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
              />
            </div>
          </div>

          {/* Fase do processo */}
          <FormField
            label="Fase do processo:*"
            id="selectFaseProcesso"
            value={fase_processo}
            onChange={(e) => setState({ fase_processo: e.target.value })}
            isSelect
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

        <div className="col-sm-6">
          {/* Informações adicionais */}
          <FormField
            label="Informações adicionais"
            id="informacoes_adicionais"
            value={informacoes_adicionais}
            onChange={(e) => setState({ informacoes_adicionais: e.target.value })}
            isTextarea
          />

          {/* Data/hora inicial do processo */}
          <FormField
            label="Data/hora inicial do processo:"
            id="dataHoraInicialFaseProcesso"
            type="datetime-local"
            value={dataHoraInicialFaseProcesso}
            onChange={(e) => setState({ dataHoraInicialFaseProcesso: e.target.value })}
            additionalProps={{ min: '2022-01' }}
          />

          {/* Data/hora final do processo */}
          <FormField
            label="Data/hora final do processo:"
            id="dataHoraFinalFaseProcesso"
            type="datetime-local"
            value={dataHoraFinalFaseProcesso}
            onChange={(e) => setState({ dataHoraFinalFaseProcesso: e.target.value })}
            additionalProps={{ min: '2022-01' }}
          />

          {/* Data/hora de conclusão */}
          <FormField
            label="Data/hora de conclusão:"
            id="dataHoraConclusao"
            type="datetime-local"
            value={dataHoraConclusao}
            onChange={(e) => setState({ dataHoraConclusao: e.target.value })}
            additionalProps={{ min: '2022-01' }}
          />
        </div>
      </div>

      {/* Mensagens de Sucesso ou Erro */}
      <SuccessErrorMessage success={success} error={error} />
    </FormModal>
  );
};

export default FormModalOrientando;
