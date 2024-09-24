import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { isAuthenticated } from './services/auth';
import Login from './pages/login/index';
import Administrador from './pages/administrador/index';
import Secretaria from './pages/secretaria';
import Validacao from './pages/validacao/index';
import PageNotFound from './components/PageNotFound';
import CadastroEventoEnber from './pages/eventos/enber/cadastrar/index';
import GrupoTrabalho from './pages/eventos/enber/grupo_trabalho/index';
import CadastroEventoNexus from './pages/eventos/nexus/cadastrar/index';
import Repositorio from './pages/repositorio/index';
import Eventos from './pages/eventos/index';
import Orientadores from './pages/bancas/orientadores/index';
import Orientandos from './pages/bancas/orientandos/index';
import Coordenadores from './pages/bancas/coordenadores/index';
import Diretor from './pages/bancas/diretor/index';
import TesteVocacional from './pages/teste_vocacional/index';
import AberturaTurma from './pages/abertura_turma_nexus/index';
import AberturaTurmaCbie from './pages/abertura_turma_cbie/index';
import SolicitacaoCredenciamento from './pages/solicitacao_credenciamento/index';
import Chamados from './pages/chamados/index';
import Convenios from './pages/convenios/index';
import CorrecaoRedacao from './pages/correcao_redacao/index';
import Alunos from './pages/alunos/index';
import CertificadoDigital from './pages/certificado_digital/index';
import ProcessoCredenciamento from './pages/processo_credenciamento/index';

// Implementação de PrivateRoute para v6
const PrivateRoute = ({ children }) => {
    return isAuthenticated() ? children : <Navigate to="/" replace />;
};

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* Rotas Públicas */}
                <Route path="/" element={<Login />} />
                <Route path="/repositorio" element={<Repositorio />} />
                <Route path="/eventos/enber/cadastrar" element={<CadastroEventoEnber />} />
                <Route path="/eventos/enber/grupo_trabalho" element={<GrupoTrabalho />} />
                <Route path="/eventos/nexus/cadastrar" element={<CadastroEventoNexus />} />
                <Route path="/validacao" element={<Validacao />} />
                <Route path="/teste_vocacional" element={<TesteVocacional />} />
                <Route path="/abertura_turma" element={<AberturaTurma />} />
                <Route path="/abertura_turma_cbie" element={<AberturaTurmaCbie />} />
                <Route path="/solicitacao_credenciamento" element={<SolicitacaoCredenciamento />} />
                <Route path="/certificado_digital" element={<CertificadoDigital />} />

                {/* Rotas Privadas */}
                <Route path="/administrador" element={
                    <PrivateRoute>
                        <Administrador />
                    </PrivateRoute>
                } />
                <Route path="/secretaria" element={
                    <PrivateRoute>
                        <Secretaria />
                    </PrivateRoute>
                } />
                <Route path="/eventos" element={
                    <PrivateRoute>
                        <Eventos />
                    </PrivateRoute>
                } />
                <Route path="/bancas/orientadores" element={
                    <PrivateRoute>
                        <Orientadores />
                    </PrivateRoute>
                } />
                <Route path="/bancas/orientandos" element={
                    <PrivateRoute>
                        <Orientandos />
                    </PrivateRoute>
                } />
                <Route path="/bancas/coordenadores" element={
                    <PrivateRoute>
                        <Coordenadores />
                    </PrivateRoute>
                } />
                <Route path="/bancas/diretor" element={
                    <PrivateRoute>
                        <Diretor />
                    </PrivateRoute>
                } />
                <Route path="/chamados" element={
                    <PrivateRoute>
                        <Chamados />
                    </PrivateRoute>
                } />
                <Route path="/convenios" element={
                    <PrivateRoute>
                        <Convenios />
                    </PrivateRoute>
                } />
                <Route path="/correcao_redacao" element={
                    <PrivateRoute>
                        <CorrecaoRedacao />
                    </PrivateRoute>
                } />
                <Route path="/alunos" element={
                    <PrivateRoute>
                        <Alunos />
                    </PrivateRoute>
                } />
                <Route path="/processo_credenciamento" element={
                    <PrivateRoute>
                        <ProcessoCredenciamento />
                    </PrivateRoute>
                } />

                {/* Página 404 */}
                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;
