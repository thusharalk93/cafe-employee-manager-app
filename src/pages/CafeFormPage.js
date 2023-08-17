import React from 'react';
import { Container, Typography } from '@material-ui/core';
import CafeForm from '../components/CafeForm';

const CafeFormPage = () => {
  return (
    <Container>
      <Typography variant="h4">Add/Edit Cafe</Typography>
      <CafeForm />
    </Container>
  );
};

export default CafeFormPage;
