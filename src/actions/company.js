import axios from 'axios';

import { CREATE_COMPANY, GET_COMPANY, GET_COMPANIES, COMPANY_ERROR, DELETE_COMPANY, CHANGE_STATUS_COMPANY, UPDATE_COMPANY } from './types';
import { setAuthorization } from '../helpers/api_helper';
import { setAlert } from './alert';


export const createCompany = (formData) => async dispatch => {


  try {
    if (localStorage.getItem('token')) {
      setAuthorization(localStorage.getItem('token'));
    }

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    };

    const response = await axios.post('/companies', formData, config);

    dispatch({
      type: CREATE_COMPANY,
      payload: response.companies
    });

    dispatch(setAlert('Company created successfully', 'success'));

  } catch (error) {
    console.log(error);
  }
}

export const getCompanies = (formData = '') => async dispatch => {

  if (localStorage.getItem('token')) {
    setAuthorization(localStorage.getItem('token'));
  }
  try {
    const res = await axios.get('/companies', { params: formData });
    dispatch({
      type: GET_COMPANIES,
      payload: res.companies
    });
  } catch (err) {
    dispatch({
      type: COMPANY_ERROR
    });
  }
}


export const getCompany = (id) => async dispatch => {

  if (localStorage.getItem('token')) {
    setAuthorization(localStorage.getItem('token'));
  }
  try {
    const res = await axios.get(`/companies/${id}`);
    dispatch({
      type: GET_COMPANY,
      payload: res
    });
    return res;
  } catch (err) {
    console.error(err);
    dispatch({
      type: COMPANY_ERROR
    });
  }
}


export const deleteCompany = id => async dispatch => {

  if (localStorage.getItem('token')) {
    setAuthorization(localStorage.getItem('token'));
  }
  try {
    const res = await axios.delete(`/companies/${id}`);
    dispatch({
      type: DELETE_COMPANY,
      payload: id
    });

    dispatch(setAlert('Company deleted successfully', 'success'));
  } catch (err) {
    dispatch({
      type: COMPANY_ERROR
    });
  }
}


export const changeStatusCompany = (id, status, comment) => async dispatch => {

  if (localStorage.getItem('token')) {
    setAuthorization(localStorage.getItem('token'));
  }

  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.post(`/companies/status/${id}`, { status: status, comment: comment }, config);
    dispatch({
      type: CHANGE_STATUS_COMPANY,
      payload: res
    });

    dispatch(setAlert('Company status changed successfully', 'success'));
  } catch (err) {
    dispatch({
      type: COMPANY_ERROR
    });
  }
}


export const updateCompany = (id, formData) => async dispatch => {

  if (localStorage.getItem('token')) {
    setAuthorization(localStorage.getItem('token'));
  }

  const config = {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  };

  try {
    const res = await axios.patch(`/companies/${id}`, formData, config);
    dispatch({
      type: UPDATE_COMPANY,
      payload: res
    });

    dispatch(setAlert('Company updated successfully', 'success'));
  } catch (err) {
    dispatch({
      type: COMPANY_ERROR
    });
  }
}
