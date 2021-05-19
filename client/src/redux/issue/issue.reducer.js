import { issueActionTypes as ACTIONS } from "./issue.types";

const initialState = {
  issuesRequest: false,
  issuesSuccess: false,
  issueRequest: false,
  issueSuccess: false,
  issues: undefined,
  issue: undefined,
  errorMessage: undefined,
};

const issueReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.ISSUES_REQUEST:
      return {
        ...state,
        issuesRequest: true,
        issuesSuccess: false,
        errorMessage: undefined,
      };
    case ACTIONS.ISSUES_SUCCESS:
      return {
        ...state,
        issuesRequest: false,
        issuesSuccess: true,
        issues: action.payload,
      };
    case ACTIONS.ISSUES_FAILURE:
      return {
        ...state,
        issuesRequest: false,
        issuesSuccess: false,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
};

export default issueReducer;
