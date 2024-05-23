import { CREATE_DISTRICT, GET_DISTRICTS, DISTRICT_ERROR, DELETE_DISTRICT, CHANGE_STATUS_DISTRICT, GET_DISTRICT, UPDATE_DISTRICT } from "../actions/types";

const initialState = {
  loading: true,
  districts: [],
  district: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {

    case CREATE_DISTRICT:
      return {
        ...state,
        loading: false,
        districts: [...state.districts, payload]
      };


    case CHANGE_STATUS_DISTRICT:
    case UPDATE_DISTRICT:
      return {
        ...state,
        loading: false,
        districts: state.districts.map(district => district._id === payload._id ? payload : district)
      };

    case GET_DISTRICTS:
      return {
        ...state,
        loading: false,
        districts: payload
      };


    case GET_DISTRICT:
      return {
        ...state,
        loading: false,
        district: payload
      };

    case DELETE_DISTRICT:
      return {
        ...state,
        loading: false,
        districts: state.districts.filter(district => district._id != payload)
      };

    case DISTRICT_ERROR:
      return {
        ...state,
        error: payload,
        district: null,
        districts: []
      };

    default:
      return state;
  }
}