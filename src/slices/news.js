import { ADD_NEWS, GET_NEWS, NEWS_ERROR, DELETE_NEWS, CHANGE_STATUS_NEWS, SINGLE_NEWS, UPDATE_NEWS } from "../actions/types";

const initialState = {
  loading: true,
  newsList: [],
  news: null,
};



export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {

    case ADD_NEWS:
      return {
        ...state,
        loading: false,
        newsList: [...state.newsList, payload]
      };


    case CHANGE_STATUS_NEWS:
    case UPDATE_NEWS:
      return {
        ...state,
        loading: false,
        newsList: state.newsList.map(news => news._id === payload._id ? payload : news)
      };

    case GET_NEWS:
      return {
        ...state,
        loading: false,
        newsList: payload
      };


    case SINGLE_NEWS:
      return {
        ...state,
        loading: false,
        news: payload
      };

    case DELETE_NEWS:
      return {
        ...state,
        loading: false,
        newsList: state.newsList.filter(news => news._id != payload)
      };

    case NEWS_ERROR:
      return {
        ...state,
        error: payload,
        news: null
      };

    default:
      return state;
  }
}