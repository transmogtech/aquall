import axios from 'axios';

import { ADD_NEWS, GET_NEWS, NEWS_ERROR, DELETE_NEWS, CHANGE_STATUS_NEWS, SINGLE_NEWS, UPDATE_NEWS } from './types';
import { setAuthorization } from '../helpers/api_helper';
import { setAlert } from './alert';
import {  useNavigate } from 'react-router-dom';



export const createNews = (formData) => async dispatch => {


  try {
    if(localStorage.getItem('token')){
      setAuthorization(localStorage.getItem('token'));
    }

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    };

    const response = await axios.post('/news', formData, config);

    dispatch({
      type: ADD_NEWS,
      payload: response.news
    });

    dispatch(setAlert('News created successfully', 'success'));

  } catch (error) {
    console.log(error);
  }
}

  export const getNewsList =  () => async dispatch => {

    if(localStorage.getItem('token')){
      setAuthorization(localStorage.getItem('token'));
    }
    try {
      const res = await axios.get('/news');
      dispatch({
        type: GET_NEWS,
        payload: res.news
      });
    } catch (err) {
      dispatch({
        type: NEWS_ERROR
      });
    }
  }

  
  export const getNews =  (id) => async dispatch => {

    if(localStorage.getItem('token')){
      setAuthorization(localStorage.getItem('token'));
    }
    try {
      const res = await axios.get(`/news/${id}`);
      dispatch({
        type: SINGLE_NEWS,
        payload: res
      });
    } catch (err) {
      console.error(err);
      dispatch({
        type: NEWS_ERROR
      });
    }
  }

  
  export const deleteNews =  id => async dispatch => {

    if(localStorage.getItem('token')){
      setAuthorization(localStorage.getItem('token'));
    }
    try {
      const res = await axios.delete(`/news/${id}`);
      dispatch({
        type: DELETE_NEWS,
        payload: id
      });

      dispatch(setAlert('News deleted successfully','success'));
    } catch (err) {
      dispatch({
        type: NEWS_ERROR
      });
    }
  }

  
  export const changeStatusNews =  (id, status) => async dispatch => {

    if(localStorage.getItem('token')){
      setAuthorization(localStorage.getItem('token'));
    }

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.post(`/news/status/${id}`, { status: status}, config);
      dispatch({
        type: CHANGE_STATUS_NEWS,
        payload: res
      });

      dispatch(setAlert('News status changed successfully','success'));
    } catch (err) {
      dispatch({
        type: NEWS_ERROR
      });
    }
  }


  
  export const updateNews =  (id, formData) => async dispatch => {

    if(localStorage.getItem('token')){
      setAuthorization(localStorage.getItem('token'));
    }

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    };

    try {
      const res = await axios.patch(`/news/${id}`, formData, config);
      dispatch({
        type: UPDATE_NEWS,
        payload: res
      });

      dispatch(setAlert('News updated successfully','success'));
    } catch (err) {
      dispatch({
        type: NEWS_ERROR
      });
    }
  }