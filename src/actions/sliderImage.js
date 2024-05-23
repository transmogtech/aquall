import axios from 'axios';

import { CREATE_SLIDER_IMAGE, GET_SLIDER_IMAGE, GET_SLIDER_IMAGES, SLIDER_IMAGE_ERROR, DELETE_SLIDER_IMAGE, CHANGE_STATUS_SLIDER_IMAGE, UPDATE_SLIDER_IMAGE } from './types';
import { setAuthorization } from '../helpers/api_helper';
import { setAlert } from './alert';


export const createSliderImage = (formData) => async dispatch => {


  try {
    if(localStorage.getItem('token')){
      setAuthorization(localStorage.getItem('token'));
    }

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    };

    const response = await axios.post('/slider-images', formData, config);

    dispatch({
      type: CREATE_SLIDER_IMAGE,
      payload: response.sliderimage
    });

    dispatch(setAlert('SliderImage created successfully', 'success'));

  } catch (error) {
    console.log(error);
  }
}

  export const getSliderImages =  () => async dispatch => {

    if(localStorage.getItem('token')){
      setAuthorization(localStorage.getItem('token'));
    }
    try {
      const res = await axios.get('/slider-images');
      dispatch({
        type: GET_SLIDER_IMAGES,
        payload: res.sliderimages
      });
    } catch (err) {
      dispatch({
        type: SLIDER_IMAGE_ERROR
      });
    }
  }

  
  export const getSliderImage =  (id) => async dispatch => {

    if(localStorage.getItem('token')){
      setAuthorization(localStorage.getItem('token'));
    }
    try {
      const res = await axios.get(`/slider-images/${id}`);
      dispatch({
        type: GET_SLIDER_IMAGE,
        payload: res
      });
    } catch (err) {
      console.error(err);
      dispatch({
        type: SLIDER_IMAGE_ERROR
      });
    }
  }

  
  export const deleteSliderImage =  id => async dispatch => {

    if(localStorage.getItem('token')){
      setAuthorization(localStorage.getItem('token'));
    }
    try {
      const res = await axios.delete(`/slider-images/${id}`);
      dispatch({
        type: DELETE_SLIDER_IMAGE,
        payload: id
      });

      dispatch(setAlert('SliderImage deleted successfully','success'));
    } catch (err) {
      dispatch({
        type: SLIDER_IMAGE_ERROR
      });
    }
  }

  
  export const changeStatusSliderImage =  (id, status, comment) => async dispatch => {

    if(localStorage.getItem('token')){
      setAuthorization(localStorage.getItem('token'));
    }

    const config = {
      headers: {
        'Content-Type': 'application/json'
       }
    };

    try {
      const res = await axios.post(`/slider-images/status/${id}`, { status: status, comment: comment}, config);
      dispatch({
        type: CHANGE_STATUS_SLIDER_IMAGE,
        payload: res
      });

      dispatch(setAlert('SliderImage status changed successfully','success'));
    } catch (err) {
      dispatch({
        type: SLIDER_IMAGE_ERROR
      });
    }
  }

  
  export const updateSliderImage =  (id, formData) => async dispatch => {

    if(localStorage.getItem('token')){
      setAuthorization(localStorage.getItem('token'));
    }

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    };

    try {
      const res = await axios.patch(`/slider-images/${id}`, formData, config);
      dispatch({
        type: UPDATE_SLIDER_IMAGE,
        payload: res
      });

      dispatch(setAlert('SliderImage updated successfully','success'));
    } catch (err) {
      dispatch({
        type: SLIDER_IMAGE_ERROR
      });
    }
  }
