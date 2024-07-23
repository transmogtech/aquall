import axios from 'axios';

import { CREATE_AREA, GET_AREA, GET_AREAS, AREA_ERROR, DELETE_AREA, CHANGE_STATUS_AREA, UPDATE_AREA } from './types';
import { setAuthorization } from '../helpers/api_helper';
import { setAlert } from './alert';


export const createArea = (formData) => async dispatch => {


  try {
    if (localStorage.getItem('token')) {
      setAuthorization(localStorage.getItem('token'));
    }

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const response = await axios.post('/areas', formData, config);

    dispatch({
      type: CREATE_AREA,
      payload: response.area
    });

    dispatch(setAlert('Area created successfully', 'success'));

  } catch (error) {
    console.log(error);
  }
}

export const getAreas = (formData) => async dispatch => {

  if (localStorage.getItem('token')) {
    setAuthorization(localStorage.getItem('token'));
  }
  try {
    const res = await axios.get('/areas', { params: formData });
    dispatch({
      type: GET_AREAS,
      payload: res.areas
    });
  } catch (err) {
    dispatch({
      type: AREA_ERROR
    });
  }
}


export const getArea = (id) => async dispatch => {

  if (localStorage.getItem('token')) {
    setAuthorization(localStorage.getItem('token'));
  }
  try {
    const res = await axios.get(`/areas/${id}`);
    dispatch({
      type: GET_AREA,
      payload: res
    });
    return res;
  } catch (err) {
    console.error(err);
    dispatch({
      type: AREA_ERROR
    });
  }
}


export const deleteArea = id => async dispatch => {

  if (localStorage.getItem('token')) {
    setAuthorization(localStorage.getItem('token'));
  }
  try {
    const res = await axios.delete(`/areas/${id}`);
    dispatch({
      type: DELETE_AREA,
      payload: id
    });

    dispatch(setAlert('Area deleted successfully', 'success'));
  } catch (err) {
    dispatch({
      type: AREA_ERROR
    });
  }
}


export const changeStatusArea = (id, status) => async dispatch => {

  if (localStorage.getItem('token')) {
    setAuthorization(localStorage.getItem('token'));
  }

  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.post(`/areas/status/${id}`, { status: status }, config);
    dispatch({
      type: CHANGE_STATUS_AREA,
      payload: res
    });

    dispatch(setAlert('Area status changed successfully', 'success'));
  } catch (err) {
    dispatch({
      type: AREA_ERROR
    });
  }
}


export const updateArea = (id, formData) => async dispatch => {

  if (localStorage.getItem('token')) {
    setAuthorization(localStorage.getItem('token'));
  }

  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.patch(`/areas/${id}`, formData, config);
    dispatch({
      type: UPDATE_AREA,
      payload: res
    });

    dispatch(setAlert('Area updated successfully', 'success'));
  } catch (err) {
    dispatch({
      type: AREA_ERROR
    });
  }
}
