import { CREATE_AREA, GET_AREAS, AREA_ERROR, DELETE_AREA, CHANGE_STATUS_AREA, GET_AREA, UPDATE_AREA } from "../actions/types";

const initialState = {
  loading: true,
  areas: [],
  area: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {

    case CREATE_AREA:
      return {
        ...state,
        loading: false,
        areas: [...state.areas, payload]
      };


    case CHANGE_STATUS_AREA:
    case UPDATE_AREA:
      return {
        ...state,
        loading: false,
        areas: state.areas.map(area => area._id === payload._id ? payload : area)
      };

    case GET_AREAS:
      return {
        ...state,
        loading: false,
        areas: payload
      };


    case GET_AREA:
      return {
        ...state,
        loading: false,
        area: payload
      };

    case DELETE_AREA:
      return {
        ...state,
        loading: false,
        areas: state.areas.filter(area => area._id != payload)
      };

    case AREA_ERROR:
      return {
        ...state,
        error: payload,
        area: null,
        areas: []
      };

    default:
      return state;
  }
}