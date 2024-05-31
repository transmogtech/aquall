import { CREATE_PEDDLER_TYPE, GET_PEDDLER_TYPES, PEDDLER_TYPE_ERROR, DELETE_PEDDLER_TYPE, CHANGE_STATUS_PEDDLER_TYPE, GET_PEDDLER_TYPE, UPDATE_PEDDLER_TYPE } from "../actions/types";

const initialState = {
  loading: true,
  peddlertypes: [],
  peddlertype: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {

    case CREATE_PEDDLER_TYPE:
      return {
        ...state,
        loading: false,
        peddlertypes: [...state.peddlertypes, payload]
      };


    case CHANGE_STATUS_PEDDLER_TYPE:
    case UPDATE_PEDDLER_TYPE:
      return {
        ...state,
        loading: false,
        peddlertypes: state.peddlertypes.map(peddlertype => peddlertype._id === payload._id ? payload : peddlertype)
      };

    case GET_PEDDLER_TYPES:
      return {
        ...state,
        loading: false,
        peddlertypes: payload
      };


    case GET_PEDDLER_TYPE:
      return {
        ...state,
        loading: false,
        peddlertype: payload
      };

    case DELETE_PEDDLER_TYPE:
      return {
        ...state,
        loading: false,
        peddlertypes: state.peddlertypes.filter(peddlertype => peddlertype._id != payload)
      };

    case PEDDLER_TYPE_ERROR:
      return {
        ...state,
        error: payload,
        peddlertype: null,
        peddlertypes: []
      };

    default:
      return state;
  }
}