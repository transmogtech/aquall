import { CREATE_JOB_APPLICATION, GET_JOB_APPLICATION, GET_JOB_APPLICATIONS, JOB_APPLICATION_ERROR, DELETE_JOB_APPLICATION, CHANGE_STATUS_JOB_APPLICATION, UPDATE_JOB_APPLICATION } from "../actions/types";

const initialState = {
  loading: true,
  jobapplications: [],
  job: null,
};



export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {

    case CREATE_JOB_APPLICATION:
      return {
        ...state,
        loading: false,
        jobapplications: [...state.jobapplications, payload]
      };


    case CHANGE_STATUS_JOB_APPLICATION:
    case UPDATE_JOB_APPLICATION:
      return {
        ...state,
        loading: false,
        jobapplications: state.jobapplications.map(job => job._id === payload._id ? payload : job)
      };

    case GET_JOB_APPLICATIONS:
      return {
        ...state,
        loading: false,
        jobapplications: payload
      };


    case GET_JOB_APPLICATION:
      return {
        ...state,
        loading: false,
        jobapplication: payload
      };

    case DELETE_JOB_APPLICATION:
      return {
        ...state,
        loading: false,
        jobapplications: state.jobapplications.filter(job => job._id != payload)
      };

    case JOB_APPLICATION_ERROR:
      return {
        ...state,
        error: payload,
        jobapplication: null
      };

    default:
      return state;
  }
}