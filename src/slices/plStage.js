import { CREATE_PL_STAGE, GET_PL_STAGES, PL_STAGE_ERROR, DELETE_PL_STAGE, CHANGE_STATUS_PL_STAGE, GET_PL_STAGE, UPDATE_PL_STAGE } from "../actions/types";

const initialState = {
  loading: true,
  plstages: [],
  plstage: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {

    case CREATE_PL_STAGE:
      return {
        ...state,
        loading: false,
        plstages: [...state.plstages, payload]
      };


    case CHANGE_STATUS_PL_STAGE:
    case UPDATE_PL_STAGE:
      return {
        ...state,
        loading: false,
        plstages: state.plstages.map(plstage => plstage._id === payload._id ? payload : plstage)
      };

    case GET_PL_STAGES:
      return {
        ...state,
        loading: false,
        plstages: payload
      };


    case GET_PL_STAGE:
      return {
        ...state,
        loading: false,
        plstage: payload
      };

    case DELETE_PL_STAGE:
      return {
        ...state,
        loading: false,
        plstages: state.plstages.filter(plstage => plstage._id != payload)
      };

    case PL_STAGE_ERROR:
      return {
        ...state,
        error: payload,
        plstage: null,
        plstages: []
      };

    default:
      return state;
  }
}