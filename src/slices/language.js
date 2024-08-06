import { CREATE_LANGUAGE, GET_LANGUAGES, LANGUAGE_ERROR, DELETE_LANGUAGE, CHANGE_STATUS_LANGUAGE, GET_LANGUAGE, UPDATE_LANGUAGE } from "../actions/types";

const initialState = {
  loading: true,
  languages: [],
  language: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {

    case CREATE_LANGUAGE:
      return {
        ...state,
        loading: false,
        languages: [payload, ...state.languages]
      };


    case CHANGE_STATUS_LANGUAGE:
    case UPDATE_LANGUAGE:
      return {
        ...state,
        loading: false,
        languages: state.languages.map(language => language._id === payload._id ? payload : language)
      };

    case GET_LANGUAGES:
      return {
        ...state,
        loading: false,
        languages: payload
      };


    case GET_LANGUAGE:
      return {
        ...state,
        loading: false,
        language: payload
      };

    case DELETE_LANGUAGE:
      return {
        ...state,
        loading: false,
        languages: state.languages.filter(language => language._id != payload)
      };

    case LANGUAGE_ERROR:
      return {
        ...state,
        error: payload,
        language: null,
        languages: []
      };

    default:
      return state;
  }
}