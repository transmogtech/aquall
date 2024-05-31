import { CREATE_COUNT_TYPE, GET_COUNT_TYPES, COUNT_TYPE_ERROR, DELETE_COUNT_TYPE, CHANGE_STATUS_COUNT_TYPE, GET_COUNT_TYPE, UPDATE_COUNT_TYPE } from "../actions/types";

const initialState = {
  loading: true,
  counttypes: [],
  counttype: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {

    case CREATE_COUNT_TYPE:
      return {
        ...state,
        loading: false,
        counttypes: [...state.counttypes, payload]
      };


    case CHANGE_STATUS_COUNT_TYPE:
    case UPDATE_COUNT_TYPE:
      return {
        ...state,
        loading: false,
        counttypes: state.counttypes.map(counttype => counttype._id === payload._id ? payload : counttype)
      };

    case GET_COUNT_TYPES:
      return {
        ...state,
        loading: false,
        counttypes: payload
      };


    case GET_COUNT_TYPE:
      return {
        ...state,
        loading: false,
        counttype: payload
      };

    case DELETE_COUNT_TYPE:
      return {
        ...state,
        loading: false,
        counttypes: state.counttypes.filter(counttype => counttype._id != payload)
      };

    case COUNT_TYPE_ERROR:
      return {
        ...state,
        error: payload,
        counttype: null,
        counttypes: []
      };

    default:
      return state;
  }
}