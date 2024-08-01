import { CREATE_ADVERTISEMENT, GET_ADVERTISEMENTS, ADVERTISEMENT_ERROR, DELETE_ADVERTISEMENT, CHANGE_STATUS_ADVERTISEMENT, GET_ADVERTISEMENT, UPDATE_ADVERTISEMENT } from "../actions/types";

const initialState = {
  loading: true,
  advertisements: [],
  advertisement: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {

    case CREATE_ADVERTISEMENT:
      return {
        ...state,
        loading: false,
        advertisements: [payload, ...state.advertisements]
      };


    case CHANGE_STATUS_ADVERTISEMENT:
    case UPDATE_ADVERTISEMENT:
      return {
        ...state,
        loading: false,
        advertisements: state.advertisements.map(advertisement => advertisement._id === payload._id ? payload : advertisement)
      };

    case GET_ADVERTISEMENTS:
      return {
        ...state,
        loading: false,
        advertisements: payload
      };


    case GET_ADVERTISEMENT:
      return {
        ...state,
        loading: false,
        advertisement: payload
      };

    case DELETE_ADVERTISEMENT:
      return {
        ...state,
        loading: false,
        advertisements: state.advertisements.filter(advertisement => advertisement._id != payload)
      };

    case ADVERTISEMENT_ERROR:
      return {
        ...state,
        error: payload,
        advertisement: null,
        advertisements: []
      };

    default:
      return state;
  }
}