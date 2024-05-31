import axios from 'axios';

import { CREATE_COUNT_TYPE, GET_COUNT_TYPE, GET_COUNT_TYPES, COUNT_TYPE_ERROR, DELETE_COUNT_TYPE, CHANGE_STATUS_COUNT_TYPE, UPDATE_COUNT_TYPE } from './types';
import { setAuthorization } from '../helpers/api_helper';
import { setAlert } from './alert';


export const createCountType = (formData) => async dispatch => {


  try {
    if(localStorage.getItem('token')){
      setAuthorization(localStorage.getItem('token'));
    }

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const response = await axios.post('/count-types', formData, config);

    dispatch({
      type: CREATE_COUNT_TYPE,
      payload: response.counttype
    });

    dispatch(setAlert('Count Type created successfully', 'success'));

  } catch (error) {
    console.log(error);
  }
}

  export const getCountTypes =  () => async dispatch => {

    if(localStorage.getItem('token')){
      setAuthorization(localStorage.getItem('token'));
    }
    try {
      const res = await axios.get('/count-types');
      dispatch({
        type: GET_COUNT_TYPES,
        payload: res.counttypes
      });
    } catch (err) {
      dispatch({
        type: COUNT_TYPE_ERROR
      });
    }
  }

  
  export const getCountType =  (id) => async dispatch => {

    if(localStorage.getItem('token')){
      setAuthorization(localStorage.getItem('token'));
    }
    try {
      const res = await axios.get(`/count-types/${id}`);
      dispatch({
        type: GET_COUNT_TYPE,
        payload: res
      });
    } catch (err) {
      console.error(err);
      dispatch({
        type: COUNT_TYPE_ERROR
      });
    }
  }

  
  export const deleteCountType =  id => async dispatch => {

    if(localStorage.getItem('token')){
      setAuthorization(localStorage.getItem('token'));
    }
    try {
      const res = await axios.delete(`/count-types/${id}`);
      dispatch({
        type: DELETE_COUNT_TYPE,
        payload: id
      });

      dispatch(setAlert('Count Type deleted successfully','success'));
    } catch (err) {
      dispatch({
        type: COUNT_TYPE_ERROR
      });
    }
  }

  
  export const changeStatusCountType =  (id, status, comment) => async dispatch => {

    if(localStorage.getItem('token')){
      setAuthorization(localStorage.getItem('token'));
    }

    const config = {
      headers: {
        'Content-Type': 'application/json'
       }
    };

    try {
      const res = await axios.post(`/count-types/status/${id}`, { status: status, comment: comment}, config);
      dispatch({
        type: CHANGE_STATUS_COUNT_TYPE,
        payload: res
      });

      dispatch(setAlert('Count Type status changed successfully','success'));
    } catch (err) {
      dispatch({
        type: COUNT_TYPE_ERROR
      });
    }
  }

  
  export const updateCountType =  (id, formData) => async dispatch => {

    if(localStorage.getItem('token')){
      setAuthorization(localStorage.getItem('token'));
    }

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.patch(`/count-types/${id}`, formData, config);
      dispatch({
        type: UPDATE_COUNT_TYPE,
        payload: res
      });

      dispatch(setAlert('Count Type updated successfully','success'));
    } catch (err) {
      dispatch({
        type: COUNT_TYPE_ERROR
      });
    }
  }
