import React from 'react';
import { FaRegEdit } from 'react-icons/fa';

function OrientandosTable({ orientandos, onEditarOrientando }) {
  return (
    <div className="table-responsive table-sm text-center">
      <div className="table-wrapper">
        <table className="table table-bordered table-striped table-hover bg-white">
          <thead className="thead-light">
            <tr style={{ position: 'sticky', top: 0, zIndex: 1 }}>
              <th scope="col" className="sticky-col">Nome</th>
              <th>Curso</th>
              <th>Linha de pesquisa</th>
              <th>Fase do processo</th>
              <th>Data/hora inicial do processo</th>
              <th>Data/hora final do processo</th>
              <th>Data/hora de conclusão</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {orientandos.length > 0 ? (
              orientandos.map(orientando => (
                <tr
                  key={orientando.id}
                  className={orientando.status_confirmacaoBancaD === 7 ? `table-success` : ``}
                  title="Clique aqui para obter mais informações sobre o orientando"
                >
                  <td>{orientando.nome ? orientando.nome.toUpperCase() : ""}</td>
                  <td>{orientando.curso}</td>
                  <td>{orientando.linha_pesquisa}</td>
                  <td>{orientando.fase_processo}</td>
                  <td>{orientando.dataHoraInicialFaseProcessoTb}</td>
                  <td>{orientando.dataHoraFinalFaseProcessoTb}</td>
                  <td>{orientando.dataHoraConclusaoTb}</td>
                  <td>
                    <button className='button' onClick={() => onEditarOrientando(orientando)}>
                      <FaRegEdit /> Atualizar
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr className="text-center">
                <td colSpan="8">
                  Nenhum resultado encontrado
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default OrientandosTable;
