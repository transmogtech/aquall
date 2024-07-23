import axios from 'axios';

import { CREATE_DISTRICT, GET_DISTRICT, GET_DISTRICTS, DISTRICT_ERROR, DELETE_DISTRICT, CHANGE_STATUS_DISTRICT, UPDATE_DISTRICT } from './types';
import { setAuthorization } from '../helpers/api_helper';
import { setAlert } from './alert';


export const createDistrict = (formData) => async dispatch => {


  try {
    if (localStorage.getItem('token')) {
      setAuthorization(localStorage.getItem('token'));
    }

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const response = await axios.post('/districts', formData, config);

    dispatch({
      type: CREATE_DISTRICT,
      payload: response.district
    });

    dispatch(setAlert('District created successfully', 'success'));

  } catch (error) {
    console.log(error);
  }
}

export const getDistricts = (formData) => async dispatch => {

  if (localStorage.getItem('token')) {
    setAuthorization(localStorage.getItem('token'));
  }
  try {
    const res = await axios.get('/districts', { params: formData });
    dispatch({
      type: GET_DISTRICTS,
      payload: res.districts
    });
  } catch (err) {
    dispatch({
      type: DISTRICT_ERROR
    });
  }
}


export const getDistrict = (id) => async dispatch => {

  if (localStorage.getItem('token')) {
    setAuthorization(localStorage.getItem('token'));
  }
  try {
    const res = await axios.get(`/districts/${id}`);
    dispatch({
      type: GET_DISTRICT,
      payload: res
    });
    return res;
  } catch (err) {
    console.error(err);
    dispatch({
      type: DISTRICT_ERROR
    });
  }
}


export const deleteDistrict = id => async dispatch => {

  if (localStorage.getItem('token')) {
    setAuthorization(localStorage.getItem('token'));
  }
  try {
    const res = await axios.delete(`/districts/${id}`);
    dispatch({
      type: DELETE_DISTRICT,
      payload: id
    });

    dispatch(setAlert('District deleted successfully', 'success'));
  } catch (err) {
    dispatch({
      type: DISTRICT_ERROR
    });
  }
}


export const changeStatusDistrict = (id, status) => async dispatch => {

  if (localStorage.getItem('token')) {
    setAuthorization(localStorage.getItem('token'));
  }

  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.post(`/districts/status/${id}`, { status: status }, config);
    dispatch({
      type: CHANGE_STATUS_DISTRICT,
      payload: res
    });

    dispatch(setAlert('District status changed successfully', 'success'));
  } catch (err) {
    dispatch({
      type: DISTRICT_ERROR
    });
  }
}


export const updateDistrict = (id, formData) => async dispatch => {

  if (localStorage.getItem('token')) {
    setAuthorization(localStorage.getItem('token'));
  }

  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.patch(`/districts/${id}`, formData, config);
    dispatch({
      type: UPDATE_DISTRICT,
      payload: res
    });

    dispatch(setAlert('District updated successfully', 'success'));
  } catch (err) {
    dispatch({
      type: DISTRICT_ERROR
    });
  }
}
