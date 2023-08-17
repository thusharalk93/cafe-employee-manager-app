import * as actionTypes from '../actions/actionTypes';

const initialState = {
  cafes: [],
  loading: false,
};

const cafesReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_CAFES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.FETCH_CAFES_SUCCESS:
      return {
        ...state,
        cafes: action.cafes,
        loading: false,
      };
    case actionTypes.FETCH_CAFES_FAILURE:
      return {
        ...state,
        loading: false,
      };
    case actionTypes.ADD_CAFE_SUCCESS:
      return {
        ...state,
        cafes: [...state.cafes, action.cafes],
      };
    case actionTypes.EDIT_CAFE_SUCCESS:

    const updatedCafes = state.cafes.map((cafe) =>
        cafe._id === action.cafe._id ? action.cafe : cafe
      );
      return {
        ...state,
        cafes: updatedCafes,
      };
    case actionTypes.DELETE_CAFE_SUCCESS:
      const filteredCafes = state.cafes.filter((cafe) => cafe._id !== action.id);
      return {
        ...state,
        cafes: filteredCafes,
      };
    default:
      return state;
  }
};

export default cafesReducer;
