import axios from 'axios';

import { LOGIN_SUCCESS, LOGIN_FAIL, AUTH_ERROR, USER_LOADED, LOGOUT } from "../actions/types";
import { setAlert } from './alert';
import { setAuthorization } from '../helpers/api_helper';


// Load User

export const loadUser = () => async dispatch => {

  if (localStorage.getItem('token')) {
    setAuthorization(localStorage.getItem('token'));
  }
  try {
    const res = await axios.get('/user/auth');

    dispatch({
      type: USER_LOADED,
      payload: res
    });
    return res;
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};
// Login

export const login = (email, password) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post('/user/login', body, config);
    // console.log(res);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res
    });

    dispatch(loadUser());
  } catch (err) {
    // if(errors) {
    dispatch(setAlert("Invalid credentials", "danger"));
    // }
    dispatch({
      type: LOGIN_FAIL
    });
  }
};

export const logout = () => dispatch => {
  dispatch({ type: LOGOUT });
}