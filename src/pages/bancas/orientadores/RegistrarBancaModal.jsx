// RegisterBancaModal.js
import React from 'react';
import { Form } from 'react-bootstrap';
import CustomModal from './CustomModal';
import FormSelect from './FormSelect';
import FormInput from './FormInput';
import FormMultiSelect from './FormMultiSelect';
import FormTextarea from './FormTextarea';
import SuccessErrorMessage from './SuccessErrorMessage';
import { FaLayerGroup, FaRegSave } from 'react-icons/fa';

const RegistrarBancaModal = ({
  show,
  onHide,
  handleSubmit,
  state,
  handleChange,
  handleMultiSelectChange,
}) => {
  const renderSelectOptions = (optionsArray = [], placeholder, keyPrefix) => {
    if (!optionsArray || optionsArray.length === 0) {
      return [
        <option key={`${keyPrefix}-0`} value="0">
          {placeholder}
        </option>,
      ];
    }
    return optionsArray.map((option) => (
      <option key={`${keyPrefix}-${option.id}`} value={option.id}>
        {option.nome?.toUpperCase()}
      </option>
    ));
  };

  return (
    <CustomModal
      show={show}
      onHide={onHide}
      title={
        <>
          <FaLayerGroup /> Registrar uma nova banca
        </>
      }
      size="xl"
    >
      <Form onSubmit={handleSubmit}>
        <div className="row modal-body">
          <div className="col-sm-6">
            {/* Orientando */}
            <FormSelect
              label="Orientando:*"
              id="selectOrientando"
              value={state?.id_orientando || ''}
              onChange={(e) => handleChange('id_orientando', e.target.value)}
              options={renderSelectOptions(
                state?.array_orientandos,
                'Nenhum orientando encontrado',
                'orientando'
              )}
            />

            {/* Tipo da banca */}
            <FormSelect
              label="Tipo da banca:*"
              id="selectTipoBanca"
              value={state?.id_tipoBanca || ''}
              onChange={(e) => handleChange('id_tipoBanca', e.target.value)}
              options={renderSelectOptions(
                state?.array_tiposBanca?.filter((tipo) => parseInt(tipo.id) < 3) || [],
                'Nenhum resultado encontrado',
                'tipoBanca'
              )}
            />

            {/* Área de concentração */}
            <FormSelect
              label="Área de concentração:*"
              id="selectAreaConcentracao"
              value={state?.idAreaConcentracao || ''}
              options={renderSelectOptions(
                state?.arrayAreaConcentracao,
                'Nenhuma área encontrada',
                'areaConcentracao'
              )}
              readOnly
            />

            {/* Linha de pesquisa */}
            <FormSelect
              label="Linha de pesquisa:*"
              id="selectLinhaPesquisa"
              value={state?.idLinhaPesquisa || ''}
              onChange={(e) => handleChange('idLinhaPesquisa', e.target.value)}
              options={renderSelectOptions(
                state?.arrayLinhasDePesquisas,
                'Nenhuma linha de pesquisa encontrada',
                'linhaPesquisa'
              )}
            />

            {/* Data e hora prevista */}
            <FormInput
              label="Data e hora prevista:"
              id="dataHoraPrevista"
              type="datetime-local"
              value={state?.data_horaPrevista || ''}
              onChange={(e) => handleChange('data_horaPrevista', e.target.value)}
              min="2022-01"
            />

            {/* Membros internos */}
            <FormMultiSelect
              label="Membros internos:*"
              options={state?.arrayMembrosInternos || []}
              value={state?.arraySelectedMembrosInternos || []}
              onChange={(e) => handleMultiSelectChange('arraySelectedMembrosInternos', e)}
            />
          </div>
          <div className="col-sm-6">
            {/* Membros externos */}
            <FormMultiSelect
              label="Membros externos:*"
              options={state?.arrayMembrosExternos || []}
              value={state?.arraySelectedMembrosExternos || []}
              onChange={(e) => handleMultiSelectChange('arraySelectedMembrosExternos', e)}
            />

            {/* Título */}
            <FormTextarea
              label="Título:"
              id="titulo"
              rows="3"
              value={state?.titulo || ''}
              onChange={(e) => handleChange('titulo', e.target.value)}
            />

            {/* Título em inglês */}
            <FormTextarea
              label="Título em inglês:"
              id="title"
              rows="3"
              value={state?.title || ''}
              onChange={(e) => handleChange('title', e.target.value)}
            />

            {/* Resumo */}
            <FormTextarea
              label="Resumo:"
              id="resumo"
              rows="3"
              value={state?.resumo || ''}
              onChange={(e) => handleChange('resumo', e.target.value)}
            />

            {/* Palavra-chave */}
            <FormTextarea
              label="Palavra-chave:"
              id="palavra_chave"
              rows="3"
              value={state?.palavra_chave || ''}
              onChange={(e) => handleChange('palavra_chave', e.target.value)}
            />
          </div>
        </div>

        {/* Mensagens de Sucesso ou Erro */}
        <SuccessErrorMessage success={state?.success} error={state?.error} />

        {/* Botão de Salvar */}
        <div className="d-flex justify-content-center">
          <button className="button" type="submit">
            <FaRegSave /> Salvar
          </button>
        </div>
      </Form>
    </CustomModal>
  );
};

export default RegistrarBancaModal;
