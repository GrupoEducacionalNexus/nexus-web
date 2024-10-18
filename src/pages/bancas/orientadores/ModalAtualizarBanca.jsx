import React, { useEffect } from 'react';
import { Modal, Form } from 'react-bootstrap';
import { FaLayerGroup, FaRegSave } from 'react-icons/fa';
import Select from 'react-select';

const ModalAtualizarBanca = (props) => {
  const {
    show,
    onHide,
    array_orientandos = [], // Inicializamos com array vazio por padrão
    array_tiposBanca = [],
    arrayAreaConcentracao = [],
    arrayLinhasDePesquisas = [],
    arraySelectedMembrosInternos = [],
    arraySelectedMembrosExternos = [],
    id_orientando,
    id_tipoBanca,
    idAreaConcentracao,
    idLinhaPesquisa,
    data_horaPrevista,
    titulo,
    title,
    resumo,
    palavra_chave,
    success,
    error,
    setIdOrientando,
    setIdTipoBanca,
    setIdAreaConcentracao,
    setIdLinhaPesquisa,
    setDataHoraPrevista,
    setTitulo,
    setTitle,
    setResumo,
    setPalavraChave,
    setArraySelectedMembrosInternos,
    setArraySelectedMembrosExternos,
    handleSubmit,
    arrayMembrosInternos,  // Recebido via props
    arrayMembrosExternos,  // Recebido via props
  } = props;

  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="contained-modal-title-vcenter"
      backdrop="static"
      size='xl'
      centered
    >
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <h4 className='titulo'><FaLayerGroup /> Atualizar Banca</h4>
        </Modal.Header>
        <Modal.Body>
          <div className='row' style={{ maxHeight: "400px", overflowY: "scroll" }}>
            <div className='col-sm-6'>
              <div className="form-group">
                <label>Orientando:*</label>
                <select className="form-control form-control-sm" id="selectOrientando"
                  value={id_orientando}
                  onChange={e => setIdOrientando(e.target.value)}
                >
                  <option value="0">Selecione</option>
                  {array_orientandos.length > 0 ?
                    array_orientandos.map(orientando => (
                      <option key={orientando.id} value={orientando.id}>
                        {orientando.nome.toUpperCase()}
                      </option>
                    ))
                    : <option value="0">Nenhum orientando encontrado</option>
                  }
                </select>
              </div>

              <div className="form-group">
                <label>Tipo da banca:*</label>
                <select className="form-control form-control-sm" id="selectTipoBanca"
                  value={id_tipoBanca}
                  onChange={e => setIdTipoBanca(e.target.value)}
                >
                  <option value="0">Selecione</option>
                  {array_tiposBanca.length > 0 ?
                    array_tiposBanca.map(tipo =>
                      parseInt(tipo.id) < 3 ? (
                        <option key={tipo.id} value={tipo.id}>{tipo.nome}</option>
                      ) : null
                    )
                    : <option value="0">Nenhum tipo de banca encontrado</option>
                  }
                </select>
              </div>

              <div className="form-group">
                <label>Área de concentração:*</label>
                <select className="form-control form-control-sm" id="selectAreaConcentracao"
                  value={idAreaConcentracao}
                  onChange={e => setIdAreaConcentracao(e.target.value)}
                >
                  {arrayAreaConcentracao.length > 0 ?
                    arrayAreaConcentracao.map(area => (
                      <option key={area.id} value={area.id}>
                        {area.nome}
                      </option>
                    ))
                    : <option value="0">Nenhuma área de concentração encontrada</option>
                  }
                </select>
              </div>

              <div className="form-group">
                <label>Linha de pesquisa:*</label>
                <select className="form-control form-control-sm" id="selectLinhaPesquisa"
                  value={idLinhaPesquisa}
                  onChange={e => setIdLinhaPesquisa(e.target.value)}
                >
                  <option value="0">Selecione</option>
                  {arrayLinhasDePesquisas.length > 0 ?
                    arrayLinhasDePesquisas.map(linha => (
                      <option key={linha.id} value={linha.id}>{linha.linha_pesquisa}</option>
                    ))
                    : <option value="0">Nenhuma linha de pesquisa encontrada</option>
                  }
                </select>
              </div>

              <div className="form-group">
                <label>Membros internos:*</label>
                <Select
                  closeMenuOnSelect={false}
                  value={arraySelectedMembrosInternos}
                  isMulti
                  options={arrayMembrosInternos}
                  onChange={setArraySelectedMembrosInternos}
                />
              </div>
            </div>

            <div className='col-sm-6'>
              <div className="form-group">
                <label>Membros externos:*</label>
                <Select
                  closeMenuOnSelect={false}
                  value={arraySelectedMembrosExternos}
                  isMulti
                  options={arrayMembrosExternos}
                  onChange={setArraySelectedMembrosExternos}
                />
              </div>

              <div className="form-group">
                <label>Título:</label>
                <textarea className="form-control form-control-sm" rows="3"
                  value={titulo}
                  onChange={e => setTitulo(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Título em inglês:</label>
                <textarea className="form-control form-control-sm" rows="3"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Resumo:</label>
                <textarea className="form-control form-control-sm" rows="3"
                  value={resumo}
                  onChange={e => setResumo(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Palavras-chave:</label>
                <textarea className="form-control form-control-sm" rows="3"
                  value={palavra_chave}
                  onChange={e => setPalavraChave(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="row mt-2">
            <div className="col-sm-12">
              {success && (
                <div className="alert alert-success text-center" role="alert">
                  {success}
                </div>
              )}
              {error && (
                <div className="alert alert-danger text-center" role="alert">
                  {error}
                </div>
              )}
            </div>
          </div>

          <div className='d-flex justify-content-center'>
            <button className='button'><FaRegSave /> Salvar</button>
          </div>
        </Modal.Body>
      </Form>
    </Modal>
  );
};

export default ModalAtualizarBanca;
