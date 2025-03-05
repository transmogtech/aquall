import axios from 'axios';

import { CREATE_USER, GET_USER, GET_USERS, USER_ERROR, DELETE_USER, CHANGE_STATUS_USER, UPDATE_USER } from './types';
import { setAuthorization } from '../helpers/api_helper';
import { setAlert } from './alert';


export const createUser = (formData) => async dispatch => {


  try {
    if (localStorage.getItem('token')) {
      setAuthorization(localStorage.getItem('token'));
    }

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const response = await axios.post('/user/signup', formData, config);

    dispatch({
      type: CREATE_USER,
      payload: response.user
    });

    dispatch(setAlert('User created successfully', 'success'));

  } catch (error) {
    console.log(error);
    dispatch(setAlert(error, 'error'));
  }
}

export const getUsers = () => async dispatch => {

  if (localStorage.getItem('token')) {
    setAuthorization(localStorage.getItem('token'));
  }
  try {
    const res = await axios.get('/user');
    dispatch({
      type: GET_USERS,
      payload: res.users
    });
  } catch (err) {
    dispatch({
      type: USER_ERROR
    });
  }
}


export const getUser = (id) => async dispatch => {

  if (localStorage.getItem('token')) {
    setAuthorization(localStorage.getItem('token'));
  }
  try {
    const res = await axios.get(`/user/${id}`);
    return res;
  } catch (err) {
    console.error(err);
    dispatch({
      type: USER_ERROR
    });
  }
}


export const loadUser = () => async dispatch => {

  if (localStorage.getItem('token')) {
    setAuthorization(localStorage.getItem('token'));
  }
  try {
    const res = await axios.get(`/user/auth`);
    return res;
  } catch (err) {
    console.error(err);
    dispatch({
      type: USER_ERROR
    });
  }
}


export const deleteUser = id => async dispatch => {

  if (localStorage.getItem('token')) {
    setAuthorization(localStorage.getItem('token'));
  }
  try {
    const res = await axios.delete(`/user/${id}`);
    dispatch({
      type: DELETE_USER,
      payload: id
    });

    dispatch(setAlert('User deleted successfully', 'success'));
  } catch (err) {
    dispatch({
      type: USER_ERROR
    });
  }
}


export const changeStatusUser = (id, status) => async dispatch => {

  if (localStorage.getItem('token')) {
    setAuthorization(localStorage.getItem('token'));
  }

  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.post(`/user/status/${id}`, { status: status }, config);
    dispatch({
      type: CHANGE_STATUS_USER,
      payload: res
    });

    dispatch(setAlert('User status changed successfully', 'success'));
  } catch (err) {
    dispatch({
      type: USER_ERROR
    });
  }
}


export const updateUser = (id, formData) => async dispatch => {

  if (localStorage.getItem('token')) {
    setAuthorization(localStorage.getItem('token'));
  }

  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.patch(`/user/${id}`, formData, config);
    dispatch({
      type: UPDATE_USER,
      payload: res
    });

    dispatch(setAlert('User updated successfully', 'success'));
  } catch (err) {
    dispatch({
      type: USER_ERROR
    });
  }
}
