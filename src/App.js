import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container } from '@material-ui/core';
import CafesPage from './pages/CafesPage';
import EmployeesPage from './pages/EmployeesPage';
import CafeFormPage from './pages/CafeFormPage';
import EmployeeFormPage from './pages/EmployeeFormPage';
import { fetchCafes } from './actions/cafesActions';
import { fetchEmployees } from './actions/employeesActions';
import { useDispatch } from 'react-redux';

import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

const App = () => {
  const dispatch = useDispatch();

  // Fetch initial data
  dispatch(fetchCafes());
  dispatch(fetchEmployees());

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Router>
        <Container>
          <Routes >
            <Route exact path="/" element={<CafesPage/>} />
            <Route exact path="/employees" element={<EmployeesPage/>} />
            <Route exact path="/cafes/add" element={<CafeFormPage/>} />
            <Route exact path="/cafes/edit/:id" element={<CafeFormPage/>} />
            <Route exact path="/employees/add" element={<EmployeeFormPage/>} />
            <Route exact path="/employees/edit/:id" element={<EmployeeFormPage/>} />
          </Routes>
        </Container>

      </Router>
    </MuiPickersUtilsProvider>
  );
};

export default App;
