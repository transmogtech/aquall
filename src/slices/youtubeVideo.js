import { CREATE_YOUTUBE_VIDEO, GET_YOUTUBE_VIDEOS, YOUTUBE_VIDEO_ERROR, DELETE_YOUTUBE_VIDEO, CHANGE_STATUS_YOUTUBE_VIDEO, GET_YOUTUBE_VIDEO, UPDATE_YOUTUBE_VIDEO } from "../actions/types";

const initialState = {
  loading: true,
  youtubevideos: [],
  youtubevideo: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {

    case CREATE_YOUTUBE_VIDEO:
      return {
        ...state,
        loading: false,
        youtubevideos: [...state.youtubevideos, payload]
      };


    case CHANGE_STATUS_YOUTUBE_VIDEO:
    case UPDATE_YOUTUBE_VIDEO:
      return {
        ...state,
        loading: false,
        youtubevideos: state.youtubevideos.map(youtubevideo => youtubevideo._id === payload._id ? payload : youtubevideo)
      };

    case GET_YOUTUBE_VIDEOS:
      return {
        ...state,
        loading: false,
        youtubevideos: payload
      };


    case GET_YOUTUBE_VIDEO:
      return {
        ...state,
        loading: false,
        youtubevideo: payload
      };

    case DELETE_YOUTUBE_VIDEO:
      return {
        ...state,
        loading: false,
        youtubevideos: state.youtubevideos.filter(youtubevideo => youtubevideo._id != payload)
      };

    case YOUTUBE_VIDEO_ERROR:
      return {
        ...state,
        error: payload,
        youtubevideo: null,
        youtubevideos: []
      };

    default:
      return state;
  }
}