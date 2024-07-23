import axios from 'axios';

import { CREATE_COMPANY_REQUEST, GET_COMPANY_REQUEST, GET_COMPANY_REQUESTS, COMPANY_REQUEST_ERROR, DELETE_COMPANY_REQUEST, CHANGE_STATUS_COMPANY_REQUEST, UPDATE_COMPANY_REQUEST } from './types';
import { setAuthorization } from '../helpers/api_helper';
import { setAlert } from './alert';


export const createCompanyRequest = (formData) => async dispatch => {


  try {
    if (localStorage.getItem('token')) {
      setAuthorization(localStorage.getItem('token'));
    }

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    };

    const response = await axios.post('/company-requests', formData, config);

    dispatch({
      type: CREATE_COMPANY_REQUEST,
      payload: response.companyrequest
    });

    dispatch(setAlert('Company Request created successfully', 'success'));

  } catch (error) {
    console.log(error);
  }
}

export const getCompanyRequests = () => async dispatch => {

  if (localStorage.getItem('token')) {
    setAuthorization(localStorage.getItem('token'));
  }
  try {
    const res = await axios.get('/company-requests');
    dispatch({
      type: GET_COMPANY_REQUESTS,
      payload: res.companyrequests
    });
  } catch (err) {
    dispatch({
      type: COMPANY_REQUEST_ERROR
    });
  }
}


export const getCompanyRequest = (id) => async dispatch => {

  if (localStorage.getItem('token')) {
    setAuthorization(localStorage.getItem('token'));
  }
  try {
    const res = await axios.get(`/company-requests/${id}`);
    dispatch({
      type: GET_COMPANY_REQUEST,
      payload: res
    });
    return res;
  } catch (err) {
    console.error(err);
    dispatch({
      type: COMPANY_REQUEST_ERROR
    });
  }
}


export const deleteCompanyRequest = id => async dispatch => {

  if (localStorage.getItem('token')) {
    setAuthorization(localStorage.getItem('token'));
  }
  try {
    const res = await axios.delete(`/company-requests/${id}`);
    dispatch({
      type: DELETE_COMPANY_REQUEST,
      payload: id
    });

    dispatch(setAlert('Company Request deleted successfully', 'success'));
  } catch (err) {
    dispatch({
      type: COMPANY_REQUEST_ERROR
    });
  }
}


export const changeStatusCompanyRequest = (id, status, comment) => async dispatch => {

  if (localStorage.getItem('token')) {
    setAuthorization(localStorage.getItem('token'));
  }

  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.post(`/company-requests/status/${id}`, { status: status, comment: comment }, config);
    dispatch({
      type: CHANGE_STATUS_COMPANY_REQUEST,
      payload: res
    });

    dispatch(setAlert('Company Request status changed successfully', 'success'));
  } catch (err) {
    dispatch({
      type: COMPANY_REQUEST_ERROR
    });
  }
}


export const updateCompanyRequest = (id, formData) => async dispatch => {

  if (localStorage.getItem('token')) {
    setAuthorization(localStorage.getItem('token'));
  }

  const config = {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  };

  try {
    const res = await axios.patch(`/company-requests/${id}`, formData, config);
    dispatch({
      type: UPDATE_COMPANY_REQUEST,
      payload: res
    });

    dispatch(setAlert('Company Request updated successfully', 'success'));
  } catch (err) {
    dispatch({
      type: COMPANY_REQUEST_ERROR
    });
  }
}
