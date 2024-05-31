import { CREATE_LAB_REQUEST, GET_LAB_REQUESTS, LAB_REQUEST_ERROR, DELETE_LAB_REQUEST, CHANGE_STATUS_LAB_REQUEST, GET_LAB_REQUEST, UPDATE_LAB_REQUEST } from "../actions/types";

const initialState = {
  loading: true,
  labrequests: [],
  labrequest: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {

    case CREATE_LAB_REQUEST:
      return {
        ...state,
        loading: false,
        labrequests: [...state.labrequests, payload]
      };


    case CHANGE_STATUS_LAB_REQUEST:
    case UPDATE_LAB_REQUEST:
      return {
        ...state,
        loading: false,
        labrequests: state.labrequests.map(labrequest => labrequest._id === payload._id ? payload : labrequest)
      };

    case GET_LAB_REQUESTS:
      return {
        ...state,
        loading: false,
        labrequests: payload
      };


    case GET_LAB_REQUEST:
      return {
        ...state,
        loading: false,
        labrequest: payload
      };

    case DELETE_LAB_REQUEST:
      return {
        ...state,
        loading: false,
        labrequests: state.labrequests.filter(labrequest => labrequest._id != payload)
      };

    case LAB_REQUEST_ERROR:
      return {
        ...state,
        error: payload,
        labrequest: null,
        labrequests: []
      };

    default:
      return state;
  }
}