import axios from 'axios';

import { CREATE_ORDER, GET_ORDER, GET_ORDERS, ORDER_ERROR, DELETE_ORDER, CHANGE_STATUS_ORDER, UPDATE_ORDER } from './types';
import { setAuthorization } from '../helpers/api_helper';
import { setAlert } from './alert';


export const createOrder = (formData) => async dispatch => {


  try {
    if (localStorage.getItem('token')) {
      setAuthorization(localStorage.getItem('token'));
    }

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const response = await axios.post('/orders', formData, config);

    dispatch({
      type: CREATE_ORDER,
      payload: response.order
    });

    dispatch(setAlert('Order created successfully', 'success'));

  } catch (error) {
    console.log(error);
  }
}

export const getOrders = () => async dispatch => {

  if (localStorage.getItem('token')) {
    setAuthorization(localStorage.getItem('token'));
  }
  try {
    const res = await axios.get('/orders');
    dispatch({
      type: GET_ORDERS,
      payload: res.orders
    });
  } catch (err) {
    dispatch({
      type: ORDER_ERROR
    });
  }
}


export const getOrder = (id) => async dispatch => {

  if (localStorage.getItem('token')) {
    setAuthorization(localStorage.getItem('token'));
  }
  try {
    const res = await axios.get(`/orders/${id}`);
    dispatch({
      type: GET_ORDER,
      payload: res
    });
    return res;
  } catch (err) {
    console.error(err);
    dispatch({
      type: ORDER_ERROR
    });
  }
}


export const deleteOrder = id => async dispatch => {

  if (localStorage.getItem('token')) {
    setAuthorization(localStorage.getItem('token'));
  }
  try {
    const res = await axios.delete(`/orders/${id}`);
    dispatch({
      type: DELETE_ORDER,
      payload: id
    });

    dispatch(setAlert('Order deleted successfully', 'success'));
  } catch (err) {
    dispatch({
      type: ORDER_ERROR
    });
  }
}


export const changeStatusOrder = (id, status, comment) => async dispatch => {

  if (localStorage.getItem('token')) {
    setAuthorization(localStorage.getItem('token'));
  }

  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.post(`/orders/status/${id}`, { status: status, comment: comment }, config);
    dispatch({
      type: CHANGE_STATUS_ORDER,
      payload: res
    });

    dispatch(setAlert('Order status changed successfully', 'success'));
  } catch (err) {
    dispatch({
      type: ORDER_ERROR
    });
  }
}


export const updateOrder = (id, formData) => async dispatch => {

  if (localStorage.getItem('token')) {
    setAuthorization(localStorage.getItem('token'));
  }

  const config = {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  };

  try {
    const res = await axios.patch(`/orders/${id}`, formData, config);
    dispatch({
      type: UPDATE_ORDER,
      payload: res
    });

    dispatch(setAlert('Order updated successfully', 'success'));
  } catch (err) {
    dispatch({
      type: ORDER_ERROR
    });
  }
}
