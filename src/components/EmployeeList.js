import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import EmployeeForm from './EmployeeForm';
import ConfirmationDialog from './ConfirmationDialog';
import { fetchEmployees, deleteEmployee } from '../actions/employeesActions';

const EmployeeList = () => {
  const dispatch = useDispatch();
  const employees = useSelector((state) => state.employees.employees);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  const handleEditEmployee = (employee) => {
    setSelectedEmployee(employee);
    setOpenDialog(true);
  };  

  const handleDeleteEmployee = (id) => {
    setSelectedEmployee(id);
    setOpenDeleteDialog(true);
  };

  const handleCloseDialog = () => {
    setSelectedEmployee(null);
    setOpenDialog(false);
    setOpenDeleteDialog(false);
  };

  const handleConfirmDelete = () => {
    dispatch(deleteEmployee(selectedEmployee, handleCloseDialog));
  };

  const columnDefs = [
    // { headerName: 'ID', field: 'id', sortable: true },
    { headerName: 'Name', field: 'name', sortable: true },
    { headerName: 'Email', field: 'email_address', sortable: true },
    { headerName: 'Phone Number', field: 'phone_number', sortable: true },
    { headerName: 'Days Worked', field: 'days_worked', sortable: true },
    { headerName: 'Cafe', field: 'cafe', sortable: true },
    {
      headerName: 'Actions',
      cellRenderer: (params) => (
        <>
          <Button
            variant="outlined"
            color="primary"
            size="small"
            onClick={() => handleEditEmployee(params.data)}
          >
            Edit
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            size="small"
            onClick={() => handleDeleteEmployee(params.data._id)}
          >
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <div>
      <h2>Employee List</h2>
      <AgGridReact
        columnDefs={columnDefs}
        rowData={employees}
        pagination={true}
        domLayout="autoHeight"
      />
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm">
        <DialogTitle>Edit Employee</DialogTitle>
        <DialogContent>
          <EmployeeForm employee={selectedEmployee} onSave={handleCloseDialog} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <ConfirmationDialog
        open={openDeleteDialog}
        onClose={handleCloseDialog}
        onConfirm={handleConfirmDelete}
        title="Delete Employee"
        message="Are you sure you want to delete this employee?"
      />
    </div>
  );
};

export default EmployeeList;
