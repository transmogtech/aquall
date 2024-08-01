import { CREATE_CULTURE_TYPE, GET_CULTURE_TYPES, CULTURE_TYPE_ERROR, DELETE_CULTURE_TYPE, CHANGE_STATUS_CULTURE_TYPE, GET_CULTURE_TYPE, UPDATE_CULTURE_TYPE } from "../actions/types";

const initialState = {
  loading: true,
  culturetypes: [],
  culturetype: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {

    case CREATE_CULTURE_TYPE:
      return {
        ...state,
        loading: false,
        culturetypes: [payload, ...state.culturetypes]
      };


    case CHANGE_STATUS_CULTURE_TYPE:
    case UPDATE_CULTURE_TYPE:
      return {
        ...state,
        loading: false,
        culturetypes: state.culturetypes.map(culturetype => culturetype._id === payload._id ? payload : culturetype)
      };

    case GET_CULTURE_TYPES:
      return {
        ...state,
        loading: false,
        culturetypes: payload
      };


    case GET_CULTURE_TYPE:
      return {
        ...state,
        loading: false,
        culturetype: payload
      };

    case DELETE_CULTURE_TYPE:
      return {
        ...state,
        loading: false,
        culturetypes: state.culturetypes.filter(culturetype => culturetype._id != payload)
      };

    case CULTURE_TYPE_ERROR:
      return {
        ...state,
        error: payload,
        culturetype: null,
        culturetypes: []
      };

    default:
      return state;
  }
}