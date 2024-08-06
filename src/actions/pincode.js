import axios from 'axios';

import { CREATE_PINCODE, GET_PINCODE, GET_PINCODES, PINCODE_ERROR, DELETE_PINCODE, CHANGE_STATUS_PINCODE, UPDATE_PINCODE } from './types';
import { setAuthorization } from '../helpers/api_helper';
import { setAlert } from './alert';


export const createPincode = (formData) => async dispatch => {


  try {
    if (localStorage.getItem('token')) {
      setAuthorization(localStorage.getItem('token'));
    }

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const response = await axios.post('/pincodes', formData, config);

    dispatch({
      type: CREATE_PINCODE,
      payload: response.pincode
    });

    dispatch(setAlert('Pincode created successfully', 'success'));

  } catch (error) {
    console.log(error);
  }
}

export const getPincodes = (formData) => async dispatch => {

  if (localStorage.getItem('token')) {
    setAuthorization(localStorage.getItem('token'));
  }
  try {
    const res = await axios.get('/pincodes', { params: formData });
    dispatch({
      type: GET_PINCODES,
      payload: res.pincodes
    });
  } catch (err) {
    dispatch({
      type: PINCODE_ERROR
    });
  }
}


export const getPincode = (id) => async dispatch => {

  if (localStorage.getItem('token')) {
    setAuthorization(localStorage.getItem('token'));
  }
  try {
    const res = await axios.get(`/pincodes/${id}`);
    dispatch({
      type: GET_PINCODE,
      payload: res
    });
    return res;
  } catch (err) {
    console.error(err);
    dispatch({
      type: PINCODE_ERROR
    });
  }
}


export const deletePincode = id => async dispatch => {

  if (localStorage.getItem('token')) {
    setAuthorization(localStorage.getItem('token'));
  }
  try {
    const res = await axios.delete(`/pincodes/${id}`);
    dispatch({
      type: DELETE_PINCODE,
      payload: id
    });

    dispatch(setAlert('Pincode deleted successfully', 'success'));
  } catch (err) {
    dispatch({
      type: PINCODE_ERROR
    });
  }
}


export const changeStatusPincode = (id, status) => async dispatch => {

  if (localStorage.getItem('token')) {
    setAuthorization(localStorage.getItem('token'));
  }

  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.post(`/pincodes/status/${id}`, { status: status }, config);
    dispatch({
      type: CHANGE_STATUS_PINCODE,
      payload: res
    });

    dispatch(setAlert('Pincode status changed successfully', 'success'));
  } catch (err) {
    dispatch({
      type: PINCODE_ERROR
    });
  }
}


export const updatePincode = (id, formData) => async dispatch => {

  if (localStorage.getItem('token')) {
    setAuthorization(localStorage.getItem('token'));
  }

  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.patch(`/pincodes/${id}`, formData, config);
    dispatch({
      type: UPDATE_PINCODE,
      payload: res
    });

    dispatch(setAlert('Pincode updated successfully', 'success'));
  } catch (err) {
    dispatch({
      type: PINCODE_ERROR
    });
  }
}
