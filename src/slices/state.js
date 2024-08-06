import { CREATE_STATE, GET_STATES, STATE_ERROR, DELETE_STATE, CHANGE_STATUS_STATE, GET_STATE, UPDATE_STATE } from "../actions/types";

const initialState = {
  loading: true,
  states: [],
  state: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {

    case CREATE_STATE:
      return {
        ...state,
        loading: false,
        states: [payload, ...state.states]
      };


    case CHANGE_STATUS_STATE:
    case UPDATE_STATE:
      return {
        ...state,
        loading: false,
        states: state.states.map(state => state._id === payload._id ? payload : state)
      };

    case GET_STATES:
      return {
        ...state,
        loading: false,
        states: payload
      };


    case GET_STATE:
      return {
        ...state,
        loading: false,
        state: payload
      };

    case DELETE_STATE:
      return {
        ...state,
        loading: false,
        states: state.states.filter(state => state._id != payload)
      };

    case STATE_ERROR:
      return {
        ...state,
        error: payload,
        state: null,
        states: []
      };

    default:
      return state;
  }
}