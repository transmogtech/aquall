import axios from 'axios';

import { CREATE_JOB, GET_JOB, GET_JOBS, JOB_ERROR, DELETE_JOB, CHANGE_STATUS_JOB, UPDATE_JOB } from './types';
import { setAuthorization } from '../helpers/api_helper';
import { setAlert } from './alert';


export const createJob = (formData) => async dispatch => {


  try {
    if(localStorage.getItem('token')){
      setAuthorization(localStorage.getItem('token'));
    }

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const response = await axios.post('/jobs', formData, config);

    dispatch({
      type: CREATE_JOB,
      payload: response.jobs
    });

    dispatch(setAlert('Job created successfully', 'success'));

  } catch (error) {
    console.log(error);
  }
}

  export const getJobs =  () => async dispatch => {

    if(localStorage.getItem('token')){
      setAuthorization(localStorage.getItem('token'));
    }
    try {
      const res = await axios.get('/jobs');
      dispatch({
        type: GET_JOBS,
        payload: res.jobs
      });
    } catch (err) {
      dispatch({
        type: JOB_ERROR
      });
    }
  }

  
  export const getJob =  (id) => async dispatch => {

    if(localStorage.getItem('token')){
      setAuthorization(localStorage.getItem('token'));
    }
    try {
      const res = await axios.get(`/jobs/${id}`);
      dispatch({
        type: GET_JOB,
        payload: res
      });
    } catch (err) {
      console.error(err);
      dispatch({
        type: JOB_ERROR
      });
    }
  }

  
  export const deleteJob =  id => async dispatch => {

    if(localStorage.getItem('token')){
      setAuthorization(localStorage.getItem('token'));
    }
    try {
      const res = await axios.delete(`/jobs/${id}`);
      dispatch({
        type: DELETE_JOB,
        payload: id
      });

      dispatch(setAlert('Job deleted successfully','success'));
    } catch (err) {
      dispatch({
        type: JOB_ERROR
      });
    }
  }

  
  export const changeStatusJob =  (id, status) => async dispatch => {

    if(localStorage.getItem('token')){
      setAuthorization(localStorage.getItem('token'));
    }

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.post(`/jobs/status/${id}`, { status: status}, config);
      dispatch({
        type: CHANGE_STATUS_JOB,
        payload: res
      });

      dispatch(setAlert('Job status changed successfully','success'));
    } catch (err) {
      dispatch({
        type: JOB_ERROR
      });
    }
  }

  
  export const updateJob =  (id, formData) => async dispatch => {

    if(localStorage.getItem('token')){
      setAuthorization(localStorage.getItem('token'));
    }

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.patch(`/jobs/${id}`, formData, config);
      dispatch({
        type: UPDATE_JOB,
        payload: res
      });

      dispatch(setAlert('Job updated successfully','success'));
    } catch (err) {
      dispatch({
        type: JOB_ERROR
      });
    }
  }
