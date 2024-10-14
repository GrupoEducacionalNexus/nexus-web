// MemberSignatures.js
import React from 'react';

const MemberSignatures = ({ membros }) => (
  <>
    {membros.length > 0 &&
      membros.map((membro) => (
        <div key={membro.id}>
          <img
            className="img-fluid"
            style={{ width: '220px', display: 'block', margin: '0 auto' }}
            src={membro.assinatura}
            alt={`Assinatura de ${membro.nome}`}
          />
          <hr />
          <p className="text-center">{membro.nome.toUpperCase()}</p>
        </div>
      ))}
  </>
);

export default MemberSignatures;
