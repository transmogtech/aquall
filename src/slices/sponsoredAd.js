import { CREATE_SPONSORED_AD, GET_SPONSORED_ADS, SPONSORED_AD_ERROR, DELETE_SPONSORED_AD, CHANGE_STATUS_SPONSORED_AD, GET_SPONSORED_AD, UPDATE_SPONSORED_AD } from "../actions/types";

const initialState = {
  loading: true,
  sponsoredads: [],
  sponsoredad: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {

    case CREATE_SPONSORED_AD:
      return {
        ...state,
        loading: false,
        sponsoredads: [...state.sponsoredads, payload]
      };


    case CHANGE_STATUS_SPONSORED_AD:
    case UPDATE_SPONSORED_AD:
      return {
        ...state,
        loading: false,
        sponsoredads: state.sponsoredads.map(sponsoredad => sponsoredad._id === payload._id ? payload : sponsoredad)
      };

    case GET_SPONSORED_ADS:
      return {
        ...state,
        loading: false,
        sponsoredads: payload
      };


    case GET_SPONSORED_AD:
      return {
        ...state,
        loading: false,
        sponsoredad: payload
      };

    case DELETE_SPONSORED_AD:
      return {
        ...state,
        loading: false,
        sponsoredads: state.sponsoredads.filter(sponsoredad => sponsoredad._id != payload)
      };

    case SPONSORED_AD_ERROR:
      return {
        ...state,
        error: payload,
        sponsoredad: null,
        sponsoredads: []
      };

    default:
      return state;
  }
}