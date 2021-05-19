import { searchActionTypes as ACTIONS } from "./search.types";

export const searchIssuesStart = (data) => ({
  type: ACTIONS.SEARCH_ISSUES_START,
  payload: data,
});

export const searchIssueEnd = () => ({
  type: ACTIONS.SEARCH_ISSUES_END,
});
