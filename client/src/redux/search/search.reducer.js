import { searchActionTypes as ACTIONS } from "./search.types";

const initialState = {
  searchIssues: false,
  issuesData: null,
};

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.SEARCH_ISSUES_START:
      return {
        ...state,
        searchIssues: true,
        issuesData: action.payload,
      };
    case ACTIONS.SEARCH_ISSUES_END:
      return {
        ...state,
        searchIssues: false,
      };
    default:
      return state;
  }
};

export default searchReducer;
