import axios from 'axios';

import { CREATE_FOOTER_LOGO, GET_FOOTER_LOGO, GET_FOOTER_LOGOS, FOOTER_LOGO_ERROR, DELETE_FOOTER_LOGO, CHANGE_STATUS_FOOTER_LOGO, UPDATE_FOOTER_LOGO } from './types';
import { setAuthorization } from '../helpers/api_helper';
import { setAlert } from './alert';


export const createFooterLogo = (formData) => async dispatch => {


  try {
    if(localStorage.getItem('token')){
      setAuthorization(localStorage.getItem('token'));
    }

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    };

    const response = await axios.post('/footer-logos', formData, config);

    dispatch({
      type: CREATE_FOOTER_LOGO,
      payload: response.footerlogo
    });

    dispatch(setAlert('Footer Logo created successfully', 'success'));

  } catch (error) {
    console.log(error);
  }
}

  export const getFooterLogos =  () => async dispatch => {

    if(localStorage.getItem('token')){
      setAuthorization(localStorage.getItem('token'));
    }
    try {
      const res = await axios.get('/footer-logos');
      dispatch({
        type: GET_FOOTER_LOGOS,
        payload: res.footerlogos
      });
    } catch (err) {
      dispatch({
        type: FOOTER_LOGO_ERROR
      });
    }
  }

  
  export const getFooterLogo =  (id) => async dispatch => {

    if(localStorage.getItem('token')){
      setAuthorization(localStorage.getItem('token'));
    }
    try {
      const res = await axios.get(`/footer-logos/${id}`);
      dispatch({
        type: GET_FOOTER_LOGO,
        payload: res
      });
    } catch (err) {
      console.error(err);
      dispatch({
        type: FOOTER_LOGO_ERROR
      });
    }
  }

  
  export const deleteFooterLogo =  id => async dispatch => {

    if(localStorage.getItem('token')){
      setAuthorization(localStorage.getItem('token'));
    }
    try {
      const res = await axios.delete(`/footer-logos/${id}`);
      dispatch({
        type: DELETE_FOOTER_LOGO,
        payload: id
      });

      dispatch(setAlert('Footer Logo deleted successfully','success'));
    } catch (err) {
      dispatch({
        type: FOOTER_LOGO_ERROR
      });
    }
  }

  
  export const changeStatusFooterLogo =  (id, status) => async dispatch => {

    if(localStorage.getItem('token')){
      setAuthorization(localStorage.getItem('token'));
    }

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.post(`/footer-logos/status/${id}`, { status: status}, config);
      dispatch({
        type: CHANGE_STATUS_FOOTER_LOGO,
        payload: res
      });

      dispatch(setAlert('Footer Logo status changed successfully','success'));
    } catch (err) {
      dispatch({
        type: FOOTER_LOGO_ERROR
      });
    }
  }

  
  export const updateFooterLogo =  (id, formData) => async dispatch => {

    if(localStorage.getItem('token')){
      setAuthorization(localStorage.getItem('token'));
    }

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    };

    try {
      const res = await axios.patch(`/footer-logos/${id}`, formData, config);
      dispatch({
        type: UPDATE_FOOTER_LOGO,
        payload: res
      });

      dispatch(setAlert('Footer Logo updated successfully','success'));
    } catch (err) {
      dispatch({
        type: FOOTER_LOGO_ERROR
      });
    }
  }
