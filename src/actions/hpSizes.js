import axios from 'axios';

import { CREATE_HP_SIZE, GET_HP_SIZE, GET_HP_SIZES, HP_SIZE_ERROR, DELETE_HP_SIZE, CHANGE_STATUS_HP_SIZE, UPDATE_HP_SIZE } from './types';
import { setAuthorization } from '../helpers/api_helper';
import { setAlert } from './alert';


export const createHPSize = (title) => async dispatch => {


  try {
    if (localStorage.getItem('token')) {
      setAuthorization(localStorage.getItem('token'));
    }

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const response = await axios.post('/hp-sizes', { "title": title }, config);

    dispatch({
      type: CREATE_HP_SIZE,
      payload: response.hpsize
    });

    dispatch(setAlert('HP Size created successfully', 'success'));

  } catch (error) {
    console.log(error);
  }
}

export const getHPSizes = () => async dispatch => {

  if (localStorage.getItem('token')) {
    setAuthorization(localStorage.getItem('token'));
  }
  try {
    const res = await axios.get('/hp-sizes');
    dispatch({
      type: GET_HP_SIZES,
      payload: res.hpsizes
    });
  } catch (err) {
    dispatch({
      type: HP_SIZE_ERROR
    });
  }
}


export const getHPSize = (id) => async dispatch => {

  if (localStorage.getItem('token')) {
    setAuthorization(localStorage.getItem('token'));
  }
  try {
    const res = await axios.get(`/hp-sizes/${id}`);
    dispatch({
      type: GET_HP_SIZE,
      payload: res
    });
    return res;
  } catch (err) {
    console.error(err);
    dispatch({
      type: HP_SIZE_ERROR
    });
  }
}


export const deleteHPSize = id => async dispatch => {

  if (localStorage.getItem('token')) {
    setAuthorization(localStorage.getItem('token'));
  }
  try {
    const res = await axios.delete(`/hp-sizes/${id}`);
    dispatch({
      type: DELETE_HP_SIZE,
      payload: id
    });

    dispatch(setAlert('HP Size deleted successfully', 'success'));
  } catch (err) {
    dispatch({
      type: HP_SIZE_ERROR
    });
  }
}


export const changeStatusHPSize = (id, status) => async dispatch => {

  if (localStorage.getItem('token')) {
    setAuthorization(localStorage.getItem('token'));
  }

  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.post(`/hp-sizes/status/${id}`, { status: status }, config);
    dispatch({
      type: CHANGE_STATUS_HP_SIZE,
      payload: res
    });

    dispatch(setAlert('HP Size status changed successfully', 'success'));
  } catch (err) {
    dispatch({
      type: HP_SIZE_ERROR
    });
  }
}


export const updateHPSize = (id, title) => async dispatch => {

  if (localStorage.getItem('token')) {
    setAuthorization(localStorage.getItem('token'));
  }

  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.patch(`/hp-sizes/${id}`, { "title": title }, config);
    dispatch({
      type: UPDATE_HP_SIZE,
      payload: res
    });

    dispatch(setAlert('HP Size updated successfully', 'success'));
  } catch (err) {
    dispatch({
      type: HP_SIZE_ERROR
    });
  }
}
