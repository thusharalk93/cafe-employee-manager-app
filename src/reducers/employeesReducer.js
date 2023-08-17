import * as actionTypes from '../actions/actionTypes';

const initialState = {
  employees: [],
  loading: false,
  error: false,
};

const employeesReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_EMPLOYEES_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case actionTypes.FETCH_EMPLOYEES_SUCCESS:
      return {
        ...state,
        employees: action.employees,
        loading: false,
        error: false,
      };
    case actionTypes.FETCH_EMPLOYEES_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
      };
    case actionTypes.ADD_EMPLOYEE_SUCCESS:
      return {
        ...state,
        employees: [...state.employees, action.employee],
      };
    case actionTypes.EDIT_EMPLOYEE_SUCCESS:
      const updatedEmployees = state.employees.map((employee) =>
        employee.id === action.employee.id ? action.employee : employee
      );
      return {
        ...state,
        employees: updatedEmployees,
      };
    case actionTypes.DELETE_EMPLOYEE_SUCCESS:
      const filteredEmployees = state.employees.filter(
        (employee) => employee.id !== action.id
      );
      return {
        ...state,
        employees: filteredEmployees,
      };
    default:
      return state;
  }
};

export default employeesReducer;
