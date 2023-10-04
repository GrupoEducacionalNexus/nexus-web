import React, { createContext } from 'react';
import { useState } from 'react';

export const DadosContext = createContext();

export const DadosProvider = ({ children }) => {
    const [id, setId] = useState(0);
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [id_permissao, setIdPermissao] = useState([]);
    const [id_setor, setIdSetor] = useState(0);

    return (
        <DadosContext.Provider value={{
            id, setId, nome, setNome,
            email, setEmail, id_permissao, setIdPermissao,
            id_setor, setIdSetor
        }}>
            {children}
        </DadosContext.Provider>
    )
}


