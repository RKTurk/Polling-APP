import React, { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const PollsGrid = () => {
  const [rowData, setRowData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/polls/data');
      const data = await response.json();
      setRowData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const columnDefs = [
    { headerName: 'ID', field: 'id' },
    { headerName: 'Question', field: 'question' },
  ];

  const gridOptions = {
    defaultColDef: {
      flex: 1,
      minWidth: 150,
      resizable: true,
    },
    pagination: true,
    paginationPageSize: 10,
  };

  return (
    <div className="ag-theme-alpine" style={{ height: 400, width: '100%' }}>
      <AgGridReact
        columnDefs={columnDefs}
        rowData={rowData}
        gridOptions={gridOptions}
      />
    </div>
  );
};

export default PollsGrid;
