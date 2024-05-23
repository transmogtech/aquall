import { CREATE_FOOTER_LOGO, GET_FOOTER_LOGOS, FOOTER_LOGO_ERROR, DELETE_FOOTER_LOGO, CHANGE_STATUS_FOOTER_LOGO, GET_FOOTER_LOGO, UPDATE_FOOTER_LOGO } from "../actions/types";

const initialState = {
  loading: true,
  footerlogos: [],
  footerlogo: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {

    case CREATE_FOOTER_LOGO:
      return {
        ...state,
        loading: false,
        footerlogos: [...state.footerlogos, payload]
      };


    case CHANGE_STATUS_FOOTER_LOGO:
    case UPDATE_FOOTER_LOGO:
      return {
        ...state,
        loading: false,
        footerlogos: state.footerlogos.map(footerlogo => footerlogo._id === payload._id ? payload : footerlogo)
      };

    case GET_FOOTER_LOGOS:
      return {
        ...state,
        loading: false,
        footerlogos: payload
      };


    case GET_FOOTER_LOGO:
      return {
        ...state,
        loading: false,
        footerlogo: payload
      };

    case DELETE_FOOTER_LOGO:
      return {
        ...state,
        loading: false,
        footerlogos: state.footerlogos.filter(footerlogo => footerlogo._id != payload)
      };

    case FOOTER_LOGO_ERROR:
      return {
        ...state,
        error: payload,
        footerlogo: null,
        footerlogos: []
      };

    default:
      return state;
  }
}