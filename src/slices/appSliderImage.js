import { CREATE_APP_SLIDER_IMAGE, GET_APP_SLIDER_IMAGES, APP_SLIDER_IMAGE_ERROR, DELETE_APP_SLIDER_IMAGE, CHANGE_STATUS_APP_SLIDER_IMAGE, GET_APP_SLIDER_IMAGE, UPDATE_APP_SLIDER_IMAGE } from "../actions/types";

const initialState = {
  loading: true,
  appsliderimages: [],
  appsliderimage: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {

    case CREATE_APP_SLIDER_IMAGE:
      return {
        ...state,
        loading: false,
        appsliderimages: [payload, ...state.appsliderimages]
      };


    case CHANGE_STATUS_APP_SLIDER_IMAGE:
    case UPDATE_APP_SLIDER_IMAGE:
      return {
        ...state,
        loading: false,
        appsliderimages: state.appsliderimages.map(appsliderimage => appsliderimage._id === payload._id ? payload : appsliderimage)
      };

    case GET_APP_SLIDER_IMAGES:
      return {
        ...state,
        loading: false,
        appsliderimages: payload
      };


    case GET_APP_SLIDER_IMAGE:
      return {
        ...state,
        loading: false,
        appsliderimage: payload
      };

    case DELETE_APP_SLIDER_IMAGE:
      return {
        ...state,
        loading: false,
        appsliderimages: state.appsliderimages.filter(appsliderimage => appsliderimage._id != payload)
      };

    case APP_SLIDER_IMAGE_ERROR:
      return {
        ...state,
        error: payload,
        appsliderimage: null,
        appsliderimages: []
      };

    default:
      return state;
  }
}