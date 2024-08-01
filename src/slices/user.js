import { CREATE_USER, GET_USERS, USER_ERROR, DELETE_USER, CHANGE_STATUS_USER, GET_USER, UPDATE_USER } from "../actions/types";

const initialState = {
  loading: true,
  users: [],
  user: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {

    case CREATE_USER:
      return {
        ...state,
        loading: false,
        users: [payload, ...state.users]
      };


    case CHANGE_STATUS_USER:
    case UPDATE_USER:
      return {
        ...state,
        loading: false,
        users: state.users.map(user => user._id === payload._id ? payload : user)
      };

    case GET_USERS:
      return {
        ...state,
        loading: false,
        users: payload
      };


    case GET_USER:
      return {
        ...state,
        loading: false,
        user: payload
      };

    case DELETE_USER:
      return {
        ...state,
        loading: false,
        users: state.users.filter(user => user._id != payload)
      };

    case USER_ERROR:
      return {
        ...state,
        error: payload,
        user: null,
        users: []
      };

    default:
      return state;
  }
}