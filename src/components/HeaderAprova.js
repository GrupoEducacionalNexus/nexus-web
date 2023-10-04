import React from 'react';
import Perfil from './Perfil';
import aprova from '../assets/aprova.png';

export default function HeaderAprova() {
    return (
        <nav className="navbar navbar-expand navbar-dark navbar-primary fixed-top" style={{ backgroundColor: '#000233', color: "#ffffff"}}>
            <div class="navbar-collapse collapse justify-content-between">
                <ul class="navbar-nav mr-auto">
                    <li className="nav-item d-sm-inline-block">
                        <a href="#" className="nav-link">   
                            <img id="logo" src={aprova} style={{ display: 'block', margin: '0 auto' }} />
                        </a>
                    </li>
                </ul>
                <ul class="navbar-nav">
                    <li className="nav-item d-sm-inline-block">
                        <Perfil id="btn-perfil" className="btn btn-sm btn-outline-light" />
                    </li>
                </ul>
            </div>
        </nav>

    )
}
