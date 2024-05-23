import axios from 'axios';

import { CREATE_CULTURE_TYPE, GET_CULTURE_TYPE, GET_CULTURE_TYPES, CULTURE_TYPE_ERROR, DELETE_CULTURE_TYPE, CHANGE_STATUS_CULTURE_TYPE, UPDATE_CULTURE_TYPE } from './types';
import { setAuthorization } from '../helpers/api_helper';
import { setAlert } from './alert';


export const createCultureType = (title) => async dispatch => {


  try {
    if(localStorage.getItem('token')){
      setAuthorization(localStorage.getItem('token'));
    }

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const response = await axios.post('/culture-types', {"title": title}, config);

    dispatch({
      type: CREATE_CULTURE_TYPE,
      payload: response.culturetype
    });

    dispatch(setAlert('Culture Type created successfully', 'success'));

  } catch (error) {
    console.log(error);
  }
}

  export const getCultureTypes =  () => async dispatch => {

    if(localStorage.getItem('token')){
      setAuthorization(localStorage.getItem('token'));
    }
    try {
      const res = await axios.get('/culture-types');
      dispatch({
        type: GET_CULTURE_TYPES,
        payload: res.culturetypes
      });
    } catch (err) {
      dispatch({
        type: CULTURE_TYPE_ERROR
      });
    }
  }

  
  export const getCultureType =  (id) => async dispatch => {

    if(localStorage.getItem('token')){
      setAuthorization(localStorage.getItem('token'));
    }
    try {
      const res = await axios.get(`/culture-types/${id}`);
      dispatch({
        type: GET_CULTURE_TYPE,
        payload: res
      });
    } catch (err) {
      console.error(err);
      dispatch({
        type: CULTURE_TYPE_ERROR
      });
    }
  }

  
  export const deleteCultureType =  id => async dispatch => {

    if(localStorage.getItem('token')){
      setAuthorization(localStorage.getItem('token'));
    }
    try {
      const res = await axios.delete(`/culture-types/${id}`);
      dispatch({
        type: DELETE_CULTURE_TYPE,
        payload: id
      });

      dispatch(setAlert('Culture Type deleted successfully','success'));
    } catch (err) {
      dispatch({
        type: CULTURE_TYPE_ERROR
      });
    }
  }

  
  export const changeStatusCultureType =  (id, status) => async dispatch => {

    if(localStorage.getItem('token')){
      setAuthorization(localStorage.getItem('token'));
    }

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.post(`/culture-types/status/${id}`, { status: status}, config);
      dispatch({
        type: CHANGE_STATUS_CULTURE_TYPE,
        payload: res
      });

      dispatch(setAlert('Culture Type status changed successfully','success'));
    } catch (err) {
      dispatch({
        type: CULTURE_TYPE_ERROR
      });
    }
  }

  
  export const updateCultureType =  (id, title) => async dispatch => {

    if(localStorage.getItem('token')){
      setAuthorization(localStorage.getItem('token'));
    }

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.patch(`/culture-types/${id}`, {"title": title}, config);
      dispatch({
        type: UPDATE_CULTURE_TYPE,
        payload: res
      });

      dispatch(setAlert('Culture Type updated successfully','success'));
    } catch (err) {
      dispatch({
        type: CULTURE_TYPE_ERROR
      });
    }
  }
