import { CREATE_USER_ROLE, GET_USER_ROLES, USER_ROLE_ERROR, DELETE_USER_ROLE, CHANGE_STATUS_USER_ROLE, GET_USER_ROLE, UPDATE_USER_ROLE } from "../actions/types";

const initialState = {
  loading: true,
  userroles: [],
  userrole: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {

    case CREATE_USER_ROLE:
      return {
        ...state,
        loading: false,
        userroles: [payload, ...state.userroles]
      };


    case CHANGE_STATUS_USER_ROLE:
    case UPDATE_USER_ROLE:
      return {
        ...state,
        loading: false,
        userroles: state.userroles.map(userrole => userrole._id === payload._id ? payload : userrole)
      };

    case GET_USER_ROLES:
      return {
        ...state,
        loading: false,
        userroles: payload
      };


    case GET_USER_ROLE:
      return {
        ...state,
        loading: false,
        userrole: payload
      };

    case DELETE_USER_ROLE:
      return {
        ...state,
        loading: false,
        userroles: state.userroles.filter(userrole => userrole._id != payload)
      };

    case USER_ROLE_ERROR:
      return {
        ...state,
        error: payload,
        userrole: null,
        userroles: []
      };

    default:
      return state;
  }
}