import * as actionTypes from './actionTypes';
import api from '../api/api';

export const fetchEmployeesStart = () => ({
  type: actionTypes.FETCH_EMPLOYEES_REQUEST,
});

export const fetchEmployeesSuccess = (employees) => ({
  type: actionTypes.FETCH_EMPLOYEES_SUCCESS,
  employees,
});

export const fetchEmployeesFail = () => ({
  type: actionTypes.FETCH_EMPLOYEES_FAILURE,
});

export const addEmployeeSuccess = (employee) => ({
  type: actionTypes.ADD_EMPLOYEE_SUCCESS,
  employee,
});

export const editEmployeeSuccess = (employee) => ({
  type: actionTypes.EDIT_EMPLOYEE_SUCCESS,
  employee,
});

export const deleteEmployeeSuccess = (id) => ({
  type: actionTypes.DELETE_EMPLOYEE_SUCCESS,
  id,
});

export const fetchEmployees = () => {
  return (dispatch) => {
    dispatch(fetchEmployeesStart());

    api.get('/employees')
      .then((response) => {
        dispatch(fetchEmployeesSuccess(response.data));
      })
      .catch((error) => {
        dispatch(fetchEmployeesFail());
      });
  };
};

export const saveEmployee = (id, employeeData, callback) => {
  return (dispatch) => {
    if (id) {
      api.put(`/employees/${id}`, employeeData)
        .then((response) => {
          dispatch(editEmployeeSuccess(response.data));
          callback();
        })
        .catch((error) => {});
    } else {
      api.post('/employees', employeeData)
        .then((response) => {
          dispatch(addEmployeeSuccess(response.data));
          callback();
        })
        .catch((error) => {});
    }
  };
};

export const deleteEmployee = (id, callback) => {
  return (dispatch) => {
    api.delete(`/employees/${id}`)
      .then(() => {
        dispatch(deleteEmployeeSuccess(id));
        callback();
      })
      .catch((error) => {});
  };
};
