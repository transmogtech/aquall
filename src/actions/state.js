import axios from 'axios';

import { CREATE_STATE, GET_STATE, GET_STATES, STATE_ERROR, DELETE_STATE, CHANGE_STATUS_STATE, UPDATE_STATE } from './types';
import { setAuthorization } from '../helpers/api_helper';
import { setAlert } from './alert';


export const createState = (formData) => async dispatch => {


  try {
    if (localStorage.getItem('token')) {
      setAuthorization(localStorage.getItem('token'));
    }

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const response = await axios.post('/states', formData, config);

    dispatch({
      type: CREATE_STATE,
      payload: response.state
    });

    dispatch(setAlert('State created successfully', 'success'));

  } catch (error) {
    console.log(error);
  }
}

export const getStates = () => async dispatch => {

  if (localStorage.getItem('token')) {
    setAuthorization(localStorage.getItem('token'));
  }
  try {
    const res = await axios.get('/states');
    dispatch({
      type: GET_STATES,
      payload: res.states
    });
  } catch (err) {
    dispatch({
      type: STATE_ERROR
    });
  }
}


export const getState = (id) => async dispatch => {

  if (localStorage.getItem('token')) {
    setAuthorization(localStorage.getItem('token'));
  }
  try {
    const res = await axios.get(`/states/${id}`);
    dispatch({
      type: GET_STATE,
      payload: res
    });
    return res;
  } catch (err) {
    console.error(err);
    dispatch({
      type: STATE_ERROR
    });
  }
}


export const deleteState = id => async dispatch => {

  if (localStorage.getItem('token')) {
    setAuthorization(localStorage.getItem('token'));
  }
  try {
    const res = await axios.delete(`/states/${id}`);
    dispatch({
      type: DELETE_STATE,
      payload: id
    });

    dispatch(setAlert('State deleted successfully', 'success'));
  } catch (err) {
    dispatch({
      type: STATE_ERROR
    });
  }
}


export const changeStatusState = (id, status) => async dispatch => {

  if (localStorage.getItem('token')) {
    setAuthorization(localStorage.getItem('token'));
  }

  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.post(`/states/status/${id}`, { status: status }, config);
    dispatch({
      type: CHANGE_STATUS_STATE,
      payload: res
    });

    dispatch(setAlert('State status changed successfully', 'success'));
  } catch (err) {
    dispatch({
      type: STATE_ERROR
    });
  }
}


export const updateState = (id, formData) => async dispatch => {

  if (localStorage.getItem('token')) {
    setAuthorization(localStorage.getItem('token'));
  }

  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.patch(`/states/${id}`, formData, config);
    dispatch({
      type: UPDATE_STATE,
      payload: res
    });

    dispatch(setAlert('State updated successfully', 'success'));
  } catch (err) {
    dispatch({
      type: STATE_ERROR
    });
  }
}
