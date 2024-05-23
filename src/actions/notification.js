import axios from 'axios';

import { CREATE_NOTIFICATION, GET_NOTIFICATION, GET_NOTIFICATIONS, NOTIFICATION_ERROR, DELETE_NOTIFICATION, CHANGE_STATUS_NOTIFICATION, UPDATE_NOTIFICATION } from './types';
import { setAuthorization } from '../helpers/api_helper';
import { setAlert } from './alert';


export const createNotification = (formData) => async dispatch => {


  try {
    if(localStorage.getItem('token')){
      setAuthorization(localStorage.getItem('token'));
    }

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const response = await axios.post('/notifications', formData, config);

    dispatch({
      type: CREATE_NOTIFICATION,
      payload: response.notification
    });

    dispatch(setAlert('Notification created successfully', 'success'));

  } catch (error) {
    console.log(error);
  }
}

  export const getNotifications =  () => async dispatch => {

    if(localStorage.getItem('token')){
      setAuthorization(localStorage.getItem('token'));
    }
    try {
      const res = await axios.get('/notifications');
      dispatch({
        type: GET_NOTIFICATIONS,
        payload: res.notifications
      });
    } catch (err) {
      dispatch({
        type: NOTIFICATION_ERROR
      });
    }
  }

  
  export const getNotification =  (id) => async dispatch => {

    if(localStorage.getItem('token')){
      setAuthorization(localStorage.getItem('token'));
    }
    try {
      const res = await axios.get(`/notifications/${id}`);
      dispatch({
        type: GET_NOTIFICATION,
        payload: res
      });
    } catch (err) {
      console.error(err);
      dispatch({
        type: NOTIFICATION_ERROR
      });
    }
  }

  
  export const deleteNotification =  id => async dispatch => {

    if(localStorage.getItem('token')){
      setAuthorization(localStorage.getItem('token'));
    }
    try {
      const res = await axios.delete(`/notifications/${id}`);
      dispatch({
        type: DELETE_NOTIFICATION,
        payload: id
      });

      dispatch(setAlert('Notification deleted successfully','success'));
    } catch (err) {
      dispatch({
        type: NOTIFICATION_ERROR
      });
    }
  }

  
  export const changeStatusNotification =  (id, status) => async dispatch => {

    if(localStorage.getItem('token')){
      setAuthorization(localStorage.getItem('token'));
    }

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.post(`/notifications/status/${id}`, { status: status}, config);
      dispatch({
        type: CHANGE_STATUS_NOTIFICATION,
        payload: res
      });

      dispatch(setAlert('Notification status changed successfully','success'));
    } catch (err) {
      dispatch({
        type: NOTIFICATION_ERROR
      });
    }
  }

  
  export const updateNotification =  (id, formData) => async dispatch => {

    if(localStorage.getItem('token')){
      setAuthorization(localStorage.getItem('token'));
    }

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.patch(`/notifications/${id}`, formData, config);
      dispatch({
        type: UPDATE_NOTIFICATION,
        payload: res
      });

      dispatch(setAlert('Notification updated successfully','success'));
    } catch (err) {
      dispatch({
        type: NOTIFICATION_ERROR
      });
    }
  }
