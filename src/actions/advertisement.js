import axios from 'axios';

import { CREATE_ADVERTISEMENT, GET_ADVERTISEMENT, GET_ADVERTISEMENTS, ADVERTISEMENT_ERROR, DELETE_ADVERTISEMENT, CHANGE_STATUS_ADVERTISEMENT, UPDATE_ADVERTISEMENT } from './types';
import { setAuthorization } from '../helpers/api_helper';
import { setAlert } from './alert';


export const createAdvertisement = (formData) => async dispatch => {


  try {
    if (localStorage.getItem('token')) {
      setAuthorization(localStorage.getItem('token'));
    }

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    };

    const response = await axios.post('/advertisements', formData, config);

    dispatch({
      type: CREATE_ADVERTISEMENT,
      payload: response.advertisement
    });

    dispatch(setAlert('Advertisement created successfully', 'success'));

  } catch (error) {
    console.log(error);
  }
}

export const getAdvertisements = () => async dispatch => {

  if (localStorage.getItem('token')) {
    setAuthorization(localStorage.getItem('token'));
  }
  try {
    const res = await axios.get('/advertisements');
    dispatch({
      type: GET_ADVERTISEMENTS,
      payload: res.advertisements
    });
  } catch (err) {
    dispatch({
      type: ADVERTISEMENT_ERROR
    });
  }
}


export const getAdvertisement = (id) => async dispatch => {

  if (localStorage.getItem('token')) {
    setAuthorization(localStorage.getItem('token'));
  }
  try {
    const res = await axios.get(`/advertisements/${id}`);
    dispatch({
      type: GET_ADVERTISEMENT,
      payload: res
    });

    return res;
  } catch (err) {
    console.error(err);
    dispatch({
      type: ADVERTISEMENT_ERROR
    });
  }
}


export const deleteAdvertisement = id => async dispatch => {

  if (localStorage.getItem('token')) {
    setAuthorization(localStorage.getItem('token'));
  }
  try {
    const res = await axios.delete(`/advertisements/${id}`);
    dispatch({
      type: DELETE_ADVERTISEMENT,
      payload: id
    });

    dispatch(setAlert('Advertisement deleted successfully', 'success'));
  } catch (err) {
    dispatch({
      type: ADVERTISEMENT_ERROR
    });
  }
}


export const changeStatusAdvertisement = (id, status, comment) => async dispatch => {

  if (localStorage.getItem('token')) {
    setAuthorization(localStorage.getItem('token'));
  }

  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.post(`/advertisements/status/${id}`, { status: status, comment: comment }, config);
    dispatch({
      type: CHANGE_STATUS_ADVERTISEMENT,
      payload: res
    });

    dispatch(setAlert('Advertisement status changed successfully', 'success'));
  } catch (err) {
    dispatch({
      type: ADVERTISEMENT_ERROR
    });
  }
}


export const updateAdvertisement = (id, formData) => async dispatch => {

  if (localStorage.getItem('token')) {
    setAuthorization(localStorage.getItem('token'));
  }

  const config = {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  };

  try {
    const res = await axios.patch(`/advertisements/${id}`, formData, config);
    dispatch({
      type: UPDATE_ADVERTISEMENT,
      payload: res
    });

    dispatch(setAlert('Advertisement updated successfully', 'success'));
  } catch (err) {
    dispatch({
      type: ADVERTISEMENT_ERROR
    });
  }
}
