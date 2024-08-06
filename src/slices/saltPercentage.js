import { CREATE_SALT_PERCENTAGE, GET_SALT_PERCENTAGES, SALT_PERCENTAGE_ERROR, DELETE_SALT_PERCENTAGE, CHANGE_STATUS_SALT_PERCENTAGE, GET_SALT_PERCENTAGE, UPDATE_SALT_PERCENTAGE } from "../actions/types";

const initialState = {
  loading: true,
  saltpercentages: [],
  saltpercentage: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {

    case CREATE_SALT_PERCENTAGE:
      return {
        ...state,
        loading: false,
        saltpercentages: [payload, ...state.saltpercentages]
      };


    case CHANGE_STATUS_SALT_PERCENTAGE:
    case UPDATE_SALT_PERCENTAGE:
      return {
        ...state,
        loading: false,
        saltpercentages: state.saltpercentages.map(saltpercentage => saltpercentage._id === payload._id ? payload : saltpercentage)
      };

    case GET_SALT_PERCENTAGES:
      return {
        ...state,
        loading: false,
        saltpercentages: payload
      };


    case GET_SALT_PERCENTAGE:
      return {
        ...state,
        loading: false,
        saltpercentage: payload
      };

    case DELETE_SALT_PERCENTAGE:
      return {
        ...state,
        loading: false,
        saltpercentages: state.saltpercentages.filter(saltpercentage => saltpercentage._id != payload)
      };

    case SALT_PERCENTAGE_ERROR:
      return {
        ...state,
        error: payload,
        saltpercentage: null,
        saltpercentages: []
      };

    default:
      return state;
  }
}