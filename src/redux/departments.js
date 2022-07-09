import * as ActionTypes from "./ActionTypes";

export const Departments = (
  state = {
    isLoading: true,
    errMess: null,
    departments: [],
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.ADD_DEPARTMENTS:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        departments: action.payload,
      };
    case ActionTypes.DEPARTMENTS_LOADING:
      return { ...state, isLoading: true, errMess: null, departments: [] };
    case ActionTypes.DEPARTMENTS_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
      };
    // case ActionTypes.ADD_STAFF:
    //   return { ...state, departments: action.payload };
    default:
      return state;
  }
};
