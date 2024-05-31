import { CREATE_APP_BANNER_IMAGE, GET_APP_BANNER_IMAGES, APP_BANNER_IMAGE_ERROR, DELETE_APP_BANNER_IMAGE, CHANGE_STATUS_APP_BANNER_IMAGE, GET_APP_BANNER_IMAGE, UPDATE_APP_BANNER_IMAGE } from "../actions/types";

const initialState = {
  loading: true,
  appbannerimages: [],
  appbannerimage: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {

    case CREATE_APP_BANNER_IMAGE:
      return {
        ...state,
        loading: false,
        appbannerimages: [...state.appbannerimages, payload]
      };


    case CHANGE_STATUS_APP_BANNER_IMAGE:
    case UPDATE_APP_BANNER_IMAGE:
      return {
        ...state,
        loading: false,
        appbannerimages: state.appbannerimages.map(appbannerimage => appbannerimage._id === payload._id ? payload : appbannerimage)
      };

    case GET_APP_BANNER_IMAGES:
      return {
        ...state,
        loading: false,
        appbannerimages: payload
      };


    case GET_APP_BANNER_IMAGE:
      return {
        ...state,
        loading: false,
        appbannerimage: payload
      };

    case DELETE_APP_BANNER_IMAGE:
      return {
        ...state,
        loading: false,
        appbannerimages: state.appbannerimages.filter(appbannerimage => appbannerimage._id != payload)
      };

    case APP_BANNER_IMAGE_ERROR:
      return {
        ...state,
        error: payload,
        appbannerimage: null,
        appbannerimages: []
      };

    default:
      return state;
  }
}