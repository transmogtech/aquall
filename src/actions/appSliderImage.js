import axios from 'axios';

import { CREATE_APP_SLIDER_IMAGE, GET_APP_SLIDER_IMAGE, GET_APP_SLIDER_IMAGES, APP_SLIDER_IMAGE_ERROR, DELETE_APP_SLIDER_IMAGE, CHANGE_STATUS_APP_SLIDER_IMAGE, UPDATE_APP_SLIDER_IMAGE } from './types';
import { setAuthorization } from '../helpers/api_helper';
import { setAlert } from './alert';


export const createAppSliderImage = (formData) => async dispatch => {


  try {
    if (localStorage.getItem('token')) {
      setAuthorization(localStorage.getItem('token'));
    }

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    };

    const response = await axios.post('/app-slider-images', formData, config);

    dispatch({
      type: CREATE_APP_SLIDER_IMAGE,
      payload: response.appsliderimage
    });

    dispatch(setAlert('AppSliderImage created successfully', 'success'));

  } catch (error) {
    console.log(error);
  }
}

export const getAppSliderImages = () => async dispatch => {

  if (localStorage.getItem('token')) {
    setAuthorization(localStorage.getItem('token'));
  }
  try {
    const res = await axios.get('/app-slider-images');
    dispatch({
      type: GET_APP_SLIDER_IMAGES,
      payload: res.appsliderimages
    });
  } catch (err) {
    dispatch({
      type: APP_SLIDER_IMAGE_ERROR
    });
  }
}


export const getAppSliderImage = (id) => async dispatch => {

  if (localStorage.getItem('token')) {
    setAuthorization(localStorage.getItem('token'));
  }
  try {
    const res = await axios.get(`/app-slider-images/${id}`);
    dispatch({
      type: GET_APP_SLIDER_IMAGE,
      payload: res
    });
    return res;
  } catch (err) {
    console.error(err);
    dispatch({
      type: APP_SLIDER_IMAGE_ERROR
    });
  }
}


export const deleteAppSliderImage = id => async dispatch => {

  if (localStorage.getItem('token')) {
    setAuthorization(localStorage.getItem('token'));
  }
  try {
    const res = await axios.delete(`/app-slider-images/${id}`);
    dispatch({
      type: DELETE_APP_SLIDER_IMAGE,
      payload: id
    });

    dispatch(setAlert('AppSliderImage deleted successfully', 'success'));
  } catch (err) {
    dispatch({
      type: APP_SLIDER_IMAGE_ERROR
    });
  }
}


export const changeStatusAppSliderImage = (id, status, comment) => async dispatch => {

  if (localStorage.getItem('token')) {
    setAuthorization(localStorage.getItem('token'));
  }

  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.post(`/app-slider-images/status/${id}`, { status: status, comment: comment }, config);
    dispatch({
      type: CHANGE_STATUS_APP_SLIDER_IMAGE,
      payload: res
    });

    dispatch(setAlert('AppSliderImage status changed successfully', 'success'));
  } catch (err) {
    dispatch({
      type: APP_SLIDER_IMAGE_ERROR
    });
  }
}


export const updateAppSliderImage = (id, formData) => async dispatch => {

  if (localStorage.getItem('token')) {
    setAuthorization(localStorage.getItem('token'));
  }

  const config = {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  };

  try {
    const res = await axios.patch(`/app-slider-images/${id}`, formData, config);
    dispatch({
      type: UPDATE_APP_SLIDER_IMAGE,
      payload: res
    });

    dispatch(setAlert('AppSliderImage updated successfully', 'success'));
  } catch (err) {
    dispatch({
      type: APP_SLIDER_IMAGE_ERROR
    });
  }
}
