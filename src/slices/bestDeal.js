import { CREATE_BEST_DEAL, GET_BEST_DEALS, BEST_DEAL_ERROR, DELETE_BEST_DEAL, CHANGE_STATUS_BEST_DEAL, GET_BEST_DEAL, UPDATE_BEST_DEAL } from "../actions/types";

const initialState = {
  loading: true,
  bestdeals: [],
  bestdeal: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {

    case CREATE_BEST_DEAL:
      return {
        ...state,
        loading: false,
        bestdeals: [payload, ...state.bestdeals]
      };


    case CHANGE_STATUS_BEST_DEAL:
    case UPDATE_BEST_DEAL:
      return {
        ...state,
        loading: false,
        bestdeals: state.bestdeals.map(bestdeal => bestdeal._id === payload._id ? payload : bestdeal)
      };

    case GET_BEST_DEALS:
      return {
        ...state,
        loading: false,
        bestdeals: payload
      };


    case GET_BEST_DEAL:
      return {
        ...state,
        loading: false,
        bestdeal: payload
      };

    case DELETE_BEST_DEAL:
      return {
        ...state,
        loading: false,
        bestdeals: state.bestdeals.filter(bestdeal => bestdeal._id != payload)
      };

    case BEST_DEAL_ERROR:
      return {
        ...state,
        error: payload,
        bestdeal: null,
        bestdeals: []
      };

    default:
      return state;
  }
}