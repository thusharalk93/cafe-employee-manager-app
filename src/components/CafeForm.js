import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Button, TextField, Typography } from '@material-ui/core';
import { addCafe, editCafe } from '../actions/cafesActions';

const CafeForm = ({ cafe, onSave }) => {
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [logo, setLogo] = useState(null);

  useEffect(() => {
    if (cafe) {
      setName(cafe.name);
      setDescription(cafe.description);
      setLocation(cafe.location);
    }
  }, [cafe]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const cafeData = {
      name,
      description,
      location,
      //logo,
    };

    if (cafe) {
      // If cafe exists, it's an edit, so include cafe's ID
      dispatch(editCafe(cafe._id, cafeData, onSave));
    } else {
      // If cafe doesn't exist, it's a new cafe
      dispatch(addCafe(cafeData, onSave));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h6">{cafe ? 'Edit Cafe' : 'Add New Cafe'}</Typography>
      <TextField
        label="Name"
        variant="outlined"
        fullWidth
        required
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <TextField
        label="Description"
        variant="outlined"
        fullWidth
        multiline
        required
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <TextField
        label="Location"
        variant="outlined"
        fullWidth
        required
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <input type="file" accept="image/*" onChange={(e) => setLogo(e.target.files[0])} />
      <Button type="submit" variant="contained" color="primary">
        {cafe ? 'Save Changes' : 'Add Cafe'}
      </Button>
    </form>
  );
};

export default CafeForm;
