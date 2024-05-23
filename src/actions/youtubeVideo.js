import axios from 'axios';

import { CREATE_YOUTUBE_VIDEO, GET_YOUTUBE_VIDEO, GET_YOUTUBE_VIDEOS, YOUTUBE_VIDEO_ERROR, DELETE_YOUTUBE_VIDEO, CHANGE_STATUS_YOUTUBE_VIDEO, UPDATE_YOUTUBE_VIDEO } from './types';
import { setAuthorization } from '../helpers/api_helper';
import { setAlert } from './alert';


export const createYoutubeVideo = (formData) => async dispatch => {


  try {
    if(localStorage.getItem('token')){
      setAuthorization(localStorage.getItem('token'));
    }

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const response = await axios.post('/youtube-videos', formData, config);

    dispatch({
      type: CREATE_YOUTUBE_VIDEO,
      payload: response.youtubevideo
    });

    dispatch(setAlert('YoutubeVideo created successfully', 'success'));

  } catch (error) {
    console.log(error);
  }
}

  export const getYoutubeVideos =  () => async dispatch => {

    if(localStorage.getItem('token')){
      setAuthorization(localStorage.getItem('token'));
    }
    try {
      const res = await axios.get('/youtube-videos');
      dispatch({
        type: GET_YOUTUBE_VIDEOS,
        payload: res.youtubevideos
      });
    } catch (err) {
      dispatch({
        type: YOUTUBE_VIDEO_ERROR
      });
    }
  }

  
  export const getYoutubeVideo =  (id) => async dispatch => {

    if(localStorage.getItem('token')){
      setAuthorization(localStorage.getItem('token'));
    }
    try {
      const res = await axios.get(`/youtube-videos/${id}`);
      dispatch({
        type: GET_YOUTUBE_VIDEO,
        payload: res
      });
    } catch (err) {
      console.error(err);
      dispatch({
        type: YOUTUBE_VIDEO_ERROR
      });
    }
  }

  
  export const deleteYoutubeVideo =  id => async dispatch => {

    if(localStorage.getItem('token')){
      setAuthorization(localStorage.getItem('token'));
    }
    try {
      const res = await axios.delete(`/youtube-videos/${id}`);
      dispatch({
        type: DELETE_YOUTUBE_VIDEO,
        payload: id
      });

      dispatch(setAlert('YoutubeVideo deleted successfully','success'));
    } catch (err) {
      dispatch({
        type: YOUTUBE_VIDEO_ERROR
      });
    }
  }

  
  export const changeStatusYoutubeVideo =  (id, status) => async dispatch => {

    if(localStorage.getItem('token')){
      setAuthorization(localStorage.getItem('token'));
    }

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.post(`/youtube-videos/status/${id}`, { status: status}, config);
      dispatch({
        type: CHANGE_STATUS_YOUTUBE_VIDEO,
        payload: res
      });

      dispatch(setAlert('YoutubeVideo status changed successfully','success'));
    } catch (err) {
      dispatch({
        type: YOUTUBE_VIDEO_ERROR
      });
    }
  }

  
  export const updateYoutubeVideo =  (id, formData) => async dispatch => {

    if(localStorage.getItem('token')){
      setAuthorization(localStorage.getItem('token'));
    }

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.patch(`/youtube-videos/${id}`, formData, config);
      dispatch({
        type: UPDATE_YOUTUBE_VIDEO,
        payload: res
      });

      dispatch(setAlert('YoutubeVideo updated successfully','success'));
    } catch (err) {
      dispatch({
        type: YOUTUBE_VIDEO_ERROR
      });
    }
  }
