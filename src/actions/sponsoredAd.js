import axios from 'axios';

import { CREATE_SPONSORED_AD, GET_SPONSORED_AD, GET_SPONSORED_ADS, SPONSORED_AD_ERROR, DELETE_SPONSORED_AD, CHANGE_STATUS_SPONSORED_AD, UPDATE_SPONSORED_AD } from './types';
import { setAuthorization } from '../helpers/api_helper';
import { setAlert } from './alert';


export const createSponsoredAd = (formData) => async dispatch => {


  try {
    if (localStorage.getItem('token')) {
      setAuthorization(localStorage.getItem('token'));
    }

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    };

    const response = await axios.post('/sponsored-ads', formData, config);

    dispatch({
      type: CREATE_SPONSORED_AD,
      payload: response.sponsoredad
    });

    dispatch(setAlert('SponsoredAd created successfully', 'success'));

  } catch (error) {
    console.log(error);
  }
}

export const getSponsoredAds = () => async dispatch => {

  if (localStorage.getItem('token')) {
    setAuthorization(localStorage.getItem('token'));
  }
  try {
    const res = await axios.get('/sponsored-ads');
    dispatch({
      type: GET_SPONSORED_ADS,
      payload: res.sponsoredads
    });
  } catch (err) {
    dispatch({
      type: SPONSORED_AD_ERROR
    });
  }
}


export const getSponsoredAd = (id) => async dispatch => {

  if (localStorage.getItem('token')) {
    setAuthorization(localStorage.getItem('token'));
  }
  try {
    const res = await axios.get(`/sponsored-ads/${id}`);
    dispatch({
      type: GET_SPONSORED_AD,
      payload: res
    });
    return res;
  } catch (err) {
    console.error(err);
    dispatch({
      type: SPONSORED_AD_ERROR
    });
  }
}


export const deleteSponsoredAd = id => async dispatch => {

  if (localStorage.getItem('token')) {
    setAuthorization(localStorage.getItem('token'));
  }
  try {
    const res = await axios.delete(`/sponsored-ads/${id}`);
    dispatch({
      type: DELETE_SPONSORED_AD,
      payload: id
    });

    dispatch(setAlert('SponsoredAd deleted successfully', 'success'));
  } catch (err) {
    dispatch({
      type: SPONSORED_AD_ERROR
    });
  }
}


export const changeStatusSponsoredAd = (id, status, comment) => async dispatch => {

  if (localStorage.getItem('token')) {
    setAuthorization(localStorage.getItem('token'));
  }

  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.post(`/sponsored-ads/status/${id}`, { status: status, comment: comment }, config);
    dispatch({
      type: CHANGE_STATUS_SPONSORED_AD,
      payload: res
    });

    dispatch(setAlert('SponsoredAd status changed successfully', 'success'));
  } catch (err) {
    dispatch({
      type: SPONSORED_AD_ERROR
    });
  }
}


export const updateSponsoredAd = (id, formData) => async dispatch => {

  if (localStorage.getItem('token')) {
    setAuthorization(localStorage.getItem('token'));
  }

  const config = {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  };

  try {
    const res = await axios.patch(`/sponsored-ads/${id}`, formData, config);
    dispatch({
      type: UPDATE_SPONSORED_AD,
      payload: res
    });

    dispatch(setAlert('SponsoredAd updated successfully', 'success'));
  } catch (err) {
    dispatch({
      type: SPONSORED_AD_ERROR
    });
  }
}
