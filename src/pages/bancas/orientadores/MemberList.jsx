// MemberList.js
import React from 'react';

const MemberList = ({ membros, isEnglish }) => (
    <ol className={isEnglish ? 'mt-3' : ''} style={{ listStyle: 'lower-roman' }}>
        {membros.length > 0 ? (
            membros.map((membro) => {
                const nome = membro.nome.slice(0, membro.nome.indexOf(' -'));
                const tipo = membro.nome.slice(membro.nome.indexOf('-') + 1).trim();
                let tipoTraduzido = '';

                if (isEnglish) {
                    if (tipo === 'presidente') tipoTraduzido = ' - President';
                    else if (tipo === 'membro externo') tipoTraduzido = ' - External Member';
                    else if (tipo === 'membro interno') tipoTraduzido = ' - Internal Member';
                } else {
                    tipoTraduzido = '';
                }

                return (
                    <li key={membro.id}>
                        {nome}
                        {tipoTraduzido}
                    </li>
                );
            })
        ) : (
            <li></li>
        )}
    </ol>
);

export default MemberList;
