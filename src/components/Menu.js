import React, { useState, useEffect, useContext } from 'react';
import { getToken, logout } from '../services/auth';
import api from '../services/api';
import { slide as Slide } from 'react-burger-menu';
import nexus_white from '../assets/logo_nexus2.png';
import { FaCog, FaRegThumbsUp, FaUpload, FaUserCog, FaUsers, FaUsersCog, FaWrench } from 'react-icons/fa';
import UserContext from '../UserContext';

const Menu = () => {
    const [arrayPermissoes, setArrayPermissoes] = useState([]);
    const { user } = useContext(UserContext);

    useEffect(() => {
        const listaPermissoes = async (id_usuario) => {
            try {
                const response = await fetch(`${api.baseURL}/usuarios/${id_usuario}/permissoes`, {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'x-access-token': getToken()
                    }
                });

                const data = await response.json();
                if (data.status === 200) {
                    setArrayPermissoes(data.resultados);
                }
            } catch (error) {
                console.log(error);
            }
        };

        listaPermissoes(user.id);
    }, [user.id]);

    const renderMenuItems = () => {
        return arrayPermissoes.map((item) => {
            let icon, link, label;
            
            switch (item.id_permissao) {
                case 1:
                    icon = <FaUserCog />;
                    link = '/administrador';
                    label = 'ADMINISTRADOR';
                    break;
                case 5:
                    icon = <FaUpload />;
                    link = '/bancas/orientadores';
                    label = item.permissao.toUpperCase();
                    break;
                case 6:
                    icon = <FaRegThumbsUp />;
                    link = '/bancas/orientandos';
                    label = item.permissao.toUpperCase();
                    break;
                case 7:
                    icon = <FaUsersCog />;
                    link = '/bancas/coordenadores';
                    label = item.permissao.toUpperCase();
                    break;
                case 8:
                    icon = <FaCog />;
                    link = '/bancas/diretor';
                    label = item.permissao.toUpperCase();
                    break;
                case 9:
                    icon = <FaCog />;
                    link = '/eventos/enber/grupo_trabalho';
                    label = item.permissao.toUpperCase();
                    break;
                case 11:
                    icon = <FaUsers />;
                    link = '/convenios';
                    label = item.permissao.toUpperCase();
                    break;
                case 12:
                    icon = <FaCog />;
                    link = '/correcao_redacao';
                    label = item.permissao.toUpperCase();
                    break;
                case 15:
                    icon = <FaCog />;
                    link = '/processo_credenciamento';
                    label = item.permissao.toUpperCase();
                    break;
                default:
                    icon = <FaWrench />;
                    link = `/${item.permissao.toLowerCase()}`;
                    label = item.permissao.toUpperCase();
                    break;
            }

            return (
                <a href={link} key={item.id_permissao}>
                    {icon} {label}
                </a>
            );
        });
    };

    render() {
        const arrayPermissoes = this.state.arrayPermissoes;
        return (
            <Slide>
                <img id="logo" src={nexus_white} style={{ width: "100px", marginBottom: "14px" }} />
                {arrayPermissoes.length > 0 ? (
                    arrayPermissoes.map((item, index) => (
                        item.id_permissao === 1 ? (<a key={index} href={`/administrador`}><FaUserCog/> ADMINISTRADOR</a>) : ("") ||
                        item.id_permissao === 5 ? (<a key={index} href={`/bancas/orientadores`}><FaUpload/> {item.permissao.toUpperCase()}</a>) : ("") ||
                        item.id_permissao === 6 ? (<a key={index} href={`/bancas/orientandos`}><FaRegThumbsUp /> {item.permissao.toUpperCase()}</a>) : ("") ||
                        item.id_permissao === 7 ? (<a key={index} href={`/bancas/coordenadores`}><FaUsersCog/> {item.permissao.toUpperCase()}</a>) : ("") ||
                        item.id_permissao === 8 ? (<a key={index} href={`/bancas/diretor`}><FaCog/> {item.permissao.toUpperCase()}</a>) : ("") ||
                        item.id_permissao === 9 ? (<a key={index} href={`/eventos/enber/grupo_trabalho`}><FaCog/> {item.permissao.toUpperCase()}</a>) : ("") ||
                        item.id_permissao === 11 ? (<a key={index} href={`/convenios`}><FaUsers/> {item.permissao.toUpperCase()}</a>) : ("") ||
                        item.id_permissao === 12 ? (<a key={index} href={`/correcao_redacao`}><FaCog/> {item.permissao.toUpperCase()}</a>) : ("") ||
                        item.id_permissao === 15 ? (<a key={index} href={`/processo_credenciamento`}><FaCog/> {item.permissao.toUpperCase()}</a>) : ("") ||
                        <a key={index} href={`/${item.permissao.toLowerCase()}`}><FaWrench/> {item.permissao.toUpperCase()}</a>
                    ))
                ) : ("")}
                <a href="/" className="nav-link" onClick={() => logout()}>
                    <i className="nav-icon fas fa-sign-out-alt" />
                    Sair
                </a>
            </Slide>
        );
    }
}
