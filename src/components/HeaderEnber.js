import React from 'react';
import Perfil from './Perfil';
import logo_enber from '../assets/logo_enber.png';

export default function HeaderEnber() {
    return (
        <nav className="main-header navbar navbar-expand navbar-dark navbar-primary fixed-top" style={{ backgroundColor: '#000233' }}>
            {/* Left navbar links */}
         
            <div class="navbar-collapse collapse justify-content-between">
                <ul class="navbar-nav mr-auto">
                    <li className="nav-item">
                        <a className="nav-link" data-widget="pushmenu" href="#" role="button"><i className="fas fa-bars" /></a>
                    </li>

                    <li className="nav-item d-none d-sm-inline-block">
                        <a href="#" className="nav-link" style={{ color: '#F9CC00' }}>
                            <img id="logo" src={logo_enber} style={{ width: "180px", display: 'block', margin: '0 auto' }} />
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
