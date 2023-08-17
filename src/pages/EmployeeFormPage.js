import React from 'react';
import { Container, Typography } from '@material-ui/core';
import EmployeeForm from '../components/EmployeeForm';

const EmployeeFormPage = ({ cafes }) => {
  return (
    <Container>
      <Typography variant="h4">Add/Edit Employee</Typography>
      <EmployeeForm cafes={cafes} />
    </Container>
  );
};

export default EmployeeFormPage;
