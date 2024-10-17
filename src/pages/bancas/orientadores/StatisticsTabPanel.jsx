import React from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import StatisticsPanel from './StatisticsPanel';
import OrientandosTab from './OrientandosTab';
import BancasTab from './BancasTab';

const StatisticsTabsPanel = ({
    array_orientandos,
    array_bancasQ,
    array_bancasD,
    arrayLinhasDePesquisas,
    array_tiposBanca,
    nome,
    handlerShowModalEditarOrientando,
    loadOrientandos,
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
}) => {
    return (
        <div className="content">
            <div className="content">
                {/* Painel de Estatísticas */}
                <StatisticsPanel
                    array_orientandos={array_orientandos}
                    array_bancasQ={array_bancasQ}
                    array_bancasD={array_bancasD}
                />

                {/* Abas */}
                <Tabs
                    variant="pills"
                    defaultActiveKey="bancas"
                    transition={false}
                    id="panel-admin"
                    className="justify-content-center"
                >
                    <Tab eventKey="orientandos" title="Orientandos">
                        <OrientandosTab
                            nome={nome}
                            array_orientandos={array_orientandos}
                            arrayLinhasDePesquisas={arrayLinhasDePesquisas}
                            array_tiposBanca={array_tiposBanca}
                            handlerShowModalEditarOrientando={handlerShowModalEditarOrientando}
                            loadOrientandos={loadOrientandos}
                        />
                    </Tab>

                    <Tab eventKey="bancas" title="Bancas">
                        <BancasTab
                            array_bancasQ={array_bancasQ}
                            array_bancasD={array_bancasD}
                            handlerMostrarModalAtualizarBanca={handlerShowModalAtualizarBanca}
                            handlerMostrarModalEmitirDeclaracao={handlerShowModalEmitirDeclaracao}
                            handlerMostrarModalEmitirAta={handlerShowModalEmitirAta}
                            handlerMostrarModalAtualizarAta={handlerShowModalAtualizarAta}
                            handlerMostrarModalVisualizarAta={handlerShowModalVisualizarAta}
                            handlerMostrarModalEmitirFichaDeAvaliacao={handlerShowModalEmitirFichaDeAvaliacao}
                            handlerMostrarModalEditarFichaDeAvaliacao={handlerShowModalEditarFichaDeAvaliacao}
                            handlerMostrarModalVisualizarFichaDeAvaliacao={handlerShowModalVisualizarFichaDeAvaliacao}
                            handlerMostrarModalExcluirBanca={handlerShowModalExcluirBanca}
                            handlerMostrarModalFinalizarBanca={handlerShowModalFinalizarBanca}
                            handlerMostrarModalEmitirDeclaracaoDeOrientacao={handlerShowModalEmitirDeclaracaoDeOrientacao}
                            handlerMostrarModalVisualizarDeclaracaoDeOrientacao={handlerShowModalVisualizarDeclaracaoDeOrientacao}
                            handlerMostrarModalCadastrarEAtualizarFolhaDeAprovacao={handlerShowModalCadastrarEAtualizarFolhaDeAprovacao}
                            handlerMostrarModalVisualizarFolhaDeAprovacao={handlerShowModalVisualizarFolhaDeAprovacao}
                            handlerMostrarModalVisualizarCertificadoDeAprovacao={handlerShowModalVisualizarCertificadoDeAprovacao}
                        />
                    </Tab>
                </Tabs>
            </div>
            {/* /.content */}
            <br />
        </div>
    );
};

export default StatisticsTabsPanel;
