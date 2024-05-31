import axios from 'axios';

import { CREATE_TECHNICIAN_REQUEST, GET_TECHNICIAN_REQUEST, GET_TECHNICIAN_REQUESTS, TECHNICIAN_REQUEST_ERROR, DELETE_TECHNICIAN_REQUEST, CHANGE_STATUS_TECHNICIAN_REQUEST, UPDATE_TECHNICIAN_REQUEST } from './types';
import { setAuthorization } from '../helpers/api_helper';
import { setAlert } from './alert';


export const createTechnicianRequest = (formData) => async dispatch => {


  try {
    if(localStorage.getItem('token')){
      setAuthorization(localStorage.getItem('token'));
    }

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    };

    const response = await axios.post('/technician-requests', formData, config);

    dispatch({
      type: CREATE_TECHNICIAN_REQUEST,
      payload: response.technicianrequest
    });

    dispatch(setAlert('Technician Request created successfully', 'success'));

  } catch (error) {
    console.log(error);
  }
}

  export const getTechnicianRequests =  () => async dispatch => {

    if(localStorage.getItem('token')){
      setAuthorization(localStorage.getItem('token'));
    }
    try {
      const res = await axios.get('/technician-requests');
      dispatch({
        type: GET_TECHNICIAN_REQUESTS,
        payload: res.technicianrequests
      });
    } catch (err) {
      dispatch({
        type: TECHNICIAN_REQUEST_ERROR
      });
    }
  }

  
  export const getTechnicianRequest =  (id) => async dispatch => {

    if(localStorage.getItem('token')){
      setAuthorization(localStorage.getItem('token'));
    }
    try {
      const res = await axios.get(`/technician-requests/${id}`);
      dispatch({
        type: GET_TECHNICIAN_REQUEST,
        payload: res
      });
    } catch (err) {
      console.error(err);
      dispatch({
        type: TECHNICIAN_REQUEST_ERROR
      });
    }
  }

  
  export const deleteTechnicianRequest =  id => async dispatch => {

    if(localStorage.getItem('token')){
      setAuthorization(localStorage.getItem('token'));
    }
    try {
      const res = await axios.delete(`/technician-requests/${id}`);
      dispatch({
        type: DELETE_TECHNICIAN_REQUEST,
        payload: id
      });

      dispatch(setAlert('Technician Request deleted successfully','success'));
    } catch (err) {
      dispatch({
        type: TECHNICIAN_REQUEST_ERROR
      });
    }
  }

  
  export const changeStatusTechnicianRequest =  (id, status, comment) => async dispatch => {

    if(localStorage.getItem('token')){
      setAuthorization(localStorage.getItem('token'));
    }

    const config = {
      headers: {
        'Content-Type': 'application/json'
       }
    };

    try {
      const res = await axios.post(`/technician-requests/status/${id}`, { status: status, comment: comment}, config);
      dispatch({
        type: CHANGE_STATUS_TECHNICIAN_REQUEST,
        payload: res
      });

      dispatch(setAlert('Technician Request status changed successfully','success'));
    } catch (err) {
      dispatch({
        type: TECHNICIAN_REQUEST_ERROR
      });
    }
  }

  
  export const updateTechnicianRequest =  (id, formData) => async dispatch => {

    if(localStorage.getItem('token')){
      setAuthorization(localStorage.getItem('token'));
    }

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    };

    try {
      const res = await axios.patch(`/technician-requests/${id}`, formData, config);
      dispatch({
        type: UPDATE_TECHNICIAN_REQUEST,
        payload: res
      });

      dispatch(setAlert('Technician Request updated successfully','success'));
    } catch (err) {
      dispatch({
        type: TECHNICIAN_REQUEST_ERROR
      });
    }
  }
