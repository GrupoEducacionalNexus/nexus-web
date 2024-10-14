import React from 'react';
import { Row, Col, Tabs, Tab, Container } from 'react-bootstrap';
import {
  FaRegPlusSquare,
  FaUserGraduate,
  FaClipboardList,
  FaPencilAlt,
  FaShieldAlt,
} from 'react-icons/fa';
import MainContent from './MainContent';
import FloatingMenu from './FloatingMenu';
import FilterForm from './FilterForm';
import OrientandosTable from './OrientandosTable';
import BancaList from './BancaList';

const AdminContent = (props) => {
  const {
    id_orientando,
    nome,
    array_orientandos,
    array_bancasQ,
    array_bancasD,
    arrayLinhasDePesquisas,
    array_tiposBanca,
    handlerShowModalCadastrarBanca,
    handlerShowModalCadastrarEAtualizarOrientacao,
    handlerShowModalEditarOrientando,
    handlerShowModalAtualizarBanca,
    handlerShowModalEmitirDeclaracao,
    handlerShowModalEmitirAta,
    handlerShowModalAtualizarAta,
    handlerShowModalVisualizarAta,
    handlerShowModalEmitirFichaDeAvaliacao,
    handlerShowModalEditarFichaDeAvaliacao,
    handlerShowModalVisualizarFichaDeAvaliacao,
    handlerShowModalExcluirBanca,
    handlerShowModalFinalizarBanca,
    handlerShowModalEmitirDeclaracaoDeOrientacao,
    handlerShowModalVisualizarDeclaracaoDeOrientacao,
    handlerShowModalCadastrarEAtualizarFolhaDeAprovacao,
    handlerShowModalVisualizarFolhaDeAprovacao,
    handlerShowModalVisualizarCertificadoDeAprovacao,
    loadOrientandos,
    setState,
  } = props;

  return (
    <Row>
      <Col xs={12} id="main">
        <MainContent>
          <FloatingMenu>
            <ul className="dropdown-menu">
              <li>
                <a className="button" onClick={handlerShowModalCadastrarBanca}>
                  <FaRegPlusSquare /> Registrar banca
                </a>
              </li>
              {id_orientando !== 0 ? (
                <li>
                  <a
                    className="button"
                    onClick={handlerShowModalCadastrarEAtualizarOrientacao}
                  >
                    Registrar orientação
                  </a>
                </li>
              ) : null}

              <li>
                <a>Para adicionar novas opções entre em contato com o desenvolvedor</a>
              </li>
            </ul>
          </FloatingMenu>
          <div className="content">
            <div className="content">
              <div
                className="row d-flex justify-content-center text-center"
                style={{ marginBottom: '10px' }}
              >
                <div className="col-sm-3 mb-2">
                  <FaUserGraduate
                    style={{ width: '30px', height: '30px', marginBottom: '10px' }}
                  />
                  <h5 style={{ fontSize: '12pt' }}>Total de Orientandos Registrados</h5>
                  <h6>{array_orientandos.length}</h6>
                </div>

                <div className="col-sm-3 mb-2">
                  <FaClipboardList
                    style={{ width: '30px', height: '30px', marginBottom: '10px' }}
                  />
                  <h5 style={{ fontSize: '12pt' }}>Total de Bancas de Qualificação</h5>
                  <h6>{array_bancasQ.length}</h6>
                </div>

                <div className="col-sm-3 mb-2">
                  <FaClipboardList
                    style={{ width: '30px', height: '30px', marginBottom: '10px' }}
                  />
                  <h5 style={{ fontSize: '12pt' }}>Total de Bancas de Defesa</h5>
                  <h6>{array_bancasD.length}</h6>
                </div>
              </div>

              <Tabs
                variant="pills"
                defaultActiveKey="bancas"
                transition={false}
                id="panel-admin"
                className="justify-content-center"
              >
                <Tab eventKey="orientandos" title="Orientandos">
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
                </Tab>

                <Tab eventKey="bancas" title="Bancas">
                  <Container style={{ backgroundColor: '#F8F9FA', padding: '20px' }}>
                    <div className="row d-flex justify-content-center">
                      {/* Seção de Qualificação */}
                      <BancaList
                        title="Qualificação"
                        icon={<FaPencilAlt />}
                        bancas={array_bancasQ}
                        statusField="status_confirmacaoBancaQ"
                        renderButtons={(banca) => (
                          <>
                            <button
                              className="button"
                              onClick={() => handlerShowModalAtualizarBanca(banca)}
                            >
                              <FaRegPlusSquare /> Atualizar banca
                            </button>
                            {(banca.status_confirmacaoBancaQ === 'CONFIRMADO' ||
                              banca.status_confirmacaoBancaQ === 'FINALIZADA') && (
                              <button
                                className="button mt-2"
                                onClick={() => handlerShowModalEmitirDeclaracao(banca)}
                              >
                                Declaração de participação
                              </button>
                            )}
                            {(banca.status_confirmacaoBancaQ === 'CONFIRMADO' ||
                              banca.status_confirmacaoBancaQ === 'FINALIZADA') &&
                              banca.id_ata === null && (
                                <button
                                  className="button mt-2"
                                  onClick={() => handlerShowModalEmitirAta(banca)}
                                >
                                  Emitir ATA
                                </button>
                              )}
                            {(banca.status_confirmacaoBancaQ === 'CONFIRMADO' ||
                              banca.status_confirmacaoBancaQ === 'FINALIZADA') &&
                              banca.id_ata !== null && (
                                <>
                                  <button
                                    className="button mt-2"
                                    onClick={() => handlerShowModalAtualizarAta(banca)}
                                  >
                                    Atualizar ATA
                                  </button>
                                  <button
                                    className="button mt-2"
                                    onClick={() => handlerShowModalVisualizarAta(banca)}
                                  >
                                    ATA
                                  </button>
                                </>
                              )}
                            {(banca.status_confirmacaoBancaQ === 'CONFIRMADO' ||
                              banca.id_fichaAvaliacao === null) && (
                              <button
                                className="button mt-2"
                                onClick={() => handlerShowModalEmitirFichaDeAvaliacao(banca)}
                              >
                                Emitir ficha de avaliação
                              </button>
                            )}
                            {(banca.status_confirmacaoBancaQ === 'CONFIRMADO' ||
                              banca.status_confirmacaoBancaQ === 'FINALIZADA') &&
                              banca.id_fichaAvaliacao !== null && (
                                <>
                                  <button
                                    className="button mt-2"
                                    onClick={() => handlerShowModalEditarFichaDeAvaliacao(banca)}
                                  >
                                    Atualizar ficha de avaliação
                                  </button>
                                  <button
                                    className="button mt-2"
                                    onClick={() =>
                                      handlerShowModalVisualizarFichaDeAvaliacao(banca)
                                    }
                                  >
                                    Visualizar ficha de avaliação
                                  </button>
                                </>
                              )}
                            <button
                              className="button mt-2"
                              onClick={() => handlerShowModalExcluirBanca(banca)}
                            >
                              Excluir banca
                            </button>
                            {banca.status_confirmacaoBancaQ === 'CONFIRMADO' && (
                              <button
                                className="button mt-2"
                                onClick={() => handlerShowModalFinalizarBanca(banca)}
                              >
                                Finalizar banca
                              </button>
                            )}
                          </>
                        )}
                      />

                      {/* Seção de Defesa */}
                      <BancaList
                        title="Defesa"
                        icon={<FaShieldAlt />}
                        bancas={array_bancasD}
                        statusField="status_confirmacaoBancaD"
                        renderButtons={(banca) => (
                          <>
                            <button
                              className="button"
                              onClick={() => handlerShowModalAtualizarBanca(banca)}
                            >
                              <FaRegPlusSquare /> Atualizar banca
                            </button>
                            <button
                              className="button mt-2"
                              onClick={() => handlerShowModalEmitirDeclaracaoDeOrientacao(banca)}
                            >
                              Emitir declaração de orientação
                            </button>
                            <button
                              className="button mt-2"
                              onClick={() =>
                                handlerShowModalVisualizarDeclaracaoDeOrientacao({
                                  ...banca,
                                  documentoEmIngles: false,
                                })
                              }
                            >
                              Declaração de orientação
                            </button>
                            <button
                              className="button mt-2"
                              onClick={() =>
                                handlerShowModalVisualizarDeclaracaoDeOrientacao({
                                  ...banca,
                                  documentoEmIngles: true,
                                })
                              }
                            >
                              Guidance statement
                            </button>
                            {(banca.status_confirmacaoBancaD === 'CONFIRMADO' ||
                              banca.status_confirmacaoBancaD === 'FINALIZADA') && (
                              <button
                                className="button mt-2"
                                onClick={() => handlerShowModalEmitirDeclaracao(banca)}
                              >
                                Declaração de participação
                              </button>
                            )}
                            {(banca.status_confirmacaoBancaD === 'CONFIRMADO' ||
                              banca.status_confirmacaoBancaD === 'FINALIZADA') &&
                              banca.id_ata === null && (
                                <button
                                  className="button mt-2"
                                  onClick={() => handlerShowModalEmitirAta(banca)}
                                >
                                  Emitir ATA
                                </button>
                              )}
                            {(banca.status_confirmacaoBancaD === 'CONFIRMADO' ||
                              banca.status_confirmacaoBancaD === 'FINALIZADA') &&
                              banca.id_ata !== null && (
                                <>
                                  <button
                                    className="button mt-2"
                                    onClick={() => handlerShowModalAtualizarAta(banca)}
                                  >
                                    Atualizar ATA
                                  </button>
                                  <button
                                    className="button mt-2"
                                    onClick={() => handlerShowModalVisualizarAta(banca)}
                                  >
                                    ATA
                                  </button>
                                </>
                              )}
                            {(banca.status_confirmacaoBancaD === 'CONFIRMADO' ||
                              banca.id_fichaAvaliacao === null) && (
                              <button
                                className="button mt-2"
                                onClick={() => handlerShowModalEmitirFichaDeAvaliacao(banca)}
                              >
                                Emitir ficha de avaliação
                              </button>
                            )}
                            {(banca.status_confirmacaoBancaD === 'CONFIRMADO' ||
                              banca.status_confirmacaoBancaD === 'FINALIZADA') &&
                              banca.id_ata !== null &&
                              banca.id_fichaAvaliacao !== null && (
                                <>
                                  <button
                                    className="button mt-2"
                                    onClick={() => handlerShowModalEditarFichaDeAvaliacao(banca)}
                                  >
                                    Atualizar ficha de avaliação
                                  </button>
                                  <button
                                    className="button mt-2"
                                    onClick={() =>
                                      handlerShowModalVisualizarFichaDeAvaliacao(banca)
                                    }
                                  >
                                    Visualizar ficha de avaliação
                                  </button>
                                </>
                              )}
                            {banca.status_confirmacaoBancaD === 'FINALIZADA' && (
                              <>
                                <button
                                  className="button mt-2"
                                  onClick={() =>
                                    handlerShowModalCadastrarEAtualizarFolhaDeAprovacao(banca)
                                  }
                                >
                                  Emitir folha de aprovação
                                </button>
                                <button
                                  className="button mt-2"
                                  onClick={() => handlerShowModalVisualizarFolhaDeAprovacao(banca)}
                                >
                                  Folha de aprovação
                                </button>
                                <button
                                  className="button mt-2"
                                  onClick={() =>
                                    handlerShowModalVisualizarCertificadoDeAprovacao(banca)
                                  }
                                >
                                  Certificado de aprovação
                                </button>
                              </>
                            )}
                            <button
                              className="button mt-2"
                              onClick={() => handlerShowModalExcluirBanca(banca)}
                            >
                              Excluir
                            </button>
                            {banca.status_confirmacaoBancaD === 'CONFIRMADO' && (
                              <button
                                className="button mt-2"
                                onClick={() => handlerShowModalFinalizarBanca(banca)}
                              >
                                Finalizar
                              </button>
                            )}
                          </>
                        )}
                      />
                    </div>
                  </Container>
                </Tab>
              </Tabs>
            </div>
            {/* /.content */}
            <br />
          </div>
        </MainContent>
      </Col>
    </Row>
  );
};

export default AdminContent;
