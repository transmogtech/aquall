import { CREATE_CHEMICAL_CATEGORY, GET_CHEMICAL_CATEGORIES, CHEMICAL_CATEGORY_ERROR, DELETE_CHEMICAL_CATEGORY, CHANGE_STATUS_CHEMICAL_CATEGORY, GET_CHEMICAL_CATEGORY, UPDATE_CHEMICAL_CATEGORY } from "../actions/types";

const initialState = {
  loading: true,
  chemicalcategories: [],
  chemicalcategory: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {

    case CREATE_CHEMICAL_CATEGORY:
      return {
        ...state,
        loading: false,
        chemicalcategories: [payload, ...state.chemicalcategories]
      };


    case CHANGE_STATUS_CHEMICAL_CATEGORY:
    case UPDATE_CHEMICAL_CATEGORY:
      return {
        ...state,
        loading: false,
        chemicalcategories: state.chemicalcategories.map(chemicalcategory => chemicalcategory._id === payload._id ? payload : chemicalcategory)
      };

    case GET_CHEMICAL_CATEGORIES:
      return {
        ...state,
        loading: false,
        chemicalcategories: payload
      };


    case GET_CHEMICAL_CATEGORY:
      return {
        ...state,
        loading: false,
        chemicalcategory: payload
      };

    case DELETE_CHEMICAL_CATEGORY:
      return {
        ...state,
        loading: false,
        chemicalcategories: state.chemicalcategories.filter(chemicalcategory => chemicalcategory._id != payload)
      };

    case CHEMICAL_CATEGORY_ERROR:
      return {
        ...state,
        error: payload,
        chemicalcategory: null,
        chemicalcategories: []
      };

    default:
      return state;
  }
}