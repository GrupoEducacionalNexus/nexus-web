import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import Perfil from './Perfil';
import NotificationComponent from './NotificationComponent';
import nexus_white from '../assets/educa_nexus.png';



const AdminNavbar = ({ id_usuario, listaDeChamados }) => {
  return (
    <Navbar bg="light" expand="lg" className='fixed'>
      <Navbar.Brand href="#">
        <img
          src={nexus_white}
          alt="logo"
          style={{
            width: "100px",
            display: "block",
            marginBottom: "10px",
            marginLeft: '80px'
          }} />
      </Navbar.Brand>
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link>
            <NotificationComponent
              id_usuario={id_usuario}
              listaDeChamados={listaDeChamados}
            />
          </Nav.Link>
          <Nav.Link>
            <Perfil className="button" />
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default AdminNavbar;