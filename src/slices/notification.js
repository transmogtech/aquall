import { CREATE_NOTIFICATION, GET_NOTIFICATIONS, NOTIFICATION_ERROR, DELETE_NOTIFICATION, CHANGE_STATUS_NOTIFICATION, GET_NOTIFICATION, UPDATE_NOTIFICATION } from "../actions/types";

const initialState = {
  loading: true,
  notifications: [],
  notification: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {

    case CREATE_NOTIFICATION:
      return {
        ...state,
        loading: false,
        notifications: [payload, ...state.notifications]
      };


    case CHANGE_STATUS_NOTIFICATION:
    case UPDATE_NOTIFICATION:
      return {
        ...state,
        loading: false,
        notifications: state.notifications.map(notification => notification._id === payload._id ? payload : notification)
      };

    case GET_NOTIFICATIONS:
      return {
        ...state,
        loading: false,
        notifications: payload
      };


    case GET_NOTIFICATION:
      return {
        ...state,
        loading: false,
        notification: payload
      };

    case DELETE_NOTIFICATION:
      return {
        ...state,
        loading: false,
        notifications: state.notifications.filter(notification => notification._id != payload)
      };

    case NOTIFICATION_ERROR:
      return {
        ...state,
        error: payload,
        notification: null,
        notifications: []
      };

    default:
      return state;
  }
}