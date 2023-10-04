import React from 'react';
import Perfil from './Perfil';
import nexus_white from '../assets/nexus-white.png';
import Menu from './Menu';
// <img id="logo" src={nexus_white} style={{ width: "100px", display: 'block', margin: '0 auto' }} />
export default function HeaderNexus() {
    return (
        <nav className="main-header navbar navbar-expand navbar-dark navbar-primary" style={{ backgroundColor: '#000233' }}>
            {/* Left navbar links */}
         
            <div class="navbar-collapse collapse justify-content-between">
                <ul class="navbar-nav mr-auto">
                    <li className="nav-item">
                        <a className="nav-link" href="#" role="button"> </a>
                    </li>

                    <li className="nav-item d-none d-sm-inline-block">
                        <a href="#" className="nav-link" style={{ color: '#F9CC00' }}>
                            <img id="logo" src={nexus_white} style={{ width: "100px", display: 'block', margin: '0 auto' }} />
                        </a>
                    </li>
                </ul>
                <ul class="navbar-nav">
                    <li className="nav-item d-none d-sm-inline-block ">
                        <Perfil className="btn btn-sm btn-outline-light"/>
                    </li>
                </ul>
            </div>
        </nav>

    )
}
