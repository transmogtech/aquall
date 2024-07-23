import axios from 'axios';

import { CREATE_CHEMICAL_CATEGORY, GET_CHEMICAL_CATEGORY, GET_CHEMICAL_CATEGORIES, CHEMICAL_CATEGORY_ERROR, DELETE_CHEMICAL_CATEGORY, CHANGE_STATUS_CHEMICAL_CATEGORY, UPDATE_CHEMICAL_CATEGORY } from './types';
import { setAuthorization } from '../helpers/api_helper';
import { setAlert } from './alert';


export const createChemicalCategory = (formData) => async dispatch => {


  try {
    if (localStorage.getItem('token')) {
      setAuthorization(localStorage.getItem('token'));
    }

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const response = await axios.post('/chemical-categories', formData, config);

    dispatch({
      type: CREATE_CHEMICAL_CATEGORY,
      payload: response.chemicalcategory
    });

    dispatch(setAlert('Chemical Category created successfully', 'success'));

  } catch (error) {
    console.log(error);
  }
}

export const getChemicalCategories = () => async dispatch => {

  if (localStorage.getItem('token')) {
    setAuthorization(localStorage.getItem('token'));
  }
  try {
    const res = await axios.get('/chemical-categories');
    dispatch({
      type: GET_CHEMICAL_CATEGORIES,
      payload: res.categories
    });
  } catch (err) {
    dispatch({
      type: CHEMICAL_CATEGORY_ERROR
    });
  }
}


export const getChemicalCategory = (id) => async dispatch => {

  if (localStorage.getItem('token')) {
    setAuthorization(localStorage.getItem('token'));
  }
  try {
    const res = await axios.get(`/chemical-categories/${id}`);
    dispatch({
      type: GET_CHEMICAL_CATEGORY,
      payload: res
    });
    return res;
  } catch (err) {
    console.error(err);
    dispatch({
      type: CHEMICAL_CATEGORY_ERROR
    });
  }
}


export const deleteChemicalCategory = id => async dispatch => {

  if (localStorage.getItem('token')) {
    setAuthorization(localStorage.getItem('token'));
  }
  try {
    const res = await axios.delete(`/chemical-categories/${id}`);
    dispatch({
      type: DELETE_CHEMICAL_CATEGORY,
      payload: id
    });

    dispatch(setAlert('Chemical Category deleted successfully', 'success'));
  } catch (err) {
    dispatch({
      type: CHEMICAL_CATEGORY_ERROR
    });
  }
}


export const changeStatusChemicalCategory = (id, status) => async dispatch => {

  if (localStorage.getItem('token')) {
    setAuthorization(localStorage.getItem('token'));
  }

  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.post(`/chemical-categories/status/${id}`, { status: status }, config);
    dispatch({
      type: CHANGE_STATUS_CHEMICAL_CATEGORY,
      payload: res
    });

    dispatch(setAlert('Chemical Category status changed successfully', 'success'));
  } catch (err) {
    dispatch({
      type: CHEMICAL_CATEGORY_ERROR
    });
  }
}


export const updateChemicalCategory = (id, formData) => async dispatch => {

  if (localStorage.getItem('token')) {
    setAuthorization(localStorage.getItem('token'));
  }

  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.patch(`/chemical-categories/${id}`, formData, config);
    dispatch({
      type: UPDATE_CHEMICAL_CATEGORY,
      payload: res
    });

    dispatch(setAlert('Chemical Category updated successfully', 'success'));
  } catch (err) {
    dispatch({
      type: CHEMICAL_CATEGORY_ERROR
    });
  }
}
