import React, { useState, useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { fetchPermissoes } from '../services/permissionService';
import { listaDeSetores } from '../services/getListaDeSetores';

const UserForm = ({ initialUserData = {}, onSubmit, onCancel }) => {
    const initialData = initialUserData || {};
    const [userData, setUserData] = useState({
        nome: initialData.nome || '',
        email: initialData.email || '',
        cpf_cnpj: initialData.cpf_cnpj || '',
        senha: '',
        confirmarSenha: '',
        id_setor: initialData.id_setor || 0,
        permissoes: initialData.permissoes || [],
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [arrayPermissoes, setArrayPermissoes] = useState([]);
    const [arraySetores, setArraySetores] = useState([]);

    // Carregar permissões e setores ao montar o componente
    useEffect(() => {
        // Buscar permissões da API
        const loadPermissoes = async () => {
            try {
                const data = await fetchPermissoes();
                setArrayPermissoes(data.resultados || []);
            } catch (error) {
                console.error('Erro ao buscar permissões:', error);
            }
        };

        // Buscar setores da API
        const loadSetores = async () => {
            try {
                const data = await listaDeSetores();
                setArraySetores(data.resultados || []);
            } catch (error) {
                console.error('Erro ao buscar setores:', error);
            }
        };

        loadPermissoes();
        loadSetores();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handlePermissaoChange = (id_permissao) => {
        setUserData((prevData) => {
            const permissoesAtualizadas = prevData.permissoes.includes(id_permissao)
                ? prevData.permissoes.filter((permissao) => permissao !== id_permissao)
                : [...prevData.permissoes, id_permissao];

            return {
                ...prevData,
                permissoes: permissoesAtualizadas,
            };
        });
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
                    {arraySetores.length > 0 ? (
                        arraySetores.map((setor) => (
                            <option key={setor.id} value={setor.id}>
                                {setor.nome}
                            </option>
                        ))
                    ) : (
                        <option value="0">Nenhum setor encontrado</option>
                    )}
                </Form.Control>
            </Form.Group>

            <div className="col-sm-6">
                <h4 className="lead text-center">Permissões</h4>
                <hr />
                {arrayPermissoes.length > 0 ? (
                    arrayPermissoes.map((permissao, index) => (
                        <div key={index} className="custom-control custom-checkbox">
                            <input
                                type="checkbox"
                                className="custom-control-input"
                                id={`checkPermissao_${permissao.id}`}
                                checked={userData.permissoes.includes(permissao.id)}
                                onChange={() => handlePermissaoChange(permissao.id)}
                            />
                            <label className="custom-control-label" htmlFor={`checkPermissao_${permissao.id}`}>
                                {permissao.nome}
                            </label>
                        </div>
                    ))
                ) : (
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="check" value={0} />
                        <label className="custom-control-label" htmlFor="check">Nenhum resultado encontrado</label>
                    </div>
                )}
            </div>

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
