import React from 'react';
import { Spinner } from 'react-bootstrap';

const UserTable = ({ usuarios, onEdit }) => {
    return (
        <div className="table-responsive table-sm">
            <div className="table-wrapper">
                <table className="table table-bordered table-light table-hover text-center">
                    <thead className="thead-light">
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Cpf/cnpj</th>
                            <th scope="col">Nome</th>
                            <th scope="col">Email</th>
                            <th scope="col">Status</th>
                            <th scope="col">Data e hora de criação</th>
                            <th scope="col">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usuarios.length > 0 ? (
                            usuarios.map((usuario, index) => (
                                <tr key={usuario.id}>
                                    <td>{usuario.id}</td>
                                    <td>{usuario.cpf_cnpj}</td>
                                    <td>{usuario.nome}</td>
                                    <td>{usuario.email}</td>
                                    <td>{usuario.status}</td>
                                    <td>{usuario.dataHoraCriacao}</td>
                                    <td>
                                        <button className="button" onClick={() => onEdit(usuario)}>
                                            Atualizar
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr className="text-center">
                                <td colSpan="7">
                                    <Spinner animation="border" />
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserTable;
