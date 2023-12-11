import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { FaUserGraduate } from 'react-icons/fa';
function MenuLateral({ children, ...props  }) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
            <button className="btn btn-sn btn-outline-light me-2" size='sm' onClick={handleShow}>
                Menu
            </button>
            <Offcanvas show={show} onHide={handleClose} {...props}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title></Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <h1>TESTE</h1>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}
export default MenuLateral;