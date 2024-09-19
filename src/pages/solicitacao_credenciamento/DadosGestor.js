// components/DadosGestor.js
import React from 'react';
import { FaUserTie } from 'react-icons/fa';

const DadosGestor = ({ nome, email, telefone, cpf, senha, confirmarSenha, onChange }) => (
    <div className="col-sm-6">
        <h4 className='text-center' style={{ color: "#000233" }}>
            <FaUserTie /> Dados do Gestor
        </h4>
        <hr />
        <div className="form-group">
            <label htmlFor="nomeCompleto">Nome completo:</label>
            <input
                type="text"
                className="form-control form-control-sm"
                id="nomeCompleto"
                placeholder="Informe o seu nome"
                onChange={onChange}
                name="nome"
                value={nome}
                autoComplete="off"
            />
        </div>
        <div className="form-group">
            <label htmlFor="emailGestor">E-mail:</label>
            <input
                className="form-control form-control-sm"
                type="email"
                placeholder="Informe o seu e-mail"
                name="email"
                id="emailGestor"
                onChange={onChange}
                value={email}
                autoComplete="off"
            />
        </div>
        <div className="form-group">
            <label htmlFor="telefoneGestor">Telefone:</label>
            <input
                className="form-control form-control-sm"
                type="text"
                placeholder="Informe o seu telefone"
                name="telefone"
                id="telefoneGestor"
                onChange={onChange}
                value={telefone}
                autoComplete="off"
            />
        </div>
        <div className="form-group">
            <label htmlFor="cpfGestor">CPF:</label>
            <input
                className="form-control form-control-sm"
                type="text"
                placeholder="Informe o seu CPF"
                name="cpf"
                id="cpfGestor"
                onChange={onChange}
                value={cpf}
                autoComplete="off"
            />
        </div>
        <div className="row">
            <div className="col-md-6">
                <div className="form-group">
                    <label htmlFor="senhaGestor">Senha</label>
                    <input
                        type="password"
                        className="form-control form-control-sm"
                        id="senhaGestor"
                        placeholder="Informe sua senha"
                        onChange={onChange}
                        name="senha"
                        value={senha}
                    />
                </div>
            </div>
            <div className="col-md-6">
                <div className="form-group">
                    <label htmlFor="repetirSenhaGestor">Repetir Senha</label>
                    <input
                        type="password"
                        className="form-control form-control-sm"
                        id="repetirSenhaGestor"
                        placeholder="Informe sua senha novamente"
                        onChange={onChange}
                        name="confirmarSenha"
                        value={confirmarSenha}
                    />
                </div>
            </div>
        </div>
    </div>
);

export default DadosGestor;
