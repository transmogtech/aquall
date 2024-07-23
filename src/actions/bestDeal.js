import axios from 'axios';

import { CREATE_BEST_DEAL, GET_BEST_DEAL, GET_BEST_DEALS, BEST_DEAL_ERROR, DELETE_BEST_DEAL, CHANGE_STATUS_BEST_DEAL, UPDATE_BEST_DEAL } from './types';
import { setAuthorization } from '../helpers/api_helper';
import { setAlert } from './alert';


export const createBestDeal = (formData) => async dispatch => {


  try {
    if (localStorage.getItem('token')) {
      setAuthorization(localStorage.getItem('token'));
    }

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    };

    const response = await axios.post('/best-deals', formData, config);

    dispatch({
      type: CREATE_BEST_DEAL,
      payload: response.bestdeal
    });

    dispatch(setAlert('BestDeal created successfully', 'success'));

  } catch (error) {
    console.log(error);
  }
}

export const getBestDeals = () => async dispatch => {

  if (localStorage.getItem('token')) {
    setAuthorization(localStorage.getItem('token'));
  }
  try {
    const res = await axios.get('/best-deals');
    dispatch({
      type: GET_BEST_DEALS,
      payload: res.bestdeals
    });
  } catch (err) {
    dispatch({
      type: BEST_DEAL_ERROR
    });
  }
}


export const getBestDeal = (id) => async dispatch => {

  if (localStorage.getItem('token')) {
    setAuthorization(localStorage.getItem('token'));
  }
  try {
    const res = await axios.get(`/best-deals/${id}`);
    dispatch({
      type: GET_BEST_DEAL,
      payload: res
    });
    return res;
  } catch (err) {
    console.error(err);
    dispatch({
      type: BEST_DEAL_ERROR
    });
  }
}


export const deleteBestDeal = id => async dispatch => {

  if (localStorage.getItem('token')) {
    setAuthorization(localStorage.getItem('token'));
  }
  try {
    const res = await axios.delete(`/best-deals/${id}`);
    dispatch({
      type: DELETE_BEST_DEAL,
      payload: id
    });

    dispatch(setAlert('BestDeal deleted successfully', 'success'));
  } catch (err) {
    dispatch({
      type: BEST_DEAL_ERROR
    });
  }
}


export const changeStatusBestDeal = (id, status, comment) => async dispatch => {

  if (localStorage.getItem('token')) {
    setAuthorization(localStorage.getItem('token'));
  }

  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.post(`/best-deals/status/${id}`, { status: status, comment: comment }, config);
    dispatch({
      type: CHANGE_STATUS_BEST_DEAL,
      payload: res
    });

    dispatch(setAlert('BestDeal status changed successfully', 'success'));
  } catch (err) {
    dispatch({
      type: BEST_DEAL_ERROR
    });
  }
}


export const updateBestDeal = (id, formData) => async dispatch => {

  if (localStorage.getItem('token')) {
    setAuthorization(localStorage.getItem('token'));
  }

  const config = {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  };

  try {
    const res = await axios.patch(`/best-deals/${id}`, formData, config);
    dispatch({
      type: UPDATE_BEST_DEAL,
      payload: res
    });

    dispatch(setAlert('BestDeal updated successfully', 'success'));
  } catch (err) {
    dispatch({
      type: BEST_DEAL_ERROR
    });
  }
}
