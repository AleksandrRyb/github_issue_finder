import { issueActionTypes as ACTIONS } from "./issue.types";

const initialState = {
  issuesRequest: false,
  issuesSuccess: false,
  issues: undefined,
  errorMessage: undefined,
  issue: undefined,
  issueRequest: false,
  issueSuccess: false,
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
    case ACTIONS.ISSUE_REQUEST:
      return {
        ...state,
        issueRequest: true,
        issueSuccess: false,
        errorMessage: undefined,
      };
    case ACTIONS.ISSUE_SUCCESS:
      return {
        ...state,
        issueRequest: false,
        issueSuccess: true,
        issue: action.payload,
      };
    case ACTIONS.ISSUE_FAILURE:
      return {
        ...state,
        issueRequest: false,
        issueSuccess: false,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
};

export default issueReducer;
