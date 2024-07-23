import axios from 'axios';

import { CREATE_PEDDLER_TYPE, GET_PEDDLER_TYPE, GET_PEDDLER_TYPES, PEDDLER_TYPE_ERROR, DELETE_PEDDLER_TYPE, CHANGE_STATUS_PEDDLER_TYPE, UPDATE_PEDDLER_TYPE } from './types';
import { setAuthorization } from '../helpers/api_helper';
import { setAlert } from './alert';


export const createPeddlerType = (formData) => async dispatch => {


  try {
    if (localStorage.getItem('token')) {
      setAuthorization(localStorage.getItem('token'));
    }

    const config = {
      headers: {
        'Content-Type': 'application/json',
      }
    };

    const response = await axios.post('/peddler-types', formData, config);

    dispatch({
      type: CREATE_PEDDLER_TYPE,
      payload: response.peddlertype
    });

    dispatch(setAlert('Peddler Type created successfully', 'success'));

  } catch (error) {
    console.log(error);
  }
}

export const getPeddlerTypes = () => async dispatch => {

  if (localStorage.getItem('token')) {
    setAuthorization(localStorage.getItem('token'));
  }
  try {
    const res = await axios.get('/peddler-types');
    dispatch({
      type: GET_PEDDLER_TYPES,
      payload: res.peddlertypes
    });
  } catch (err) {
    dispatch({
      type: PEDDLER_TYPE_ERROR
    });
  }
}


export const getPeddlerType = (id) => async dispatch => {

  if (localStorage.getItem('token')) {
    setAuthorization(localStorage.getItem('token'));
  }
  try {
    const res = await axios.get(`/peddler-types/${id}`);
    dispatch({
      type: GET_PEDDLER_TYPE,
      payload: res
    });
    return res;
  } catch (err) {
    console.error(err);
    dispatch({
      type: PEDDLER_TYPE_ERROR
    });
  }
}


export const deletePeddlerType = id => async dispatch => {

  if (localStorage.getItem('token')) {
    setAuthorization(localStorage.getItem('token'));
  }
  try {
    const res = await axios.delete(`/peddler-types/${id}`);
    dispatch({
      type: DELETE_PEDDLER_TYPE,
      payload: id
    });

    dispatch(setAlert('Peddler Type deleted successfully', 'success'));
  } catch (err) {
    dispatch({
      type: PEDDLER_TYPE_ERROR
    });
  }
}


export const changeStatusPeddlerType = (id, status, comment) => async dispatch => {

  if (localStorage.getItem('token')) {
    setAuthorization(localStorage.getItem('token'));
  }

  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.post(`/peddler-types/status/${id}`, { status: status, comment: comment }, config);
    dispatch({
      type: CHANGE_STATUS_PEDDLER_TYPE,
      payload: res
    });

    dispatch(setAlert('Peddler Type status changed successfully', 'success'));
  } catch (err) {
    dispatch({
      type: PEDDLER_TYPE_ERROR
    });
  }
}


export const updatePeddlerType = (id, formData) => async dispatch => {

  if (localStorage.getItem('token')) {
    setAuthorization(localStorage.getItem('token'));
  }

  const config = {
    headers: {
      'Content-Type': 'application/json',
    }
  };

  try {
    const res = await axios.patch(`/peddler-types/${id}`, formData, config);
    dispatch({
      type: UPDATE_PEDDLER_TYPE,
      payload: res
    });

    dispatch(setAlert('Peddler Type updated successfully', 'success'));
  } catch (err) {
    dispatch({
      type: PEDDLER_TYPE_ERROR
    });
  }
}
