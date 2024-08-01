import { CREATE_BANNER_IMAGE, GET_BANNER_IMAGES, BANNER_IMAGE_ERROR, DELETE_BANNER_IMAGE, CHANGE_STATUS_BANNER_IMAGE, GET_BANNER_IMAGE, UPDATE_BANNER_IMAGE } from "../actions/types";

const initialState = {
  loading: true,
  bannerimages: [],
  bannerimage: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {

    case CREATE_BANNER_IMAGE:
      return {
        ...state,
        loading: false,
        bannerimages: [payload, ...state.bannerimages]
      };


    case CHANGE_STATUS_BANNER_IMAGE:
    case UPDATE_BANNER_IMAGE:
      return {
        ...state,
        loading: false,
        bannerimages: state.bannerimages.map(bannerimage => bannerimage._id === payload._id ? payload : bannerimage)
      };

    case GET_BANNER_IMAGES:
      return {
        ...state,
        loading: false,
        bannerimages: payload
      };


    case GET_BANNER_IMAGE:
      return {
        ...state,
        loading: false,
        bannerimage: payload
      };

    case DELETE_BANNER_IMAGE:
      return {
        ...state,
        loading: false,
        bannerimages: state.bannerimages.filter(bannerimage => bannerimage._id != payload)
      };

    case BANNER_IMAGE_ERROR:
      return {
        ...state,
        error: payload,
        bannerimage: null,
        bannerimages: []
      };

    default:
      return state;
  }
}