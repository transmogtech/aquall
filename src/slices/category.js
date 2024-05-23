import { CREATE_CATEGORY, GET_CATEGORIES, CATEGORY_ERROR, DELETE_CATEGORY, CHANGE_STATUS_CATEGORY, GET_CATEGORY, UPDATE_CATEGORY } from "../actions/types";

const initialState = {
  loading: true,
  categories: [],
  category: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {

    case CREATE_CATEGORY:
      return {
        ...state,
        loading: false,
        categories: [...state.categories, payload]
      };


    case CHANGE_STATUS_CATEGORY:
    case UPDATE_CATEGORY:
      return {
        ...state,
        loading: false,
        categories: state.categories.map(category => category._id === payload._id ? payload : category)
      };

    case GET_CATEGORIES:
      return {
        ...state,
        loading: false,
        categories: payload
      };


    case GET_CATEGORY:
      return {
        ...state,
        loading: false,
        category: payload
      };

    case DELETE_CATEGORY:
      return {
        ...state,
        loading: false,
        categories: state.categories.filter(category => category._id != payload)
      };

    case CATEGORY_ERROR:
      return {
        ...state,
        error: payload,
        category: null,
        categories: []
      };

    default:
      return state;
  }
}