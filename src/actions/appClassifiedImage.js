import axios from 'axios';

import { CREATE_APP_CLASSIFIED_IMAGE, GET_APP_CLASSIFIED_IMAGE, GET_APP_CLASSIFIED_IMAGES, APP_CLASSIFIED_IMAGE_ERROR, DELETE_APP_CLASSIFIED_IMAGE, CHANGE_STATUS_APP_CLASSIFIED_IMAGE, UPDATE_APP_CLASSIFIED_IMAGE } from './types';
import { setAuthorization } from '../helpers/api_helper';
import { setAlert } from './alert';


export const createAppClassifiedImage = (formData) => async dispatch => {


  try {
    if(localStorage.getItem('token')){
      setAuthorization(localStorage.getItem('token'));
    }

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    };

    const response = await axios.post('/app-classified-images', formData, config);

    dispatch({
      type: CREATE_APP_CLASSIFIED_IMAGE,
      payload: response.appclassifiedimage
    });

    dispatch(setAlert('App Classified Image created successfully', 'success'));

  } catch (error) {
    console.log(error);
  }
}

  export const getAppClassifiedImages =  () => async dispatch => {

    if(localStorage.getItem('token')){
      setAuthorization(localStorage.getItem('token'));
    }
    try {
      const res = await axios.get('/app-classified-images');
      dispatch({
        type: GET_APP_CLASSIFIED_IMAGES,
        payload: res.appclassifiedimages
      });
    } catch (err) {
      dispatch({
        type: APP_CLASSIFIED_IMAGE_ERROR
      });
    }
  }

  
  export const getAppClassifiedImage =  (id) => async dispatch => {

    if(localStorage.getItem('token')){
      setAuthorization(localStorage.getItem('token'));
    }
    try {
      const res = await axios.get(`/app-classified-images/${id}`);
      dispatch({
        type: GET_APP_CLASSIFIED_IMAGE,
        payload: res
      });
    } catch (err) {
      console.error(err);
      dispatch({
        type: APP_CLASSIFIED_IMAGE_ERROR
      });
    }
  }

  
  export const deleteAppClassifiedImage =  id => async dispatch => {

    if(localStorage.getItem('token')){
      setAuthorization(localStorage.getItem('token'));
    }
    try {
      const res = await axios.delete(`/app-classified-images/${id}`);
      dispatch({
        type: DELETE_APP_CLASSIFIED_IMAGE,
        payload: id
      });

      dispatch(setAlert('App Classified Image deleted successfully','success'));
    } catch (err) {
      dispatch({
        type: APP_CLASSIFIED_IMAGE_ERROR
      });
    }
  }

  
  export const changeStatusAppClassifiedImage =  (id, status, comment) => async dispatch => {

    if(localStorage.getItem('token')){
      setAuthorization(localStorage.getItem('token'));
    }

    const config = {
      headers: {
        'Content-Type': 'application/json'
       }
    };

    try {
      const res = await axios.post(`/app-classified-images/status/${id}`, { status: status, comment: comment}, config);
      dispatch({
        type: CHANGE_STATUS_APP_CLASSIFIED_IMAGE,
        payload: res
      });

      dispatch(setAlert('App Classified Image status changed successfully','success'));
    } catch (err) {
      dispatch({
        type: APP_CLASSIFIED_IMAGE_ERROR
      });
    }
  }

  
  export const updateAppClassifiedImage =  (id, formData) => async dispatch => {

    if(localStorage.getItem('token')){
      setAuthorization(localStorage.getItem('token'));
    }

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    };

    try {
      const res = await axios.patch(`/app-classified-images/${id}`, formData, config);
      dispatch({
        type: UPDATE_APP_CLASSIFIED_IMAGE,
        payload: res
      });

      dispatch(setAlert('App Classified Image updated successfully','success'));
    } catch (err) {
      dispatch({
        type: APP_CLASSIFIED_IMAGE_ERROR
      });
    }
  }
