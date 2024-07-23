import axios from 'axios';

import { CREATE_LANGUAGE, GET_LANGUAGE, GET_LANGUAGES, LANGUAGE_ERROR, DELETE_LANGUAGE, CHANGE_STATUS_LANGUAGE, UPDATE_LANGUAGE } from './types';
import { setAuthorization } from '../helpers/api_helper';
import { setAlert } from './alert';


export const createLanguage = (formData) => async dispatch => {


  try {
    if (localStorage.getItem('token')) {
      setAuthorization(localStorage.getItem('token'));
    }

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const response = await axios.post('/languages', formData, config);

    dispatch({
      type: CREATE_LANGUAGE,
      payload: response.language
    });

    dispatch(setAlert('Languag created successfully', 'success'));

  } catch (error) {
    console.log(error);
  }
}

export const getLanguages = () => async dispatch => {

  if (localStorage.getItem('token')) {
    setAuthorization(localStorage.getItem('token'));
  }
  try {
    const res = await axios.get('/languages');
    dispatch({
      type: GET_LANGUAGES,
      payload: res.languages
    });
  } catch (err) {
    dispatch({
      type: LANGUAGE_ERROR
    });
  }
}


export const getLanguage = (id) => async dispatch => {

  if (localStorage.getItem('token')) {
    setAuthorization(localStorage.getItem('token'));
  }
  try {
    const res = await axios.get(`/languages/${id}`);
    dispatch({
      type: GET_LANGUAGE,
      payload: res
    });
    return res;
  } catch (err) {
    console.error(err);
    dispatch({
      type: LANGUAGE_ERROR
    });
  }
}


export const deleteLanguage = id => async dispatch => {

  if (localStorage.getItem('token')) {
    setAuthorization(localStorage.getItem('token'));
  }
  try {
    const res = await axios.delete(`/languages/${id}`);
    dispatch({
      type: DELETE_LANGUAGE,
      payload: id
    });

    dispatch(setAlert('Language deleted successfully', 'success'));
  } catch (err) {
    dispatch({
      type: LANGUAGE_ERROR
    });
  }
}


export const changeStatusLanguage = (id, status) => async dispatch => {

  if (localStorage.getItem('token')) {
    setAuthorization(localStorage.getItem('token'));
  }

  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.post(`/languages/status/${id}`, { status: status }, config);
    dispatch({
      type: CHANGE_STATUS_LANGUAGE,
      payload: res
    });

    dispatch(setAlert('Language status changed successfully', 'success'));
  } catch (err) {
    dispatch({
      type: LANGUAGE_ERROR
    });
  }
}


export const updateLanguage = (id, formData) => async dispatch => {

  if (localStorage.getItem('token')) {
    setAuthorization(localStorage.getItem('token'));
  }

  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.patch(`/languages/${id}`, formData, config);
    dispatch({
      type: UPDATE_LANGUAGE,
      payload: res
    });

    dispatch(setAlert('Language updated successfully', 'success'));
  } catch (err) {
    dispatch({
      type: LANGUAGE_ERROR
    });
  }
}
