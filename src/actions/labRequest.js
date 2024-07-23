import axios from 'axios';

import { CREATE_LAB_REQUEST, GET_LAB_REQUEST, GET_LAB_REQUESTS, LAB_REQUEST_ERROR, DELETE_LAB_REQUEST, CHANGE_STATUS_LAB_REQUEST, UPDATE_LAB_REQUEST } from './types';
import { setAuthorization } from '../helpers/api_helper';
import { setAlert } from './alert';


export const createLabRequest = (formData) => async dispatch => {


  try {
    if (localStorage.getItem('token')) {
      setAuthorization(localStorage.getItem('token'));
    }

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    };

    const response = await axios.post('/lab-requests', formData, config);

    dispatch({
      type: CREATE_LAB_REQUEST,
      payload: response.labrequest
    });

    dispatch(setAlert('Lab Request created successfully', 'success'));

  } catch (error) {
    console.log(error);
  }
}

export const getLabRequests = () => async dispatch => {

  if (localStorage.getItem('token')) {
    setAuthorization(localStorage.getItem('token'));
  }
  try {
    const res = await axios.get('/lab-requests');
    dispatch({
      type: GET_LAB_REQUESTS,
      payload: res.labrequests
    });
  } catch (err) {
    dispatch({
      type: LAB_REQUEST_ERROR
    });
  }
}


export const getLabRequest = (id) => async dispatch => {

  if (localStorage.getItem('token')) {
    setAuthorization(localStorage.getItem('token'));
  }
  try {
    const res = await axios.get(`/lab-requests/${id}`);
    dispatch({
      type: GET_LAB_REQUEST,
      payload: res
    });
    return res;
  } catch (err) {
    console.error(err);
    dispatch({
      type: LAB_REQUEST_ERROR
    });
  }
}


export const deleteLabRequest = id => async dispatch => {

  if (localStorage.getItem('token')) {
    setAuthorization(localStorage.getItem('token'));
  }
  try {
    const res = await axios.delete(`/lab-requests/${id}`);
    dispatch({
      type: DELETE_LAB_REQUEST,
      payload: id
    });

    dispatch(setAlert('Lab Request deleted successfully', 'success'));
  } catch (err) {
    dispatch({
      type: LAB_REQUEST_ERROR
    });
  }
}


export const changeStatusLabRequest = (id, status, comment) => async dispatch => {

  if (localStorage.getItem('token')) {
    setAuthorization(localStorage.getItem('token'));
  }

  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.post(`/lab-requests/status/${id}`, { status: status, comment: comment }, config);
    dispatch({
      type: CHANGE_STATUS_LAB_REQUEST,
      payload: res
    });

    dispatch(setAlert('Lab Request status changed successfully', 'success'));
  } catch (err) {
    dispatch({
      type: LAB_REQUEST_ERROR
    });
  }
}


export const updateLabRequest = (id, formData) => async dispatch => {

  if (localStorage.getItem('token')) {
    setAuthorization(localStorage.getItem('token'));
  }

  const config = {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  };

  try {
    const res = await axios.patch(`/lab-requests/${id}`, formData, config);
    dispatch({
      type: UPDATE_LAB_REQUEST,
      payload: res
    });

    dispatch(setAlert('Lab Request updated successfully', 'success'));
  } catch (err) {
    dispatch({
      type: LAB_REQUEST_ERROR
    });
  }
}
