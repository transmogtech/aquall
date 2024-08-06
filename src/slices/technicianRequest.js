import { CREATE_TECHNICIAN_REQUEST, GET_TECHNICIAN_REQUESTS, TECHNICIAN_REQUEST_ERROR, DELETE_TECHNICIAN_REQUEST, CHANGE_STATUS_TECHNICIAN_REQUEST, GET_TECHNICIAN_REQUEST, UPDATE_TECHNICIAN_REQUEST } from "../actions/types";

const initialState = {
  loading: true,
  technicianrequests: [],
  technicianrequest: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {

    case CREATE_TECHNICIAN_REQUEST:
      return {
        ...state,
        loading: false,
        technicianrequests: [payload, ...state.technicianrequests]
      };


    case CHANGE_STATUS_TECHNICIAN_REQUEST:
    case UPDATE_TECHNICIAN_REQUEST:
      return {
        ...state,
        loading: false,
        technicianrequests: state.technicianrequests.map(technicianrequest => technicianrequest._id === payload._id ? payload : technicianrequest)
      };

    case GET_TECHNICIAN_REQUESTS:
      return {
        ...state,
        loading: false,
        technicianrequests: payload
      };


    case GET_TECHNICIAN_REQUEST:
      return {
        ...state,
        loading: false,
        technicianrequest: payload
      };

    case DELETE_TECHNICIAN_REQUEST:
      return {
        ...state,
        loading: false,
        technicianrequests: state.technicianrequests.filter(technicianrequest => technicianrequest._id != payload)
      };

    case TECHNICIAN_REQUEST_ERROR:
      return {
        ...state,
        error: payload,
        technicianrequest: null,
        technicianrequests: []
      };

    default:
      return state;
  }
}