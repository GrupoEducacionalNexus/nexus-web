import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

const UserForm = ({ initialUserData = {}, onSubmit, onCancel }) => {
    const [userData, setUserData] = useState({
        nome: initialUserData.nome || '',
        email: initialUserData.email || '',
        cpf_cnpj: initialUserData.cpf_cnpj || '',
        senha: '',
        confirmarSenha: '',
        id_setor: initialUserData.id_setor || 0,
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const validateForm = () => {
        const { nome, email, cpf_cnpj, senha, confirmarSenha } = userData;
        if (!nome || !email || !cpf_cnpj) {
            setError('Por favor, preencha todos os campos obrigatórios.');
            return false;
        }
        if (senha && senha !== confirmarSenha) {
            setError('As senhas não coincidem.');
            return false;
        }
        setError('');
        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            onSubmit(userData)
                .then((message) => {
                    setSuccess(message);
                    setError('');
                })
                .catch((err) => {
                    setError(err.message || 'Erro ao atualizar usuário.');
                    setSuccess('');
                });
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}
            
            <Form.Group>
                <Form.Label>Nome</Form.Label>
                <Form.Control
                    type="text"
                    name="nome"
                    value={userData.nome}
                    onChange={handleChange}
                    placeholder="Digite seu nome"
                />
            </Form.Group>

            <Form.Group>
                <Form.Label>E-mail</Form.Label>
                <Form.Control
                    type="email"
                    name="email"
                    value={userData.email}
                    onChange={handleChange}
                    placeholder="Informe o seu email"
                />
            </Form.Group>

            <Form.Group>
                <Form.Label>CPF/CNPJ</Form.Label>
                <Form.Control
                    type="text"
                    name="cpf_cnpj"
                    value={userData.cpf_cnpj}
                    onChange={handleChange}
                    placeholder="Digite o CPF ou CNPJ"
                />
            </Form.Group>

            <Form.Group>
                <Form.Label>Senha</Form.Label>
                <Form.Control
                    type="password"
                    name="senha"
                    value={userData.senha}
                    onChange={handleChange}
                    placeholder="Digite sua senha"
                />
            </Form.Group>

            <Form.Group>
                <Form.Label>Confirmar Senha</Form.Label>
                <Form.Control
                    type="password"
                    name="confirmarSenha"
                    value={userData.confirmarSenha}
                    onChange={handleChange}
                    placeholder="Confirme sua senha"
                />
            </Form.Group>

            <Form.Group>
                <Form.Label>Setor</Form.Label>
                <Form.Control
                    as="select"
                    name="id_setor"
                    value={userData.id_setor}
                    onChange={handleChange}
                >
                    <option value="0">Selecione um setor</option>
                    {/* Opções de setor seriam renderizadas aqui */}
                </Form.Control>
            </Form.Group>

            <Button variant="primary" type="submit">
                Salvar
            </Button>
            <Button variant="secondary" onClick={onCancel} className="ml-2">
                Cancelar
            </Button>
        </Form>
    );
};

export default UserForm;
