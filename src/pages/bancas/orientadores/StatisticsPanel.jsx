// StatisticsPanel.js
import React from 'react';
import { FaUserGraduate, FaClipboardList } from 'react-icons/fa';

const StatisticsPanel = ({ array_orientandos, array_bancasQ, array_bancasD }) => (
  <div
    className="row d-flex justify-content-center text-center"
    style={{ marginBottom: '10px' }}
  >
    <div className="col-sm-3 mb-2">
      <FaUserGraduate
        style={{ width: '30px', height: '30px', marginBottom: '10px' }}
      />
      <h5 style={{ fontSize: '12pt' }}>Total de Orientandos Registrados</h5>
      <h6>{array_orientandos.length}</h6>
    </div>

    <div className="col-sm-3 mb-2">
      <FaClipboardList
        style={{ width: '30px', height: '30px', marginBottom: '10px' }}
      />
      <h5 style={{ fontSize: '12pt' }}>Total de Bancas de Qualificação</h5>
      <h6>{array_bancasQ.length}</h6>
    </div>

    <div className="col-sm-3 mb-2">
      <FaClipboardList
        style={{ width: '30px', height: '30px', marginBottom: '10px' }}
      />
      <h5 style={{ fontSize: '12pt' }}>Total de Bancas de Defesa</h5>
      <h6>{array_bancasD.length}</h6>
    </div>
  </div>
);

export default StatisticsPanel;
