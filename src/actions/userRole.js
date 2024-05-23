import axios from 'axios';

import { CREATE_USER_ROLE, GET_USER_ROLES, GET_USER_ROLE, USER_ROLE_ERROR, DELETE_USER_ROLE, CHANGE_STATUS_USER_ROLE, UPDATE_USER_ROLE } from './types';
import { setAuthorization } from '../helpers/api_helper';
import { setAlert } from './alert';


export const createUserRole = (formData) => async dispatch => {


  try {
    if(localStorage.getItem('token')){
      setAuthorization(localStorage.getItem('token'));
    }

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const response = await axios.post('/user-roles', formData, config);

    dispatch({
      type: CREATE_USER_ROLE,
      payload: response.userrole
    });

    dispatch(setAlert('User Role created successfully', 'success'));

  } catch (error) {
    console.log(error);
  }
}

  export const getUserRoles =  () => async dispatch => {

    if(localStorage.getItem('token')){
      setAuthorization(localStorage.getItem('token'));
    }
    try {
      const res = await axios.get('/user-roles');
      dispatch({
        type: GET_USER_ROLES,
        payload: res.userroles
      });
    } catch (err) {
      dispatch({
        type: USER_ROLE_ERROR
      });
    }
  }

  
  export const getUserRole =  (id) => async dispatch => {

    if(localStorage.getItem('token')){
      setAuthorization(localStorage.getItem('token'));
    }
    try {
      const res = await axios.get(`/user-roles/${id}`);
      dispatch({
        type: GET_USER_ROLE,
        payload: res
      });
    } catch (err) {
      console.error(err);
      dispatch({
        type: USER_ROLE_ERROR
      });
    }
  }

  
  export const deleteUserRole =  id => async dispatch => {

    if(localStorage.getItem('token')){
      setAuthorization(localStorage.getItem('token'));
    }
    try {
      const res = await axios.delete(`/user-roles/${id}`);
      dispatch({
        type: DELETE_USER_ROLE,
        payload: id
      });

      dispatch(setAlert('User Role deleted successfully','success'));
    } catch (err) {
      dispatch({
        type: USER_ROLE_ERROR
      });
    }
  }

  
  export const changeStatusUserRole =  (id, status) => async dispatch => {

    if(localStorage.getItem('token')){
      setAuthorization(localStorage.getItem('token'));
    }

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.post(`/user-roles/status/${id}`, { status: status}, config);
      dispatch({
        type: CHANGE_STATUS_USER_ROLE,
        payload: res
      });

      dispatch(setAlert('User Role status changed successfully','success'));
    } catch (err) {
      dispatch({
        type: USER_ROLE_ERROR
      });
    }
  }

  
  export const updateUserRole =  (id, formData) => async dispatch => {

    if(localStorage.getItem('token')){
      setAuthorization(localStorage.getItem('token'));
    }

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.patch(`/user-roles/${id}`, formData, config);
      dispatch({
        type: UPDATE_USER_ROLE,
        payload: res
      });

      dispatch(setAlert('User Role updated successfully','success'));
    } catch (err) {
      dispatch({
        type: USER_ROLE_ERROR
      });
    }
  }
