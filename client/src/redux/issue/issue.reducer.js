import { issueActionTypes as ACTIONS } from "./issue.types";

const initialState = {
  isFetching: false,
  issues: undefined,
  issue: undefined,
  errorMessage: undefined,
};

const issueReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.ISSUES_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case ACTIONS.ISSUES_SUCCESS:
      return {
        ...state,
        isFetching: false,
        issues: action.payload,
      };
    case ACTIONS.ISSUES_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
};

export default issueReducer;
