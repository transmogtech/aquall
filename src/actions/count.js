import axios from 'axios';

import { CREATE_COUNT, GET_COUNT, GET_COUNTS, COUNT_ERROR, DELETE_COUNT, CHANGE_STATUS_COUNT, UPDATE_COUNT } from './types';
import { setAuthorization } from '../helpers/api_helper';
import { setAlert } from './alert';


export const createCount = (formData) => async dispatch => {


  try {
    if (localStorage.getItem('token')) {
      setAuthorization(localStorage.getItem('token'));
    }

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const response = await axios.post('/counts', formData, config);

    dispatch({
      type: CREATE_COUNT,
      payload: response.count
    });

    dispatch(setAlert('Count created successfully', 'success'));

  } catch (error) {
    console.log(error);
  }
}

export const getCounts = () => async dispatch => {

  if (localStorage.getItem('token')) {
    setAuthorization(localStorage.getItem('token'));
  }
  try {
    const res = await axios.get('/counts');
    dispatch({
      type: GET_COUNTS,
      payload: res.counts
    });
  } catch (err) {
    dispatch({
      type: COUNT_ERROR
    });
  }
}


export const getCount = (id) => async dispatch => {

  if (localStorage.getItem('token')) {
    setAuthorization(localStorage.getItem('token'));
  }
  try {
    const res = await axios.get(`/counts/${id}`);
    dispatch({
      type: GET_COUNT,
      payload: res
    });
    return res;
  } catch (err) {
    console.error(err);
    dispatch({
      type: COUNT_ERROR
    });
  }
}


export const deleteCount = id => async dispatch => {

  if (localStorage.getItem('token')) {
    setAuthorization(localStorage.getItem('token'));
  }
  try {
    const res = await axios.delete(`/counts/${id}`);
    dispatch({
      type: DELETE_COUNT,
      payload: id
    });

    dispatch(setAlert('Count deleted successfully', 'success'));
  } catch (err) {
    dispatch({
      type: COUNT_ERROR
    });
  }
}


export const changeStatusCount = (id, status) => async dispatch => {

  if (localStorage.getItem('token')) {
    setAuthorization(localStorage.getItem('token'));
  }

  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.post(`/counts/status/${id}`, { status: status }, config);
    dispatch({
      type: CHANGE_STATUS_COUNT,
      payload: res
    });

    dispatch(setAlert('Count status changed successfully', 'success'));
  } catch (err) {
    dispatch({
      type: COUNT_ERROR
    });
  }
}


export const updateCount = (id, formData) => async dispatch => {

  if (localStorage.getItem('token')) {
    setAuthorization(localStorage.getItem('token'));
  }

  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.patch(`/counts/${id}`, formData, config);
    dispatch({
      type: UPDATE_COUNT,
      payload: res
    });

    dispatch(setAlert('Count updated successfully', 'success'));
  } catch (err) {
    dispatch({
      type: COUNT_ERROR
    });
  }
}
