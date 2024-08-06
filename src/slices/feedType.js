import { CREATE_FEED_TYPE, GET_FEED_TYPES, FEED_TYPE_ERROR, DELETE_FEED_TYPE, CHANGE_STATUS_FEED_TYPE, GET_FEED_TYPE, UPDATE_FEED_TYPE } from "../actions/types";

const initialState = {
  loading: true,
  feedtypes: [],
  feedtype: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {

    case CREATE_FEED_TYPE:
      return {
        ...state,
        loading: false,
        feedtypes: [payload, ...state.feedtypes]
      };


    case CHANGE_STATUS_FEED_TYPE:
    case UPDATE_FEED_TYPE:
      return {
        ...state,
        loading: false,
        feedtypes: state.feedtypes.map(feedtype => feedtype._id === payload._id ? payload : feedtype)
      };

    case GET_FEED_TYPES:
      return {
        ...state,
        loading: false,
        feedtypes: payload
      };


    case GET_FEED_TYPE:
      return {
        ...state,
        loading: false,
        feedtype: payload
      };

    case DELETE_FEED_TYPE:
      return {
        ...state,
        loading: false,
        feedtypes: state.feedtypes.filter(feedtype => feedtype._id != payload)
      };

    case FEED_TYPE_ERROR:
      return {
        ...state,
        error: payload,
        feedtype: null,
        feedtypes: []
      };

    default:
      return state;
  }
}