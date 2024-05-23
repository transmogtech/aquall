import axios from 'axios';

import { CREATE_CATEGORY, GET_CATEGORY, GET_CATEGORIES, CATEGORY_ERROR, DELETE_CATEGORY, CHANGE_STATUS_CATEGORY, UPDATE_CATEGORY } from './types';
import { setAuthorization } from '../helpers/api_helper';
import { setAlert } from './alert';


export const createCategory = (formData) => async dispatch => {


  try {
    if(localStorage.getItem('token')){
      setAuthorization(localStorage.getItem('token'));
    }

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const response = await axios.post('/categories', formData, config);

    dispatch({
      type: CREATE_CATEGORY,
      payload: response.category
    });

    dispatch(setAlert('Category created successfully', 'success'));

  } catch (error) {
    console.log(error);
  }
}

  export const getCategories =  () => async dispatch => {

    if(localStorage.getItem('token')){
      setAuthorization(localStorage.getItem('token'));
    }
    try {
      const res = await axios.get('/categories');
      dispatch({
        type: GET_CATEGORIES,
        payload: res.categories
      });
    } catch (err) {
      dispatch({
        type: CATEGORY_ERROR
      });
    }
  }

  
  export const getCategory =  (id) => async dispatch => {

    if(localStorage.getItem('token')){
      setAuthorization(localStorage.getItem('token'));
    }
    try {
      const res = await axios.get(`/categories/${id}`);
      dispatch({
        type: GET_CATEGORY,
        payload: res
      });
    } catch (err) {
      console.error(err);
      dispatch({
        type: CATEGORY_ERROR
      });
    }
  }

  
  export const deleteCategory =  id => async dispatch => {

    if(localStorage.getItem('token')){
      setAuthorization(localStorage.getItem('token'));
    }
    try {
      const res = await axios.delete(`/categories/${id}`);
      dispatch({
        type: DELETE_CATEGORY,
        payload: id
      });

      dispatch(setAlert('Category deleted successfully','success'));
    } catch (err) {
      dispatch({
        type: CATEGORY_ERROR
      });
    }
  }

  
  export const changeStatusCategory =  (id, status) => async dispatch => {

    if(localStorage.getItem('token')){
      setAuthorization(localStorage.getItem('token'));
    }

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.post(`/categories/status/${id}`, { status: status}, config);
      dispatch({
        type: CHANGE_STATUS_CATEGORY,
        payload: res
      });

      dispatch(setAlert('Category status changed successfully','success'));
    } catch (err) {
      dispatch({
        type: CATEGORY_ERROR
      });
    }
  }

  
  export const updateCategory =  (id, formData) => async dispatch => {

    if(localStorage.getItem('token')){
      setAuthorization(localStorage.getItem('token'));
    }

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.patch(`/categories/${id}`, formData, config);
      dispatch({
        type: UPDATE_CATEGORY,
        payload: res
      });

      dispatch(setAlert('Category updated successfully','success'));
    } catch (err) {
      dispatch({
        type: CATEGORY_ERROR
      });
    }
  }
