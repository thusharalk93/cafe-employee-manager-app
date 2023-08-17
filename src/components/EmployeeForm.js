import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { saveEmployee } from '../actions/employeesActions';
import { KeyboardDatePicker } from '@material-ui/pickers';

const EmployeeForm = ({ employee, onSave }) => {
  const dispatch = useDispatch();
  const cafes = useSelector((state) => state.cafes.cafes);

  const [formData, setFormData] = useState({
    name: '',
    email_address: '',
    phone_number: '',
    gender: 'Male',
    cafes: [],
  });

  useEffect(() => {
    if (employee) {
      setFormData({
        name: employee.name,
        email_address: employee.email_address,
        phone_number: employee.phone_number,
        gender: employee.gender,
        cafes: employee.cafes ? employee.cafes.map((cafe) => cafe.cafeId) : [],
      });
    }
  }, [employee]);  

  const handleInputChange = (event) => {
    const { name, value } = event.target;
  
    if (name === 'start_date') {
      setFormData((prevData) => ({
        ...prevData,
        cafes: [
          ...prevData.cafes.map((cafe) => ({
            ...cafe,
            start_date: value,
          })),
        ],
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };  

  const handleCafesChange = (event) => {
    const selectedCafes = Array.from(event.target.value);
    setFormData((prevData) => ({
      ...prevData,
      cafes: selectedCafes,
    }));
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const formattedCafes = formData.cafes.map((cafe) => ({
      ...cafe,
      start_date: cafe.start_date || null,
    }));
    const updatedFormData = {
      ...formData,
      cafes: formattedCafes,
    };
    dispatch(saveEmployee(employee ? employee._id : null, updatedFormData, onSave));
  };  

  const handleCafeStartDateChange = (cafeId, date) => {
    setFormData((prevData) => ({
      ...prevData,
      cafes: prevData.cafes.map((cafe) =>
        cafe.cafeId === cafeId ? { ...cafe, start_date: date } : cafe
      ),
    }));
  };    

  return (
    <form onSubmit={handleFormSubmit}>
      <TextField
        label="Name"
        name="name"
        value={formData.name}
        onChange={handleInputChange}
        required
        fullWidth
      />
      <TextField
        label="Email"
        name="email_address"
        value={formData.email_address}
        onChange={handleInputChange}
        type="email"
        required
        fullWidth
      />
      <TextField
        label="Phone Number"
        name="phone_number"
        value={formData.phone_number}
        onChange={handleInputChange}
        type="tel"
        pattern="[89][0-9]{7}"
        required
        fullWidth
      />
      <RadioGroup name="gender" value={formData.gender} onChange={handleInputChange}>
        <FormControlLabel value="Male" control={<Radio />} label="Male" />
        <FormControlLabel value="Female" control={<Radio />} label="Female" />
      </RadioGroup>
      <FormControl fullWidth>
        <InputLabel id="cafes-label">Assigned Cafe</InputLabel>
        <Select
          labelId="cafes-label"
          id="cafes"
          multiple
          value={formData.cafes}
          onChange={handleCafesChange}
          fullWidth
        >
          {cafes.map((cafe) => (
            <MenuItem key={cafe._id} value={cafe._id}>
              {cafe.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {cafes.map((cafe) => (
        <div key={cafe._id}>
          <FormControl fullWidth>
            <InputLabel id={`start-date-label-${cafe._id}`}>Start Date</InputLabel>
            <KeyboardDatePicker
              labelId={`start-date-label-${cafe._id}`}
              id={`start-date-${cafe._id}`}
              value={formData.cafes.find((c) => c.cafeId === cafe._id)?.start_date || null}
              onChange={(date) =>
                handleCafeStartDateChange(cafe._id, date)
              }
              format="yyyy-MM-dd"
              fullWidth
            />
          </FormControl>
        </div>
      ))}

      <Button type="submit" variant="contained" color="primary">
        Save
      </Button>
    </form>
  );
};

export default EmployeeForm;
