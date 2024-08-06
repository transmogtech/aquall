import { CREATE_COUNT, GET_COUNTS, COUNT_ERROR, DELETE_COUNT, CHANGE_STATUS_COUNT, GET_COUNT, UPDATE_COUNT } from "../actions/types";

const initialState = {
  loading: true,
  counts: [],
  count: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {

    case CREATE_COUNT:
      return {
        ...state,
        loading: false,
        counts: [payload, ...state.counts]
      };


    case CHANGE_STATUS_COUNT:
    case UPDATE_COUNT:
      return {
        ...state,
        loading: false,
        counts: state.counts.map(count => count._id === payload._id ? payload : count)
      };

    case GET_COUNTS:
      return {
        ...state,
        loading: false,
        counts: payload
      };


    case GET_COUNT:
      return {
        ...state,
        loading: false,
        count: payload
      };

    case DELETE_COUNT:
      return {
        ...state,
        loading: false,
        counts: state.counts.filter(count => count._id != payload)
      };

    case COUNT_ERROR:
      return {
        ...state,
        error: payload,
        count: null,
        counts: []
      };

    default:
      return state;
  }
}