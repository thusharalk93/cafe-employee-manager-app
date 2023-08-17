import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Typography, Button } from '@material-ui/core';
import EmployeeList from '../components/EmployeeList';
import EmployeeForm from '../components/EmployeeForm';
import ConfirmationDialog from '../components/ConfirmationDialog';
import { fetchEmployees, deleteEmployee } from '../actions/employeesActions';

const EmployeesPage = ({ cafes }) => {
  const dispatch = useDispatch();
  const employees = useSelector((state) => state.employees);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [openForm, setOpenForm] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  const handleAddEmployee = () => {
    setSelectedEmployee(null);
    setOpenForm(true);
  };

  const handleEditEmployee = (employee) => {
    setSelectedEmployee(employee);
    setOpenForm(true);
  };

  const handleDeleteEmployee = (employee) => {
    setSelectedEmployee(employee);
    setOpenDeleteDialog(true);
  };

  const handleConfirmDelete = () => {
    dispatch(deleteEmployee(selectedEmployee._id));
    setSelectedEmployee(null);
    setOpenDeleteDialog(false);
  };

  const handleCloseForm = () => {
    setSelectedEmployee(null);
    setOpenForm(false);
  };

  return (
    <Container>
      <Typography variant="h4">Employees</Typography>
      <Button variant="contained" color="primary" onClick={handleAddEmployee}>
        Add New Employee
      </Button>
      <EmployeeList employees={employees} cafes={cafes} onEdit={handleEditEmployee} onDelete={handleDeleteEmployee} />
      <EmployeeForm employee={selectedEmployee} cafes={cafes} open={openForm} onClose={handleCloseForm} />
      <ConfirmationDialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        onConfirm={handleConfirmDelete}
        message={`Are you sure you want to delete the employee "${selectedEmployee?.name}"?`}
      />
    </Container>
  );
};

export default EmployeesPage;
