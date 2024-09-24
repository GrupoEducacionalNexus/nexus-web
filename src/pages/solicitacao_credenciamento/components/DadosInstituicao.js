// src/pages/solicitacao_credenciamento/DadosInstituicao.js
import React from 'react';
import InputMask from 'react-input-mask';
import { FaSchool } from 'react-icons/fa';

const DadosInstituicao = ({
    cnpj,
    razao_social,
    nome_fantasia,
    id_estado,
    cidade,
    arrayEstados,
    arrayCidades,
    onChange
}) => (
    <div className="col-sm-6">
        <h4 className='text-center' style={{ color: "#000233" }}>
            <FaSchool /> Dados da Instituição
        </h4>
        <hr />
        <div className="form-group">
            <label htmlFor="cnpjInstituicao">CNPJ:*</label>
            <InputMask
                mask="99.999.999/9999-99"
                maskChar=""
                className="form-control form-control-sm"
                type="text"
                placeholder="Informe o seu CNPJ"
                name="cnpj"
                id='cnpjInstituicao'
                value={cnpj}
                onChange={onChange}
                autoComplete="off"
            />
        </div>
        <div className="form-group">
            <label htmlFor="razaoSocial">Razão Social:*</label>
            <input
                className="form-control form-control-sm"
                type="text"
                name="razao_social"
                id='razaoSocial'
                value={razao_social}
                autoComplete="off"
                disabled={true}
            />
        </div>
        <div className="form-group">
            <label htmlFor="nomeFantasia">Nome Fantasia:*</label>
            <input
                className="form-control form-control-sm"
                type="text"
                name="nome_fantasia"
                id='nomeFantasia'
                value={nome_fantasia}
                autoComplete="off"
                disabled={true}
            />
        </div>
        <div className="form-group">
            <label htmlFor="selectEstado">Estado:</label>
            <select
                className="form-control form-control-sm"
                id="selectEstado"
                name="estado"
                value={id_estado || 0} // Use apenas id_estado
                onChange={onChange}
            >
                <option value={0}>Selecione um estado</option>
                {arrayEstados.length > 0 ? (
                    arrayEstados.map(item => (
                        <option key={item.id} value={item.id}>
                            {item.nome}
                        </option>
                    ))
                ) : (
                    <option value="">Nenhum resultado foi encontrado</option>
                )}
            </select>
        </div>
        <div className="form-group">
            <label htmlFor="selectCidade">Cidade:</label>
            <select
                className="form-control form-control-sm"
                id="selectCidade"
                name="cidade"
                value={cidade}
                onChange={onChange}
                disabled={!id_estado}
            >
                <option value="">Selecione uma cidade</option>
                {arrayCidades.length > 0 ? (
                    arrayCidades.map((item, index) => (
                        <option key={index} value={item}>
                            {item}
                        </option>
                    ))
                ) : (
                    <option value="">Nenhum resultado foi encontrado</option>
                )}
            </select>
        </div>
    </div>
);

export default DadosInstituicao;
