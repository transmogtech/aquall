import axios from 'axios';

import { CREATE_PRODUCT_REQUEST, GET_PRODUCT_REQUEST, GET_PRODUCT_REQUESTS, PRODUCT_REQUEST_ERROR, DELETE_PRODUCT_REQUEST, CHANGE_STATUS_PRODUCT_REQUEST, UPDATE_PRODUCT_REQUEST } from './types';
import { setAuthorization } from '../helpers/api_helper';
import { setAlert } from './alert';


export const createProductRequest = (formData) => async dispatch => {


  try {
    if(localStorage.getItem('token')){
      setAuthorization(localStorage.getItem('token'));
    }

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    };

    const response = await axios.post('/product-requests', formData, config);

    dispatch({
      type: CREATE_PRODUCT_REQUEST,
      payload: response.productrequest
    });

    dispatch(setAlert('ProductRequest created successfully', 'success'));

  } catch (error) {
    console.log(error);
  }
}

  export const getProductRequests =  () => async dispatch => {

    if(localStorage.getItem('token')){
      setAuthorization(localStorage.getItem('token'));
    }
    try {
      const res = await axios.get('/product-requests');
      dispatch({
        type: GET_PRODUCT_REQUESTS,
        payload: res.productrequests
      });
    } catch (err) {
      dispatch({
        type: PRODUCT_REQUEST_ERROR
      });
    }
  }

  
  export const getProductRequest =  (id) => async dispatch => {

    if(localStorage.getItem('token')){
      setAuthorization(localStorage.getItem('token'));
    }
    try {
      const res = await axios.get(`/product-requests/${id}`);
      dispatch({
        type: GET_PRODUCT_REQUEST,
        payload: res
      });
    } catch (err) {
      console.error(err);
      dispatch({
        type: PRODUCT_REQUEST_ERROR
      });
    }
  }

  
  export const deleteProductRequest =  id => async dispatch => {

    if(localStorage.getItem('token')){
      setAuthorization(localStorage.getItem('token'));
    }
    try {
      const res = await axios.delete(`/product-requests/${id}`);
      dispatch({
        type: DELETE_PRODUCT_REQUEST,
        payload: id
      });

      dispatch(setAlert('ProductRequest deleted successfully','success'));
    } catch (err) {
      dispatch({
        type: PRODUCT_REQUEST_ERROR
      });
    }
  }

  
  export const changeStatusProductRequest =  (id, status, comment) => async dispatch => {

    if(localStorage.getItem('token')){
      setAuthorization(localStorage.getItem('token'));
    }

    const config = {
      headers: {
        'Content-Type': 'application/json'
       }
    };

    try {
      const res = await axios.post(`/product-requests/status/${id}`, { status: status, comment: comment}, config);
      dispatch({
        type: CHANGE_STATUS_PRODUCT_REQUEST,
        payload: res
      });

      dispatch(setAlert('ProductRequest status changed successfully','success'));
    } catch (err) {
      dispatch({
        type: PRODUCT_REQUEST_ERROR
      });
    }
  }

  
  export const updateProductRequest =  (id, formData) => async dispatch => {

    if(localStorage.getItem('token')){
      setAuthorization(localStorage.getItem('token'));
    }

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    };

    try {
      const res = await axios.patch(`/product-requests/${id}`, formData, config);
      dispatch({
        type: UPDATE_PRODUCT_REQUEST,
        payload: res
      });

      dispatch(setAlert('ProductRequest updated successfully','success'));
    } catch (err) {
      dispatch({
        type: PRODUCT_REQUEST_ERROR
      });
    }
  }
