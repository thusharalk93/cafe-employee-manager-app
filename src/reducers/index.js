import { combineReducers } from 'redux';
import cafesReducer from './cafesReducer';
import employeesReducer from './employeesReducer';

const rootReducer = combineReducers({
  cafes: cafesReducer,
  employees: employeesReducer,
});

export default rootReducer;
