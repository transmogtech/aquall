import axios from 'axios';

import { CREATE_JOB_APPLICATION, GET_JOB_APPLICATION, GET_JOB_APPLICATIONS, JOB_APPLICATION_ERROR, DELETE_JOB_APPLICATION, CHANGE_STATUS_JOB_APPLICATION, UPDATE_JOB_APPLICATION } from './types';
import { setAuthorization } from '../helpers/api_helper';
import { setAlert } from './alert';


export const createJobApplication = (formData) => async dispatch => {


  try {
    if(localStorage.getItem('token')){
      setAuthorization(localStorage.getItem('token'));
    }

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    };

    const response = await axios.post('/job-applications', formData, config);

    dispatch({
      type: CREATE_JOB_APPLICATION,
      payload: response.jobapplication
    });

    dispatch(setAlert('JobApplication created successfully', 'success'));

  } catch (error) {
    console.log(error);
  }
}

  export const getJobApplications =  () => async dispatch => {

    if(localStorage.getItem('token')){
      setAuthorization(localStorage.getItem('token'));
    }
    try {
      const res = await axios.get('/job-applications');
      dispatch({
        type: GET_JOB_APPLICATIONS,
        payload: res.jobapplications
      });
    } catch (err) {
      dispatch({
        type: JOB_APPLICATION_ERROR
      });
    }
  }

  
  export const getJobApplication =  (id) => async dispatch => {

    if(localStorage.getItem('token')){
      setAuthorization(localStorage.getItem('token'));
    }
    try {
      const res = await axios.get(`/job-applications/${id}`);
      dispatch({
        type: GET_JOB_APPLICATION,
        payload: res
      });
    } catch (err) {
      console.error(err);
      dispatch({
        type: JOB_APPLICATION_ERROR
      });
    }
  }

  
  export const deleteJobApplication =  id => async dispatch => {

    if(localStorage.getItem('token')){
      setAuthorization(localStorage.getItem('token'));
    }
    try {
      const res = await axios.delete(`/job-applications/${id}`);
      dispatch({
        type: DELETE_JOB_APPLICATION,
        payload: id
      });

      dispatch(setAlert('JobApplication deleted successfully','success'));
    } catch (err) {
      dispatch({
        type: JOB_APPLICATION_ERROR
      });
    }
  }

  
  export const changeStatusJobApplication =  (id, status) => async dispatch => {

    if(localStorage.getItem('token')){
      setAuthorization(localStorage.getItem('token'));
    }

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.post(`/job-applications/status/${id}`, { status: status}, config);
      dispatch({
        type: CHANGE_STATUS_JOB_APPLICATION,
        payload: res
      });

      dispatch(setAlert('JobApplication status changed successfully','success'));
    } catch (err) {
      dispatch({
        type: JOB_APPLICATION_ERROR
      });
    }
  }

  
  export const updateJobApplication =  (id, formData) => async dispatch => {

    if(localStorage.getItem('token')){
      setAuthorization(localStorage.getItem('token'));
    }

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.patch(`/job-applications/${id}`, formData, config);
      dispatch({
        type: UPDATE_JOB_APPLICATION,
        payload: res
      });

      dispatch(setAlert('JobApplication updated successfully','success'));
    } catch (err) {
      dispatch({
        type: JOB_APPLICATION_ERROR
      });
    }
  }
