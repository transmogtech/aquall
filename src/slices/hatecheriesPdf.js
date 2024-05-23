import {  HATECHERIES_PDF_ERROR,  GET_HATECHERIES_PDFS, UPDATE_HATECHERIES_PDF } from "../actions/types";

const initialState = {
  loading: true,
  hatecheriespdf: null,
  hatecheriespdfs: []
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {

      case UPDATE_HATECHERIES_PDF:
      return {
        ...state,
        loading: false,
        hatecheriespdfs: state.hatecheriespdfs.map(hatecheriespdf => hatecheriespdf._id === payload._id ? payload : hatecheriespdf)
      };

    case GET_HATECHERIES_PDFS:
      return {
        ...state,
        loading: false,
        hatecheriespdfs: payload
      };

    case HATECHERIES_PDF_ERROR:
      return {
        ...state,
        error: payload,
        hatecheriespdf: null,
        hatecheriespdfs: []
      };

    default:
      return state;
  }
}