import { combineReducers } from "redux";

import issueReducer from "./issue/issue.reducer";
import searchReducer from "./search/search.reducer";

const rootReducer = combineReducers({
  issue: issueReducer,
  search: searchReducer,
});

export default rootReducer;
