// DataTable.js
import React from 'react';

const DataTable = ({ headers, data, renderRow, noDataText }) => (
  <div className="table-responsive table-sm text-center">
    <div className="table-wrapper">
      <table className="table table-bordered table-striped table-hover bg-white text-center">
        <thead
          className="thead-light"
          style={{ position: 'sticky', top: 0, zIndex: 1 }}
        >
          <tr>
            {headers.map((header, index) => (
              <th key={index} scope="col">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map(renderRow)
          ) : (
            <tr className="text-center">
              <td colSpan={headers.length}>{noDataText || 'Nenhum resultado encontrado'}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
);

export default DataTable;