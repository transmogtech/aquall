import axios from 'axios';

import { CREATE_APP_BANNER_IMAGE, GET_APP_BANNER_IMAGE, GET_APP_BANNER_IMAGES, APP_BANNER_IMAGE_ERROR, DELETE_APP_BANNER_IMAGE, CHANGE_STATUS_APP_BANNER_IMAGE, UPDATE_APP_BANNER_IMAGE } from './types';
import { setAuthorization } from '../helpers/api_helper';
import { setAlert } from './alert';


export const createAppBannerImage = (formData) => async dispatch => {


  try {
    if(localStorage.getItem('token')){
      setAuthorization(localStorage.getItem('token'));
    }

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    };

    const response = await axios.post('/app-banner-images', formData, config);

    dispatch({
      type: CREATE_APP_BANNER_IMAGE,
      payload: response.appbannerimage
    });

    dispatch(setAlert('AppBannerImage created successfully', 'success'));

  } catch (error) {
    console.log(error);
  }
}

  export const getAppBannerImages =  () => async dispatch => {

    if(localStorage.getItem('token')){
      setAuthorization(localStorage.getItem('token'));
    }
    try {
      const res = await axios.get('/app-banner-images');
      dispatch({
        type: GET_APP_BANNER_IMAGES,
        payload: res.appbannerimages
      });
    } catch (err) {
      dispatch({
        type: APP_BANNER_IMAGE_ERROR
      });
    }
  }

  
  export const getAppBannerImage =  (id) => async dispatch => {

    if(localStorage.getItem('token')){
      setAuthorization(localStorage.getItem('token'));
    }
    try {
      const res = await axios.get(`/app-banner-images/${id}`);
      dispatch({
        type: GET_APP_BANNER_IMAGE,
        payload: res
      });
    } catch (err) {
      console.error(err);
      dispatch({
        type: APP_BANNER_IMAGE_ERROR
      });
    }
  }

  
  export const deleteAppBannerImage =  id => async dispatch => {

    if(localStorage.getItem('token')){
      setAuthorization(localStorage.getItem('token'));
    }
    try {
      const res = await axios.delete(`/app-banner-images/${id}`);
      dispatch({
        type: DELETE_APP_BANNER_IMAGE,
        payload: id
      });

      dispatch(setAlert('AppBannerImage deleted successfully','success'));
    } catch (err) {
      dispatch({
        type: APP_BANNER_IMAGE_ERROR
      });
    }
  }

  
  export const changeStatusAppBannerImage =  (id, status, comment) => async dispatch => {

    if(localStorage.getItem('token')){
      setAuthorization(localStorage.getItem('token'));
    }

    const config = {
      headers: {
        'Content-Type': 'application/json'
       }
    };

    try {
      const res = await axios.post(`/app-banner-images/status/${id}`, { status: status, comment: comment}, config);
      dispatch({
        type: CHANGE_STATUS_APP_BANNER_IMAGE,
        payload: res
      });

      dispatch(setAlert('AppBannerImage status changed successfully','success'));
    } catch (err) {
      dispatch({
        type: APP_BANNER_IMAGE_ERROR
      });
    }
  }

  
  export const updateAppBannerImage =  (id, formData) => async dispatch => {

    if(localStorage.getItem('token')){
      setAuthorization(localStorage.getItem('token'));
    }

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    };

    try {
      const res = await axios.patch(`/app-banner-images/${id}`, formData, config);
      dispatch({
        type: UPDATE_APP_BANNER_IMAGE,
        payload: res
      });

      dispatch(setAlert('AppBannerImage updated successfully','success'));
    } catch (err) {
      dispatch({
        type: APP_BANNER_IMAGE_ERROR
      });
    }
  }
