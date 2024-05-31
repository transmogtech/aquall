import { CREATE_COMPANY, GET_COMPANIES, COMPANY_ERROR, DELETE_COMPANY, CHANGE_STATUS_COMPANY, GET_COMPANY, UPDATE_COMPANY } from "../actions/types";

const initialState = {
  loading: true,
  companies: [],
  company: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {

    case CREATE_COMPANY:
      return {
        ...state,
        loading: false,
        companies: [...state.companies, payload]
      };


    case CHANGE_STATUS_COMPANY:
    case UPDATE_COMPANY:
      return {
        ...state,
        loading: false,
        companies: state.companies.map(company => company._id === payload._id ? payload : company)
      };

    case GET_COMPANIES:
      return {
        ...state,
        loading: false,
        companies: payload
      };


    case GET_COMPANY:
      return {
        ...state,
        loading: false,
        company: payload
      };

    case DELETE_COMPANY:
      return {
        ...state,
        loading: false,
        companies: state.companies.filter(company => company._id != payload)
      };

    case COMPANY_ERROR:
      return {
        ...state,
        error: payload,
        company: null,
        companies: []
      };

    default:
      return state;
  }
}