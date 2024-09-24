// src/components/Menu.js
import React, { useState, useEffect, useContext } from 'react';
import { getToken, logout } from '../services/auth';
import api from '../services/api';
import { slide as Slide } from 'react-burger-menu';
import nexus_white from '../assets/logo_nexus2.png';
import {
    FaCog,
    FaRegThumbsUp,
    FaUpload,
    FaUserCog,
    FaUsers,
    FaUsersCog,
    FaWrench,
    FaSignOutAlt
} from 'react-icons/fa';
import UserContext from '../UserContext';
import { Link } from 'react-router-dom';
import './Menu.css';

const Menu = () => {
    const [arrayPermissoes, setArrayPermissoes] = useState([]);
    const { user, setUser } = useContext(UserContext);

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

        if (user && user.id) {
            listaPermissoes(user.id);
        }
    }, [user]);

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
                <Link to={link} key={item.id_permissao} className="menu-item">
                    {icon} {label}
                </Link>
            );
        });
    };

    const handleLogout = () => {
        logout(); // Remove o token e limpa o estado de autenticação
        setUser(null); // Limpa o usuário no contexto
        // Redireciona para a página de login
        window.location.href = '/';
    };

    return (
        <Slide>
            <div className="menu-header">
                <img src={nexus_white} alt="Logo Nexus" className="logo" />
            </div>
            <nav className="menu-items">
                {renderMenuItems()}
            </nav>
            <div className="menu-footer">
                <button onClick={handleLogout} className="logout-button">
                    <FaSignOutAlt /> Logout
                </button>
            </div>
        </Slide>
    );
};

export default Menu;
