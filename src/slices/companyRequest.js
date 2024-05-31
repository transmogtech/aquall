import { CREATE_COMPANY_REQUEST, GET_COMPANY_REQUESTS, COMPANY_REQUEST_ERROR, DELETE_COMPANY_REQUEST, CHANGE_STATUS_COMPANY_REQUEST, GET_COMPANY_REQUEST, UPDATE_COMPANY_REQUEST } from "../actions/types";

const initialState = {
  loading: true,
  companyrequests: [],
  companyrequest: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {

    case CREATE_COMPANY_REQUEST:
      return {
        ...state,
        loading: false,
        companyrequests: [...state.companyrequests, payload]
      };


    case CHANGE_STATUS_COMPANY_REQUEST:
    case UPDATE_COMPANY_REQUEST:
      return {
        ...state,
        loading: false,
        companyrequests: state.companyrequests.map(companyrequest => companyrequest._id === payload._id ? payload : companyrequest)
      };

    case GET_COMPANY_REQUESTS:
      return {
        ...state,
        loading: false,
        companyrequests: payload
      };


    case GET_COMPANY_REQUEST:
      return {
        ...state,
        loading: false,
        companyrequest: payload
      };

    case DELETE_COMPANY_REQUEST:
      return {
        ...state,
        loading: false,
        companyrequests: state.companyrequests.filter(companyrequest => companyrequest._id != payload)
      };

    case COMPANY_REQUEST_ERROR:
      return {
        ...state,
        error: payload,
        companyrequest: null,
        companyrequests: []
      };

    default:
      return state;
  }
}