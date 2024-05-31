import { CREATE_JOB, GET_JOB, GET_JOBS, JOB_ERROR, DELETE_JOB, CHANGE_STATUS_JOB, UPDATE_JOB } from "../actions/types";

const initialState = {
  loading: true,
  jobs: [],
  job: null,
};



export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {

    case CREATE_JOB:
      return {
        ...state,
        loading: false,
        jobs: [...state.jobs, payload]
      };


    case CHANGE_STATUS_JOB:
    case UPDATE_JOB:
      return {
        ...state,
        loading: false,
        jobs: state.jobs.map(job => job._id === payload._id ? payload : job)
      };

    case GET_JOBS:
      return {
        ...state,
        loading: false,
        jobs: payload
      };


    case GET_JOB:
      return {
        ...state,
        loading: false,
        job: payload
      };

    case DELETE_JOB:
      return {
        ...state,
        loading: false,
        jobs: state.jobs.filter(job => job._id != payload)
      };

    case JOB_ERROR:
      return {
        ...state,
        error: payload,
        job: null
      };

    default:
      return state;
  }
}