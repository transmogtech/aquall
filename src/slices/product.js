import { CREATE_PRODUCT, GET_PRODUCTS, PRODUCT_ERROR, DELETE_PRODUCT, CHANGE_STATUS_PRODUCT, GET_PRODUCT, UPDATE_PRODUCT } from "../actions/types";

const initialState = {
  loading: true,
  products: [],
  product: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {

    case CREATE_PRODUCT:
      return {
        ...state,
        loading: false,
        products: [...state.products, payload]
      };


    case CHANGE_STATUS_PRODUCT:
    case UPDATE_PRODUCT:
      return {
        ...state,
        loading: false,
        products: state.products.map(product => product._id === payload._id ? payload : product)
      };

    case GET_PRODUCTS:
      return {
        ...state,
        loading: false,
        products: payload
      };


    case GET_PRODUCT:
      return {
        ...state,
        loading: false,
        product: payload
      };

    case DELETE_PRODUCT:
      return {
        ...state,
        loading: false,
        products: state.products.filter(product => product._id != payload)
      };

    case PRODUCT_ERROR:
      return {
        ...state,
        error: payload,
        product: null,
        products: []
      };

    default:
      return state;
  }
}