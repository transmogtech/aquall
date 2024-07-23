import axios from 'axios';

import { CREATE_SALT_PERCENTAGE, GET_SALT_PERCENTAGE, GET_SALT_PERCENTAGES, SALT_PERCENTAGE_ERROR, DELETE_SALT_PERCENTAGE, CHANGE_STATUS_SALT_PERCENTAGE, UPDATE_SALT_PERCENTAGE } from './types';
import { setAuthorization } from '../helpers/api_helper';
import { setAlert } from './alert';


export const createSaltPercentage = (formData) => async dispatch => {


  try {
    if (localStorage.getItem('token')) {
      setAuthorization(localStorage.getItem('token'));
    }

    const config = {
      headers: {
        'Content-Type': 'application/json',
      }
    };

    const response = await axios.post('/salt-percentages', formData, config);

    dispatch({
      type: CREATE_SALT_PERCENTAGE,
      payload: response.saltpercentage
    });

    dispatch(setAlert('Salt Percentage created successfully', 'success'));

  } catch (error) {
    console.log(error);
  }
}

export const getSaltPercentages = () => async dispatch => {

  if (localStorage.getItem('token')) {
    setAuthorization(localStorage.getItem('token'));
  }
  try {
    const res = await axios.get('/salt-percentages');
    dispatch({
      type: GET_SALT_PERCENTAGES,
      payload: res.saltpercentages
    });
  } catch (err) {
    dispatch({
      type: SALT_PERCENTAGE_ERROR
    });
  }
}


export const getSaltPercentage = (id) => async dispatch => {

  if (localStorage.getItem('token')) {
    setAuthorization(localStorage.getItem('token'));
  }
  try {
    const res = await axios.get(`/salt-percentages/${id}`);
    dispatch({
      type: GET_SALT_PERCENTAGE,
      payload: res
    });
    return res;
  } catch (err) {
    console.error(err);
    dispatch({
      type: SALT_PERCENTAGE_ERROR
    });
  }
}


export const deleteSaltPercentage = id => async dispatch => {

  if (localStorage.getItem('token')) {
    setAuthorization(localStorage.getItem('token'));
  }
  try {
    const res = await axios.delete(`/salt-percentages/${id}`);
    dispatch({
      type: DELETE_SALT_PERCENTAGE,
      payload: id
    });

    dispatch(setAlert('Salt Percentage deleted successfully', 'success'));
  } catch (err) {
    dispatch({
      type: SALT_PERCENTAGE_ERROR
    });
  }
}


export const changeStatusSaltPercentage = (id, status, comment) => async dispatch => {

  if (localStorage.getItem('token')) {
    setAuthorization(localStorage.getItem('token'));
  }

  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.post(`/salt-percentages/status/${id}`, { status: status, comment: comment }, config);
    dispatch({
      type: CHANGE_STATUS_SALT_PERCENTAGE,
      payload: res
    });

    dispatch(setAlert('Salt Percentage status changed successfully', 'success'));
  } catch (err) {
    dispatch({
      type: SALT_PERCENTAGE_ERROR
    });
  }
}


export const updateSaltPercentage = (id, formData) => async dispatch => {

  if (localStorage.getItem('token')) {
    setAuthorization(localStorage.getItem('token'));
  }

  const config = {
    headers: {
      'Content-Type': 'application/json',
    }
  };

  try {
    const res = await axios.patch(`/salt-percentages/${id}`, formData, config);
    dispatch({
      type: UPDATE_SALT_PERCENTAGE,
      payload: res
    });

    dispatch(setAlert('Salt Percentage updated successfully', 'success'));
  } catch (err) {
    dispatch({
      type: SALT_PERCENTAGE_ERROR
    });
  }
}
