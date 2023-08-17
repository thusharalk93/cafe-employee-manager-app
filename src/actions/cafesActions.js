import * as actionTypes from './actionTypes';
import api from '../api/api';

export const fetchCafesStart = () => ({
  type: actionTypes.FETCH_CAFES_REQUEST,
});

export const fetchCafesSuccess = (cafes) => ({
  type: actionTypes.FETCH_CAFES_SUCCESS,
  cafes,
});

export const fetchCafesFail = () => ({
  type: actionTypes.FETCH_CAFES_FAILURE,
});

export const addCafeSuccess = (cafe) => ({
  type: actionTypes.ADD_CAFE_SUCCESS,
  cafe,
});

export const addCafeFail = () => ({
    type: actionTypes.ADD_CAFE_FAILURE,
});

export const editCafeSuccess = (cafe) => ({
  type: actionTypes.EDIT_CAFE_SUCCESS,
  cafe,
});

export const editCafeFail = () => ({
    type: actionTypes.EDIT_CAFE_FAILURE,
});

export const deleteCafeSuccess = (id) => ({
  type: actionTypes.DELETE_CAFE_SUCCESS,
  id,
});

export const deleteCafeFail = (id) => ({
    type: actionTypes.DELETE_CAFE_FAILURE,
    id,
});

// Thunk action to fetch cafes
export const fetchCafes = () => {
  return (dispatch) => {
    dispatch(fetchCafesStart());

    api.get('/cafes')
      .then((response) => {
        dispatch(fetchCafesSuccess(response.data));
      })
      .catch((error) => {
        dispatch(fetchCafesFail(error.message));
      });
  };
};

// Thunk action to add a new cafe
export const addCafe = (cafeData, callback) => {
  return (dispatch) => {
    api.post('/cafes', cafeData)
      .then((response) => {
        dispatch(addCafeSuccess(response.data));
        callback();
      })
      .catch((error) => {
        dispatch(addCafeFail(error.message));
      });
  };
};

// Thunk action to edit an existing cafe
export const editCafe = (id, cafeData, callback) => {
  return (dispatch) => {
    api.put(`/cafes/${id}`, cafeData, {
        headers: {
            'X-HTTP-Method-Override': 'PUT'
        }
    })
      .then((response) => {
        dispatch(editCafeSuccess(response.data));
        callback();
      })
      .catch((error) => {
        dispatch(editCafeFail(error.message));
      });
  };
};

// Thunk action to delete a cafe
export const deleteCafe = (id, callback) => {
  return (dispatch) => {
    api.delete(`/cafes/${id}`)
      .then(() => {
        dispatch(deleteCafeSuccess(id));
        callback(); 
      })
      .catch((error) => {
        dispatch(deleteCafeFail(error.message));
      });
  };
};
