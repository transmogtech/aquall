import { CREATE_APP_CLASSIFIED_IMAGE, GET_APP_CLASSIFIED_IMAGES, APP_CLASSIFIED_IMAGE_ERROR, DELETE_APP_CLASSIFIED_IMAGE, CHANGE_STATUS_APP_CLASSIFIED_IMAGE, GET_APP_CLASSIFIED_IMAGE, UPDATE_APP_CLASSIFIED_IMAGE } from "../actions/types";

const initialState = {
  loading: true,
  appclassifiedimages: [],
  appclassifiedimage: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {

    case CREATE_APP_CLASSIFIED_IMAGE:
      return {
        ...state,
        loading: false,
        appclassifiedimages: [...state.appclassifiedimages, payload]
      };


    case CHANGE_STATUS_APP_CLASSIFIED_IMAGE:
    case UPDATE_APP_CLASSIFIED_IMAGE:
      return {
        ...state,
        loading: false,
        appclassifiedimages: state.appclassifiedimages.map(appclassifiedimage => appclassifiedimage._id === payload._id ? payload : appclassifiedimage)
      };

    case GET_APP_CLASSIFIED_IMAGES:
      return {
        ...state,
        loading: false,
        appclassifiedimages: payload
      };


    case GET_APP_CLASSIFIED_IMAGE:
      return {
        ...state,
        loading: false,
        appclassifiedimage: payload
      };

    case DELETE_APP_CLASSIFIED_IMAGE:
      return {
        ...state,
        loading: false,
        appclassifiedimages: state.appclassifiedimages.filter(appclassifiedimage => appclassifiedimage._id != payload)
      };

    case APP_CLASSIFIED_IMAGE_ERROR:
      return {
        ...state,
        error: payload,
        appclassifiedimage: null,
        appclassifiedimages: []
      };

    default:
      return state;
  }
}