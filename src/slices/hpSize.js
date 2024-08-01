import { CREATE_HP_SIZE, GET_HP_SIZES, HP_SIZE_ERROR, DELETE_HP_SIZE, CHANGE_STATUS_HP_SIZE, GET_HP_SIZE, UPDATE_HP_SIZE } from "../actions/types";

const initialState = {
  loading: true,
  hpsizes: [],
  hpsize: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {

    case CREATE_HP_SIZE:
      return {
        ...state,
        loading: false,
        hpsizes: [payload, ...state.hpsizes]
      };


    case CHANGE_STATUS_HP_SIZE:
    case UPDATE_HP_SIZE:
      return {
        ...state,
        loading: false,
        hpsizes: state.hpsizes.map(hpsize => hpsize._id === payload._id ? payload : hpsize)
      };

    case GET_HP_SIZES:
      return {
        ...state,
        loading: false,
        hpsizes: payload
      };


    case GET_HP_SIZE:
      return {
        ...state,
        loading: false,
        hpsize: payload
      };

    case DELETE_HP_SIZE:
      return {
        ...state,
        loading: false,
        hpsizes: state.hpsizes.filter(hpsize => hpsize._id != payload)
      };

    case HP_SIZE_ERROR:
      return {
        ...state,
        error: payload,
        hpsize: null,
        hpsizes: []
      };

    default:
      return state;
  }
}