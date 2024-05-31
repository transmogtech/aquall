import { CREATE_PRODUCT_REQUEST, GET_PRODUCT_REQUESTS, PRODUCT_REQUEST_ERROR, DELETE_PRODUCT_REQUEST, CHANGE_STATUS_PRODUCT_REQUEST, GET_PRODUCT_REQUEST, UPDATE_PRODUCT_REQUEST } from "../actions/types";

const initialState = {
  loading: true,
  productrequests: [],
  productrequest: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {

    case CREATE_PRODUCT_REQUEST:
      return {
        ...state,
        loading: false,
        productrequests: [...state.productrequests, payload]
      };


    case CHANGE_STATUS_PRODUCT_REQUEST:
    case UPDATE_PRODUCT_REQUEST:
      return {
        ...state,
        loading: false,
        productrequests: state.productrequests.map(productrequest => productrequest._id === payload._id ? payload : productrequest)
      };

    case GET_PRODUCT_REQUESTS:
      return {
        ...state,
        loading: false,
        productrequests: payload
      };


    case GET_PRODUCT_REQUEST:
      return {
        ...state,
        loading: false,
        productrequest: payload
      };

    case DELETE_PRODUCT_REQUEST:
      return {
        ...state,
        loading: false,
        productrequests: state.productrequests.filter(productrequest => productrequest._id != payload)
      };

    case PRODUCT_REQUEST_ERROR:
      return {
        ...state,
        error: payload,
        productrequest: null,
        productrequests: []
      };

    default:
      return state;
  }
}