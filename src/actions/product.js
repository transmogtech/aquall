import axios from 'axios';

import { CREATE_PRODUCT, GET_PRODUCT, GET_PRODUCTS, PRODUCT_ERROR, DELETE_PRODUCT, CHANGE_STATUS_PRODUCT, UPDATE_PRODUCT } from './types';
import { setAuthorization } from '../helpers/api_helper';
import { setAlert } from './alert';


export const createProduct = (formData) => async dispatch => {


  try {
    if (localStorage.getItem('token')) {
      setAuthorization(localStorage.getItem('token'));
    }

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    };

    const response = await axios.post('/products', formData, config);

    dispatch({
      type: CREATE_PRODUCT,
      payload: response.product
    });

    dispatch(setAlert('Product created successfully', 'success'));

  } catch (error) {
    console.log(error);
  }
}

export const getProducts = (formData) => async dispatch => {

  if (localStorage.getItem('token')) {
    setAuthorization(localStorage.getItem('token'));
  }
  try {
    const res = await axios.get('/products', { params: formData });
    dispatch({
      type: GET_PRODUCTS,
      payload: res.products
    });
  } catch (err) {
    dispatch({
      type: PRODUCT_ERROR
    });
  }
}


export const getProduct = (id) => async dispatch => {

  if (localStorage.getItem('token')) {
    setAuthorization(localStorage.getItem('token'));
  }
  try {
    const res = await axios.get(`/products/${id}`);
    dispatch({
      type: GET_PRODUCT,
      payload: res
    });
    return res;
  } catch (err) {
    console.error(err);
    dispatch({
      type: PRODUCT_ERROR
    });
  }
}


export const deleteProduct = id => async dispatch => {

  if (localStorage.getItem('token')) {
    setAuthorization(localStorage.getItem('token'));
  }
  try {
    const res = await axios.delete(`/products/${id}`);
    dispatch({
      type: DELETE_PRODUCT,
      payload: id
    });

    dispatch(setAlert('Product deleted successfully', 'success'));
  } catch (err) {
    dispatch({
      type: PRODUCT_ERROR
    });
  }
}


export const changeStatusProduct = (id, status, comment) => async dispatch => {

  if (localStorage.getItem('token')) {
    setAuthorization(localStorage.getItem('token'));
  }

  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.post(`/products/status/${id}`, { status: status, comment: comment }, config);
    dispatch({
      type: CHANGE_STATUS_PRODUCT,
      payload: res
    });

    dispatch(setAlert('Product status changed successfully', 'success'));
  } catch (err) {
    dispatch({
      type: PRODUCT_ERROR
    });
  }
}


export const updateProduct = (id, formData) => async dispatch => {

  if (localStorage.getItem('token')) {
    setAuthorization(localStorage.getItem('token'));
  }

  const config = {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  };

  try {
    const res = await axios.patch(`/products/${id}`, formData, config);
    dispatch({
      type: UPDATE_PRODUCT,
      payload: res
    });

    dispatch(setAlert('Product updated successfully', 'success'));
  } catch (err) {
    dispatch({
      type: PRODUCT_ERROR
    });
  }
}
