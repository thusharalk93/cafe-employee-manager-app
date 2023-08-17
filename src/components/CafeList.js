import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import CafeForm from './CafeForm';
import { fetchCafes, deleteCafe, editCafe  } from '../actions/cafesActions';

const CafeList = () => {
  const dispatch = useDispatch();
  const cafes = useSelector((state) => state.cafes.cafes);
  const loading = useSelector((state) => state.cafes.loading);
  const [selectedCafe, setSelectedCafe] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    dispatch(fetchCafes());
  }, [dispatch]);

  const handleEditCafe = (cafe) => {
    setSelectedCafe(cafe);
    setOpenDialog(true);
  };

  
  const handleDeleteCafe = (id) => {
    dispatch(deleteCafe(id, () => handleCloseDialog()));
  };

  const handleCloseDialog = () => {
    setSelectedCafe(null);
    setOpenDialog(false);
  };

  const columnDefs = [
    { headerName: 'Name', field: 'name', sortable: true },
    { headerName: 'Description', field: 'description', sortable: true },
    { headerName: 'Location', field: 'location', sortable: true },
    {
      headerName: 'Actions',
      cellRenderer: (params) => (
        <>
          <Button
            variant="outlined"
            color="primary"
            size="small"
            onClick={() => handleEditCafe(params.data)}
          >
            Edit
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            size="small"
            onClick={() => handleDeleteCafe(params.data._id)}
          >
            Delete
          </Button>
        </>
      ),
    },
  ];

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Cafe List</h2>
      <AgGridReact
        columnDefs={columnDefs}
        rowData={cafes}
        pagination={true}
        domLayout="autoHeight"
      />
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm">
        <DialogTitle>Edit Cafe</DialogTitle>
        <DialogContent>
          <CafeForm cafe={selectedCafe} onSave={handleCloseDialog} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CafeList;
