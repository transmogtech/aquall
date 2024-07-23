import axios from 'axios';

import { CREATE_FEED_TYPE, GET_FEED_TYPE, GET_FEED_TYPES, FEED_TYPE_ERROR, DELETE_FEED_TYPE, CHANGE_STATUS_FEED_TYPE, UPDATE_FEED_TYPE } from './types';
import { setAuthorization } from '../helpers/api_helper';
import { setAlert } from './alert';


export const createFeedType = (formData) => async dispatch => {


  try {
    if (localStorage.getItem('token')) {
      setAuthorization(localStorage.getItem('token'));
    }

    const config = {
      headers: {
        'Content-Type': 'application/json',
      }
    };

    const response = await axios.post('/feed-types', formData, config);

    dispatch({
      type: CREATE_FEED_TYPE,
      payload: response.feedtype
    });

    dispatch(setAlert('Feed Type created successfully', 'success'));

  } catch (error) {
    console.log(error);
  }
}

export const getFeedTypes = () => async dispatch => {

  if (localStorage.getItem('token')) {
    setAuthorization(localStorage.getItem('token'));
  }
  try {
    const res = await axios.get('/feed-types');
    dispatch({
      type: GET_FEED_TYPES,
      payload: res.feedtypes
    });
  } catch (err) {
    dispatch({
      type: FEED_TYPE_ERROR
    });
  }
}


export const getFeedType = (id) => async dispatch => {

  if (localStorage.getItem('token')) {
    setAuthorization(localStorage.getItem('token'));
  }
  try {
    const res = await axios.get(`/feed-types/${id}`);
    dispatch({
      type: GET_FEED_TYPE,
      payload: res
    });
    return res;
  } catch (err) {
    console.error(err);
    dispatch({
      type: FEED_TYPE_ERROR
    });
  }
}


export const deleteFeedType = id => async dispatch => {

  if (localStorage.getItem('token')) {
    setAuthorization(localStorage.getItem('token'));
  }
  try {
    const res = await axios.delete(`/feed-types/${id}`);
    dispatch({
      type: DELETE_FEED_TYPE,
      payload: id
    });

    dispatch(setAlert('Feed Type deleted successfully', 'success'));
  } catch (err) {
    dispatch({
      type: FEED_TYPE_ERROR
    });
  }
}


export const changeStatusFeedType = (id, status, comment) => async dispatch => {

  if (localStorage.getItem('token')) {
    setAuthorization(localStorage.getItem('token'));
  }

  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.post(`/feed-types/status/${id}`, { status: status, comment: comment }, config);
    dispatch({
      type: CHANGE_STATUS_FEED_TYPE,
      payload: res
    });

    dispatch(setAlert('Feed Type status changed successfully', 'success'));
  } catch (err) {
    dispatch({
      type: FEED_TYPE_ERROR
    });
  }
}


export const updateFeedType = (id, formData) => async dispatch => {

  if (localStorage.getItem('token')) {
    setAuthorization(localStorage.getItem('token'));
  }

  const config = {
    headers: {
      'Content-Type': 'application/json',
    }
  };

  try {
    const res = await axios.patch(`/feed-types/${id}`, formData, config);
    dispatch({
      type: UPDATE_FEED_TYPE,
      payload: res
    });

    dispatch(setAlert('Feed Type updated successfully', 'success'));
  } catch (err) {
    dispatch({
      type: FEED_TYPE_ERROR
    });
  }
}
