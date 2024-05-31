import axios from 'axios';

import { CREATE_PL_STAGE, GET_PL_STAGE, GET_PL_STAGES, PL_STAGE_ERROR, DELETE_PL_STAGE, CHANGE_STATUS_PL_STAGE, UPDATE_PL_STAGE } from './types';
import { setAuthorization } from '../helpers/api_helper';
import { setAlert } from './alert';


export const createPlStage = (formData) => async dispatch => {


  try {
    if(localStorage.getItem('token')){
      setAuthorization(localStorage.getItem('token'));
    }

    const config = {
      headers: {
        'Content-Type': 'application/json',
      }
    };

    const response = await axios.post('/pl-stages', formData, config);

    dispatch({
      type: CREATE_PL_STAGE,
      payload: response.plstage
    });

    dispatch(setAlert('Pl Stage created successfully', 'success'));

  } catch (error) {
    console.log(error);
  }
}

  export const getPlStages =  () => async dispatch => {

    if(localStorage.getItem('token')){
      setAuthorization(localStorage.getItem('token'));
    }
    try {
      const res = await axios.get('/pl-stages');
      dispatch({
        type: GET_PL_STAGES,
        payload: res.plstages
      });
    } catch (err) {
      dispatch({
        type: PL_STAGE_ERROR
      });
    }
  }

  
  export const getPlStage =  (id) => async dispatch => {

    if(localStorage.getItem('token')){
      setAuthorization(localStorage.getItem('token'));
    }
    try {
      const res = await axios.get(`/pl-stages/${id}`);
      dispatch({
        type: GET_PL_STAGE,
        payload: res
      });
    } catch (err) {
      console.error(err);
      dispatch({
        type: PL_STAGE_ERROR
      });
    }
  }

  
  export const deletePlStage =  id => async dispatch => {

    if(localStorage.getItem('token')){
      setAuthorization(localStorage.getItem('token'));
    }
    try {
      const res = await axios.delete(`/pl-stages/${id}`);
      dispatch({
        type: DELETE_PL_STAGE,
        payload: id
      });

      dispatch(setAlert('Pl Stage deleted successfully','success'));
    } catch (err) {
      dispatch({
        type: PL_STAGE_ERROR
      });
    }
  }

  
  export const changeStatusPlStage =  (id, status, comment) => async dispatch => {

    if(localStorage.getItem('token')){
      setAuthorization(localStorage.getItem('token'));
    }

    const config = {
      headers: {
        'Content-Type': 'application/json'
       }
    };

    try {
      const res = await axios.post(`/pl-stages/status/${id}`, { status: status, comment: comment}, config);
      dispatch({
        type: CHANGE_STATUS_PL_STAGE,
        payload: res
      });

      dispatch(setAlert('Pl Stage status changed successfully','success'));
    } catch (err) {
      dispatch({
        type: PL_STAGE_ERROR
      });
    }
  }

  
  export const updatePlStage =  (id, formData) => async dispatch => {

    if(localStorage.getItem('token')){
      setAuthorization(localStorage.getItem('token'));
    }

    const config = {
      headers: {
        'Content-Type': 'application/json',
            }
    };

    try {
      const res = await axios.patch(`/pl-stages/${id}`, formData, config);
      dispatch({
        type: UPDATE_PL_STAGE,
        payload: res
      });

      dispatch(setAlert('Pl Stage updated successfully','success'));
    } catch (err) {
      dispatch({
        type: PL_STAGE_ERROR
      });
    }
  }
