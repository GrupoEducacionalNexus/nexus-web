import React from 'react';
import { Modal } from 'react-bootstrap';
import { atualizarUsuario } from '../services/userService';
import UserForm from './userForm';

const UserModal = ({ show, onHide, user, onSuccess }) => {
    const handleFormSubmit = (userData) => {
        return atualizarUsuario(userData).then((response) => {
            if (response.status === 200) {
                onSuccess(response.msg);
                onHide();
            } else {
                throw new Error(response.msg);
            }
        });
    };

    return (
        <Modal show={show} onHide={onHide} backdrop="static" size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title>Atualizar Usuário</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <UserForm
                    initialUserData={user}
                    onSubmit={handleFormSubmit}
                    onCancel={onHide}
                />
            </Modal.Body>
        </Modal>
    );
};

export default UserModal;
