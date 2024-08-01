import { CREATE_SLIDER_IMAGE, GET_SLIDER_IMAGES, SLIDER_IMAGE_ERROR, DELETE_SLIDER_IMAGE, CHANGE_STATUS_SLIDER_IMAGE, GET_SLIDER_IMAGE, UPDATE_SLIDER_IMAGE } from "../actions/types";

const initialState = {
  loading: true,
  sliderimages: [],
  sliderimage: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {

    case CREATE_SLIDER_IMAGE:
      return {
        ...state,
        loading: false,
        sliderimages: [payload, ...state.sliderimages]
      };


    case CHANGE_STATUS_SLIDER_IMAGE:
    case UPDATE_SLIDER_IMAGE:
      return {
        ...state,
        loading: false,
        sliderimages: state.sliderimages.map(sliderimage => sliderimage._id === payload._id ? payload : sliderimage)
      };

    case GET_SLIDER_IMAGES:
      return {
        ...state,
        loading: false,
        sliderimages: payload
      };


    case GET_SLIDER_IMAGE:
      return {
        ...state,
        loading: false,
        sliderimage: payload
      };

    case DELETE_SLIDER_IMAGE:
      return {
        ...state,
        loading: false,
        sliderimages: state.sliderimages.filter(sliderimage => sliderimage._id != payload)
      };

    case SLIDER_IMAGE_ERROR:
      return {
        ...state,
        error: payload,
        sliderimage: null,
        sliderimages: []
      };

    default:
      return state;
  }
}