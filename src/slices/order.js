import { CREATE_ORDER, GET_ORDERS, ORDER_ERROR, DELETE_ORDER, CHANGE_STATUS_ORDER, GET_ORDER, UPDATE_ORDER } from "../actions/types";

const initialState = {
  loading: true,
  orders: [],
  order: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {

    case CREATE_ORDER:
      return {
        ...state,
        loading: false,
        orders: [payload, ...state.orders]
      };


    case CHANGE_STATUS_ORDER:
    case UPDATE_ORDER:
      return {
        ...state,
        loading: false,
        orders: state.orders.map(order => order._id === payload._id ? payload : order)
      };

    case GET_ORDERS:
      return {
        ...state,
        loading: false,
        orders: payload
      };


    case GET_ORDER:
      return {
        ...state,
        loading: false,
        order: payload
      };

    case DELETE_ORDER:
      return {
        ...state,
        loading: false,
        orders: state.orders.filter(order => order._id != payload)
      };

    case ORDER_ERROR:
      return {
        ...state,
        error: payload,
        order: null,
        orders: []
      };

    default:
      return state;
  }
}