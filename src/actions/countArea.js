import axios from 'axios';

import { CREATE_COUNT_AREA, GET_COUNT_AREA, GET_COUNT_AREAS, COUNT_AREA_ERROR, DELETE_COUNT_AREA, CHANGE_STATUS_COUNT_AREA, UPDATE_COUNT_AREA } from './types';
import { setAuthorization } from '../helpers/api_helper';
import { setAlert } from './alert';


export const createCountArea = (formData) => async dispatch => {


  try {
    if(localStorage.getItem('token')){
      setAuthorization(localStorage.getItem('token'));
    }

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const response = await axios.post('/count-areas', formData, config);

    dispatch({
      type: CREATE_COUNT_AREA,
      payload: response.countarea
    });

    dispatch(setAlert('Count Area created successfully', 'success'));

  } catch (error) {
    console.log(error);
  }
}

  export const getCountAreas =  () => async dispatch => {

    if(localStorage.getItem('token')){
      setAuthorization(localStorage.getItem('token'));
    }
    try {
      const res = await axios.get('/count-areas');
      dispatch({
        type: GET_COUNT_AREAS,
        payload: res.countareas
      });
    } catch (err) {
      dispatch({
        type: COUNT_AREA_ERROR
      });
    }
  }

  
  export const getCountArea =  (id) => async dispatch => {

    if(localStorage.getItem('token')){
      setAuthorization(localStorage.getItem('token'));
    }
    try {
      const res = await axios.get(`/count-areas/${id}`);
      dispatch({
        type: GET_COUNT_AREA,
        payload: res
      });
    } catch (err) {
      console.error(err);
      dispatch({
        type: COUNT_AREA_ERROR
      });
    }
  }

  
  export const deleteCountArea =  id => async dispatch => {

    if(localStorage.getItem('token')){
      setAuthorization(localStorage.getItem('token'));
    }
    try {
      const res = await axios.delete(`/count-areas/${id}`);
      dispatch({
        type: DELETE_COUNT_AREA,
        payload: id
      });

      dispatch(setAlert('Count Area deleted successfully','success'));
    } catch (err) {
      dispatch({
        type: COUNT_AREA_ERROR
      });
    }
  }

  
  export const changeStatusCountArea =  (id, status, comment) => async dispatch => {

    if(localStorage.getItem('token')){
      setAuthorization(localStorage.getItem('token'));
    }

    const config = {
      headers: {
        'Content-Type': 'application/json'
       }
    };

    try {
      const res = await axios.post(`/count-areas/status/${id}`, { status: status, comment: comment}, config);
      dispatch({
        type: CHANGE_STATUS_COUNT_AREA,
        payload: res
      });

      dispatch(setAlert('Count Area status changed successfully','success'));
    } catch (err) {
      dispatch({
        type: COUNT_AREA_ERROR
      });
    }
  }

  
  export const updateCountArea =  (id, formData) => async dispatch => {

    if(localStorage.getItem('token')){
      setAuthorization(localStorage.getItem('token'));
    }

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.patch(`/count-areas/${id}`, formData, config);
      dispatch({
        type: UPDATE_COUNT_AREA,
        payload: res
      });

      dispatch(setAlert('Count Area updated successfully','success'));
    } catch (err) {
      dispatch({
        type: COUNT_AREA_ERROR
      });
    }
  }
