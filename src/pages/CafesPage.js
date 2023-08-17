import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Typography, Button } from '@material-ui/core';
import CafeList from '../components/CafeList';
import CafeForm from '../components/CafeForm';
import ConfirmationDialog from '../components/ConfirmationDialog';
import { fetchCafes, deleteCafe } from '../actions/cafesActions';

const CafesPage = () => {
  const dispatch = useDispatch();
  const cafes = useSelector((state) => state.cafes);
  const [selectedCafe, setSelectedCafe] = useState(null);
  const [openForm, setOpenForm] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  useEffect(() => {
    dispatch(fetchCafes());
  }, [dispatch]);

  const handleAddCafe = () => {
    setSelectedCafe(null);
    setOpenForm(true);
  };

  const handleEditCafe = (cafe) => {
    setSelectedCafe(cafe);
    setOpenForm(true);
  };

  const handleDeleteCafe = (cafe) => {
    setSelectedCafe(cafe);
    setOpenDeleteDialog(true);
  };

  const handleConfirmDelete = () => {
    dispatch(deleteCafe(selectedCafe._id));
    setSelectedCafe(null);
    setOpenDeleteDialog(false);
  };

  const handleCloseForm = () => {
    setSelectedCafe(null);
    setOpenForm(false);
  };

  return (
    <Container>
      <Typography variant="h4">Cafes</Typography>
      <Button variant="contained" color="primary" onClick={handleAddCafe}>
        Add New Cafe
      </Button>
      <CafeList cafes={cafes} onEdit={handleEditCafe} onDelete={handleDeleteCafe} />
      <CafeForm cafe={selectedCafe} open={openForm} onClose={handleCloseForm} />
      <ConfirmationDialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        onConfirm={handleConfirmDelete}
        message={`Are you sure you want to delete the cafe "${selectedCafe?.name}"?`}
      />
    </Container>
  );
};

export default CafesPage;
