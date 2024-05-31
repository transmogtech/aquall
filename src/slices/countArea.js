import { CREATE_COUNT_AREA, GET_COUNT_AREAS, COUNT_AREA_ERROR, DELETE_COUNT_AREA, CHANGE_STATUS_COUNT_AREA, GET_COUNT_AREA, UPDATE_COUNT_AREA } from "../actions/types";

const initialState = {
  loading: true,
  countareas: [],
  countarea: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {

    case CREATE_COUNT_AREA:
      return {
        ...state,
        loading: false,
        countareas: [...state.countareas, payload]
      };


    case CHANGE_STATUS_COUNT_AREA:
    case UPDATE_COUNT_AREA:
      return {
        ...state,
        loading: false,
        countareas: state.countareas.map(countarea => countarea._id === payload._id ? payload : countarea)
      };

    case GET_COUNT_AREAS:
      return {
        ...state,
        loading: false,
        countareas: payload
      };


    case GET_COUNT_AREA:
      return {
        ...state,
        loading: false,
        countarea: payload
      };

    case DELETE_COUNT_AREA:
      return {
        ...state,
        loading: false,
        countareas: state.countareas.filter(countarea => countarea._id != payload)
      };

    case COUNT_AREA_ERROR:
      return {
        ...state,
        error: payload,
        countarea: null,
        countareas: []
      };

    default:
      return state;
  }
}