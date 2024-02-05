import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import { isAuthenticated } from './services/auth';
import Login from './pages/login/index';
import Administrador from './pages/administrador';
import Secretaria from './pages/secretaria';
import Validacao from './pages/validacao/index';
import ValidacaoCertificado from './pages/validacao_certificado/index';

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

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        // Passando as propriedades para a rota
        {...rest}
        // Redefindo o método render 
        render={props =>
            //renderizando o componente caso o usuário esteja autenticado
            isAuthenticated() ? (<Component {...props} />
            ) : (
                // caso contrário o usuário é redirecionado para a rota /
                //state impede que o usuário não perca seu histórico de rotas
                <Redirect to={{ pathname: '/', state: { from: props.location } }} />
            )
        }
    />
);

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Login} />
                <Route path="/repositorio" component={Repositorio} />
                <Route path="/eventos/enber/cadastrar" component={CadastroEventoEnber} />
                <Route path="/eventos/enber/grupo_trabalho" component={GrupoTrabalho} />
                <Route path="/eventos/nexus/cadastrar" component={CadastroEventoNexus} />
                <Route path="/validacao" component={Validacao} />
                <Route path="/validacao_certificado" component={ValidacaoCertificado} />
                <Route path="/teste_vocacional" component={TesteVocacional} />
                <Route path="/abertura_turma" component={AberturaTurma} />
                <Route path="/abertura_turma_cbie" component={AberturaTurmaCbie} />
                <Route path="/solicitacao_credenciamento" component={SolicitacaoCredenciamento} />
                <Route path="/certificado_digital" component={CertificadoDigital} />
                <PrivateRoute path="/administrador" component={Administrador} />
                <PrivateRoute path="/secretaria" component={Secretaria} />
                <PrivateRoute path="/eventos" component={Eventos} />
                <PrivateRoute path="/bancas/orientadores" component={Orientadores} />
                <PrivateRoute path="/bancas/orientandos" component={Orientandos} />
                <PrivateRoute path="/bancas/coordenadores" component={Coordenadores} />
                <PrivateRoute path="/bancas/diretor" component={Diretor} />
                <PrivateRoute path="/chamados" component={Chamados} />
                <PrivateRoute path="/convenios" component={Convenios} />
                <PrivateRoute path="/correcao_redacao" component={CorrecaoRedacao} />
                <PrivateRoute path="/alunos" component={Alunos} />
                <PrivateRoute path="/processo_credenciamento" component={ProcessoCredenciamento} />
                <Route path="*" component={PageNotFound} />
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;


