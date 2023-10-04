import React, { useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';
import { Alert } from 'react-bootstrap';
import { FaBell, FaRegFileVideo } from 'react-icons/fa';
import api from '../services/api';
import { getNome, getToken } from '../services/auth';
import ModalLeft from './ModalLeft';
import ModalRight from './ModalRight';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { notificar } from '../services/somDeNotificacao';
import UserContext from '../UserContext';

const NotificationComponent = ({ id_usuario, listaDeChamados }) => {
  const userContext = useContext(UserContext);
  const [notification, setNotification] = useState(null);
  const [notificacoes, setNotificacoes] = useState([]);

  useEffect(() => {
    const socket = io(`${api.baseURL}`);
    // Emitir o evento de confirmação de conexão
    // socket.emit('connection-confirmed');
    socket.emit('entrar', getNome());

    socket.on('notification', (data) => {
      setNotification(data.message);
      notify(data.message);
      notificar();
      listaDeNotificacoes(id_usuario);
      listaDeChamados(userContext.user.id_setor, 0);
      listaDeChamados(userContext.user.id_setor, 1);
      listaDeChamados(userContext.user.id_setor, 2);
      listaDeChamados(userContext.user.id_setor, 3);
    });

    const listaDeNotificacoes = async (id_usuario) => {
      try {
        const response = await fetch(
          `${api.baseURL}/usuarios/${id_usuario}/notificacoes`,
          {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              'x-access-token': getToken()
            },
          }
        );

        const data = await response.json();

        if (data.status === 200) {
          setNotificacoes(data.resultados); // Atribui o retorno ao array useState
        }
      } catch (error) {
        console.log(error);
      }
    }

    listaDeNotificacoes(id_usuario);
    return () => {
      socket.disconnect();
    };
  }, []);

  const [isOpenLeft, setIsOpenLeft] = useState(false);

  const openModalLeft = () => {
    setIsOpenLeft(true);
  };

  const closeModalLeft = () => {
    setIsOpenLeft(false);
  };

  const [isOpenModalRight, setIsOpenModalRight] = useState(false);
  const [notificacao, setNotificacao] = useState(false);

  const openModalModalRight = (notificacao) => {
    setIsOpenModalRight(true);
    setNotificacao(notificacao)
    verificarTipoDaNotificacao(notificacao);
  };

  const closeModalModalRight = () => {
    setIsOpenModalRight(false);
  };

  const [chamado, setChamado] = useState({});

  const buscarChamado = async (token, id_chamado) => {
    try {
      const response = await fetch(
        `${api.baseURL}/chamados/${id_chamado}`,
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'x-access-token': token,
          },
        }
      );

      const data = await response.json();
      if (data.status === 200) {
        console.log(data);
        setChamado(data.resultados[0]);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const [comentarios, setComentarios] = useState([]);

  const listaDeComentarios = async (token, id_chamado) => {
    try {
      const response = await fetch(
        `${api.baseURL}/chamados/${id_chamado}/comentarios`,
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'x-access-token': token,
          },
        }
      );

      const data = await response.json();
      if (data.status === 200) {
        setComentarios(data.resultados);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const verificarTipoDaNotificacao = (notificacao) => {
    const id_chamado = Number(notificacao.descricao.match(/\d+/)[0]);
    if (parseInt(notificacao.id_tipo_notificacao) === 1) {
      listaDeComentarios(getToken(), id_chamado);
      return
    }
    buscarChamado(getToken(), id_chamado);
  }

  const notify = (mensagem) => toast(mensagem);

  return (
    <div className="Container">
      <button onClick={openModalLeft} className='button btn-block mb-2'><FaBell /> Notificações</button>

      <ModalLeft isOpenLeft={isOpenLeft}>
        <button className="modal-close button mb-3" onClick={closeModalLeft}>
          Fechar
        </button>
        <div className='container' style={{ maxHeight: "300px", overflowY: "scroll" }}>
          {notificacoes.length > 0 ?
            notificacoes.map(notificacao => (
              <Alert variant={`light`} style={{ border: "1px solid #000233" }}>
                <p>{notificacao.descricao + ` na data ` + notificacao.dataHoraCriacao}</p><br />
                {!notificacao.descricao.includes('status') ? (
                  <div className='d-flex justify-content-center'>
                    <button className='button mt-2' onClick={() => openModalModalRight(notificacao)}>Visualizar</button>
                  </div>
                ) : ("")}

              </Alert>
            ))
            : (<h5>Você não possui nenhuma notificacão</h5>)}
        </div>
      </ModalLeft>
      <ModalRight isOpenModalRight={isOpenModalRight} notificacao={notificacao}>
        <button className="modal-close button mb-3" onClick={closeModalModalRight}>
          Fechar
        </button>
        {notificacao.id_tipo_notificacao === 1 && (<h5 className='lead'>Comentários</h5>)}
        {notificacao.id_tipo_notificacao === 1 && (<hr />)}

        <div className='container' style={{ maxHeight: "300px", overflowY: "scroll" }}>
          {notificacao.id_tipo_notificacao === 1 && (
            comentarios.length > 0 ? (
              comentarios.map((comentario, index) => (
                <div className="card w-100" key={index} style={{ border: "1px solid #000233" }}>
                  <div className="card-header font-weight-bold">
                    {comentario.nome} - {comentario.dataHoraCriacao}
                  </div>
                  <div className="card-body">
                    <p className="card-text">{comentario.descricao}</p>
                  </div>
                </div>
              ))

            ) : ("")
          )}

          {notificacao.id_tipo_notificacao === 2 && (<h5 className='lead'><FaRegFileVideo /> Detalhes do chamado</h5>)}
          {notificacao.id_tipo_notificacao === 2 && (<hr />)}

          {notificacao.id_tipo_notificacao === 2 && (
            <div className='container'>
              <ul class="list-group w-100">
                <li class="list-group-item text-dark">Chamado: {chamado.id}</li>
                <li class="list-group-item text-dark">Descrição: {chamado.descricao}</li>
                <li class="list-group-item text-dark">Status: {chamado.status}</li>
                <li class="list-group-item text-dark">Tipo: {chamado.tipo_chamado}</li>
                <li class="list-group-item text-dark">Prioridade: {chamado.prioridade}</li>
                <li class="list-group-item text-dark">Setor solicitante: {chamado.setorSolicitante}</li>
              </ul>
            </div>
          )}

          {notificacao.id_tipo_notificacao === 9 && (<h5 className='lead'><FaRegFileVideo /> Detalhes da abertura de turma</h5>)}
          {notificacao.id_tipo_notificacao === 9 && (<hr />)}

          {notificacao.id_tipo_notificacao === 9 && (
            <div className='container'>
              <ul class="list-group w-100">
                <li class="list-group-item text-dark">Chamado: {chamado.id}</li>
                <li class="list-group-item text-dark">Descrição: {chamado.descricao}</li>
                <li class="list-group-item text-dark">Status: {chamado.status}</li>
                <li class="list-group-item text-dark">Tipo: {chamado.tipo_chamado}</li>
                <li class="list-group-item text-dark">Prioridade: {chamado.prioridade}</li>
                <li class="list-group-item text-dark">Setor solicitante: {chamado.setorSolicitante}</li>
              </ul>
            </div>
          )}
        </div>
      </ModalRight>
      {notification && (<div>
        <ToastContainer />
      </div>)}
    </div >
  );
};

export default NotificationComponent;