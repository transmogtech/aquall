import { CREATE_PINCODE, GET_PINCODES, PINCODE_ERROR, DELETE_PINCODE, CHANGE_STATUS_PINCODE, GET_PINCODE, UPDATE_PINCODE } from "../actions/types";

const initialState = {
  loading: true,
  pincodes: [],
  pincode: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {

    case CREATE_PINCODE:
      return {
        ...state,
        loading: false,
        pincodes: [payload, ...state.pincodes]
      };


    case CHANGE_STATUS_PINCODE:
    case UPDATE_PINCODE:
      return {
        ...state,
        loading: false,
        pincodes: state.pincodes.map(pincode => pincode._id === payload._id ? payload : pincode)
      };

    case GET_PINCODES:
      return {
        ...state,
        loading: false,
        pincodes: payload
      };


    case GET_PINCODE:
      return {
        ...state,
        loading: false,
        pincode: payload
      };

    case DELETE_PINCODE:
      return {
        ...state,
        loading: false,
        pincodes: state.pincodes.filter(pincode => pincode._id != payload)
      };

    case PINCODE_ERROR:
      return {
        ...state,
        error: payload,
        pincode: null,
        pincodes: []
      };

    default:
      return state;
  }
}