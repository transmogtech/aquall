import axios from 'axios';

import { CREATE_BANNER_IMAGE, GET_BANNER_IMAGE, GET_BANNER_IMAGES, BANNER_IMAGE_ERROR, DELETE_BANNER_IMAGE, CHANGE_STATUS_BANNER_IMAGE, UPDATE_BANNER_IMAGE } from './types';
import { setAuthorization } from '../helpers/api_helper';
import { setAlert } from './alert';


export const createBannerImage = (formData) => async dispatch => {


  try {
    if(localStorage.getItem('token')){
      setAuthorization(localStorage.getItem('token'));
    }

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    };

    const response = await axios.post('/banner-images', formData, config);

    dispatch({
      type: CREATE_BANNER_IMAGE,
      payload: response.bannerimage
    });

    dispatch(setAlert('BannerImage created successfully', 'success'));

  } catch (error) {
    console.log(error);
  }
}

  export const getBannerImages =  () => async dispatch => {

    if(localStorage.getItem('token')){
      setAuthorization(localStorage.getItem('token'));
    }
    try {
      const res = await axios.get('/banner-images');
      dispatch({
        type: GET_BANNER_IMAGES,
        payload: res.bannerimages
      });
    } catch (err) {
      dispatch({
        type: BANNER_IMAGE_ERROR
      });
    }
  }

  
  export const getBannerImage =  (id) => async dispatch => {

    if(localStorage.getItem('token')){
      setAuthorization(localStorage.getItem('token'));
    }
    try {
      const res = await axios.get(`/banner-images/${id}`);
      dispatch({
        type: GET_BANNER_IMAGE,
        payload: res
      });
    } catch (err) {
      console.error(err);
      dispatch({
        type: BANNER_IMAGE_ERROR
      });
    }
  }

  
  export const deleteBannerImage =  id => async dispatch => {

    if(localStorage.getItem('token')){
      setAuthorization(localStorage.getItem('token'));
    }
    try {
      const res = await axios.delete(`/banner-images/${id}`);
      dispatch({
        type: DELETE_BANNER_IMAGE,
        payload: id
      });

      dispatch(setAlert('BannerImage deleted successfully','success'));
    } catch (err) {
      dispatch({
        type: BANNER_IMAGE_ERROR
      });
    }
  }

  
  export const changeStatusBannerImage =  (id, status, comment) => async dispatch => {

    if(localStorage.getItem('token')){
      setAuthorization(localStorage.getItem('token'));
    }

    const config = {
      headers: {
        'Content-Type': 'application/json'
       }
    };

    try {
      const res = await axios.post(`/banner-images/status/${id}`, { status: status, comment: comment}, config);
      dispatch({
        type: CHANGE_STATUS_BANNER_IMAGE,
        payload: res
      });

      dispatch(setAlert('BannerImage status changed successfully','success'));
    } catch (err) {
      dispatch({
        type: BANNER_IMAGE_ERROR
      });
    }
  }

  
  export const updateBannerImage =  (id, formData) => async dispatch => {

    if(localStorage.getItem('token')){
      setAuthorization(localStorage.getItem('token'));
    }

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    };

    try {
      const res = await axios.patch(`/banner-images/${id}`, formData, config);
      dispatch({
        type: UPDATE_BANNER_IMAGE,
        payload: res
      });

      dispatch(setAlert('BannerImage updated successfully','success'));
    } catch (err) {
      dispatch({
        type: BANNER_IMAGE_ERROR
      });
    }
  }
