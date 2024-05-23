import axios from 'axios';

import { GET_HATECHERIES_PDFS, HATECHERIES_PDF_ERROR, UPDATE_HATECHERIES_PDF } from './types';
import { setAuthorization } from '../helpers/api_helper';
import { setAlert } from './alert';


  export const getHatecheriesPdfs =  () => async dispatch => {

    if(localStorage.getItem('token')){
      setAuthorization(localStorage.getItem('token'));
    }
    try {
      const res = await axios.get('/hatecheries-pdf');
      dispatch({
        type: GET_HATECHERIES_PDFS,
        payload: res.hatecheriespdf
      });
    } catch (err) {
      dispatch({
        type: HATECHERIES_PDF_ERROR
      });
    }
  }
  
  
  export const updateHatecheriesPdf =  (id, file) => async dispatch => {

    if(localStorage.getItem('token')){
      setAuthorization(localStorage.getItem('token'));
    }

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    };

    try {
      const res = await axios.patch(`/hatecheries-pdf/${id}`, {"pdf": file}, config);
      dispatch({
        type: UPDATE_HATECHERIES_PDF,
        payload: res
      });

      dispatch(setAlert('HatecheriesPdf updated successfully','success'));
    } catch (err) {
      dispatch({
        type: HATECHERIES_PDF_ERROR
      });
    }
  }
