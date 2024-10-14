// BancasTab.js
import React from 'react';
import { Container } from 'react-bootstrap';
import {
  FaPencilAlt,
  FaShieldAlt,
  FaRegPlusSquare,
} from 'react-icons/fa';
import BancaList from './BancaList';

const BancasTab = (props) => {
  const {
    array_bancasQ,
    array_bancasD,
    handlerMostrarModalAtualizarBanca,
    handlerMostrarModalEmitirDeclaracao,
    handlerMostrarModalEmitirAta,
    handlerMostrarModalAtualizarAta,
    handlerMostrarModalVisualizarAta,
    handlerMostrarModalEmitirFichaDeAvaliacao,
    handlerMostrarModalEditarFichaDeAvaliacao,
    handlerMostrarModalVisualizarFichaDeAvaliacao,
    handlerMostrarModalExcluirBanca,
    handlerMostrarModalFinalizarBanca,
    handlerMostrarModalEmitirDeclaracaoDeOrientacao,
    handlerMostrarModalVisualizarDeclaracaoDeOrientacao,
    handlerMostrarModalCadastrarEAtualizarFolhaDeAprovacao,
    handlerMostrarModalVisualizarFolhaDeAprovacao,
    handlerMostrarModalVisualizarCertificadoDeAprovacao,
  } = props;

  return (
    <Container style={{ backgroundColor: '#F8F9FA', padding: '20px' }}>
      <div className="row d-flex justify-content-center">
        {/* Seção de Qualificação */}
        <BancaList
          titulo="Qualificação"
          icone={<FaPencilAlt />}
          bancas={array_bancasQ}
          campoStatus="status_confirmacaoBancaQ"
          renderButtons={(banca) => (
            <>
              <button
                className="button"
                onClick={() => handlerMostrarModalAtualizarBanca(banca)}
              >
                <FaRegPlusSquare /> Atualizar banca
              </button>
              {(banca.status_confirmacaoBancaQ === "CONFIRMADO" ||
                banca.status_confirmacaoBancaQ === "FINALIZADA") && (
                <button
                  className="button mt-2"
                  onClick={() => handlerMostrarModalEmitirDeclaracao(banca)}
                >
                  Declaração de participação
                </button>
              )}
              {(banca.status_confirmacaoBancaQ === "CONFIRMADO" ||
                banca.status_confirmacaoBancaQ === "FINALIZADA") &&
                banca.id_ata === null && (
                  <button
                    className="button mt-2"
                    onClick={() => handlerMostrarModalEmitirAta(banca)}
                  >
                    Emitir ATA
                  </button>
                )}
              {(banca.status_confirmacaoBancaQ === "CONFIRMADO" ||
                banca.status_confirmacaoBancaQ === "FINALIZADA") &&
                banca.id_ata !== null && (
                  <>
                    <button
                      className="button mt-2"
                      onClick={() => handlerMostrarModalAtualizarAta(banca)}
                    >
                      Atualizar ATA
                    </button>
                    <button
                      className="button mt-2"
                      onClick={() => handlerMostrarModalVisualizarAta(banca)}
                    >
                      ATA
                    </button>
                  </>
                )}
              {(banca.status_confirmacaoBancaQ === "CONFIRMADO" ||
                banca.id_fichaAvaliacao === null) && (
                <button
                  className="button mt-2"
                  onClick={() => handlerMostrarModalEmitirFichaDeAvaliacao(banca)}
                >
                  Emitir ficha de avaliação
                </button>
              )}
              {(banca.status_confirmacaoBancaQ === "CONFIRMADO" ||
                banca.status_confirmacaoBancaQ === "FINALIZADA") &&
                banca.id_fichaAvaliacao !== null && (
                  <>
                    <button
                      className="button mt-2"
                      onClick={() => handlerMostrarModalEditarFichaDeAvaliacao(banca)}
                    >
                      Atualizar ficha de avaliação
                    </button>
                    <button
                      className="button mt-2"
                      onClick={() => handlerMostrarModalVisualizarFichaDeAvaliacao(banca)}
                    >
                      Visualizar ficha de avaliação
                    </button>
                  </>
                )}
              <button
                className="button mt-2"
                onClick={() => handlerMostrarModalExcluirBanca(banca)}
              >
                Excluir banca
              </button>
              {banca.status_confirmacaoBancaQ === "CONFIRMADO" && (
                <button
                  className="button mt-2"
                  onClick={() => handlerMostrarModalFinalizarBanca(banca)}
                >
                  Finalizar banca
                </button>
              )}
            </>
          )}
        />

        {/* Seção de Defesa */}
        <BancaList
          titulo="Defesa"
          icone={<FaShieldAlt />}
          bancas={array_bancasD}
          campoStatus="status_confirmacaoBancaD"
          renderButtons={(banca) => (
            <>
              <button
                className="button"
                onClick={() => handlerMostrarModalAtualizarBanca(banca)}
              >
                <FaRegPlusSquare /> Atualizar banca
              </button>
              <button
                className="button mt-2"
                onClick={() => handlerMostrarModalEmitirDeclaracaoDeOrientacao(banca)}
              >
                Emitir declaração de orientação
              </button>
              <button
                className="button mt-2"
                onClick={() =>
                  handlerMostrarModalVisualizarDeclaracaoDeOrientacao({
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
                  handlerMostrarModalVisualizarDeclaracaoDeOrientacao({
                    ...banca,
                    documentoEmIngles: true,
                  })
                }
              >
                Guidance statement
              </button>
              {(banca.status_confirmacaoBancaD === "CONFIRMADO" ||
                banca.status_confirmacaoBancaD === "FINALIZADA") && (
                <button
                  className="button mt-2"
                  onClick={() => handlerMostrarModalEmitirDeclaracao(banca)}
                >
                  Declaração de participação
                </button>
              )}
              {(banca.status_confirmacaoBancaD === "CONFIRMADO" ||
                banca.status_confirmacaoBancaD === "FINALIZADA") &&
                banca.id_ata === null && (
                  <button
                    className="button mt-2"
                    onClick={() => handlerMostrarModalEmitirAta(banca)}
                  >
                    Emitir ATA
                  </button>
                )}
              {(banca.status_confirmacaoBancaD === "CONFIRMADO" ||
                banca.status_confirmacaoBancaD === "FINALIZADA") &&
                banca.id_ata !== null && (
                  <>
                    <button
                      className="button mt-2"
                      onClick={() => handlerMostrarModalAtualizarAta(banca)}
                    >
                      Atualizar ATA
                    </button>
                    <button
                      className="button mt-2"
                      onClick={() => handlerMostrarModalVisualizarAta(banca)}
                    >
                      ATA
                    </button>
                  </>
                )}
              {(banca.status_confirmacaoBancaD === "CONFIRMADO" ||
                banca.id_fichaAvaliacao === null) && (
                <button
                  className="button mt-2"
                  onClick={() => handlerMostrarModalEmitirFichaDeAvaliacao(banca)}
                >
                  Emitir ficha de avaliação
                </button>
              )}
              {(banca.status_confirmacaoBancaD === "CONFIRMADO" ||
                banca.status_confirmacaoBancaD === "FINALIZADA") &&
                banca.id_ata !== null &&
                banca.id_fichaAvaliacao !== null && (
                  <>
                    <button
                      className="button mt-2"
                      onClick={() => handlerMostrarModalEditarFichaDeAvaliacao(banca)}
                    >
                      Atualizar ficha de avaliação
                    </button>
                    <button
                      className="button mt-2"
                      onClick={() => handlerMostrarModalVisualizarFichaDeAvaliacao(banca)}
                    >
                      Visualizar ficha de avaliação
                    </button>
                  </>
                )}
              {banca.status_confirmacaoBancaD === "FINALIZADA" && (
                <>
                  <button
                    className="button mt-2"
                    onClick={() =>
                      handlerMostrarModalCadastrarEAtualizarFolhaDeAprovacao(banca)
                    }
                  >
                    Emitir folha de aprovação
                  </button>
                  <button
                    className="button mt-2"
                    onClick={() => handlerMostrarModalVisualizarFolhaDeAprovacao(banca)}
                  >
                    Folha de aprovação
                  </button>
                  <button
                    className="button mt-2"
                    onClick={() =>
                      handlerMostrarModalVisualizarCertificadoDeAprovacao(banca)
                    }
                  >
                    Certificado de aprovação
                  </button>
                </>
              )}
              <button
                className="button mt-2"
                onClick={() => handlerMostrarModalExcluirBanca(banca)}
              >
                Excluir
              </button>
              {banca.status_confirmacaoBancaD === "CONFIRMADO" && (
                <button
                  className="button mt-2"
                  onClick={() => handlerMostrarModalFinalizarBanca(banca)}
                >
                  Finalizar
                </button>
              )}
            </>
          )}
        />
      </div>
    </Container>
  );
};

export default BancasTab;
