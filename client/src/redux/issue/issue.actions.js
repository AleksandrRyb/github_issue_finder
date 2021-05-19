import axios from "axios";
import { issueActionTypes as ACTIONS } from "./issue.types";

const BASE_URL = "http://localhost:3001/api/v1/issue";

export const getIssues = ({ owner, repo }) => async (dispatch) => {
    dispatch({
      type: ACTIONS.ISSUES_REQUEST,
    });

    try {
      const response = await axios.get(`${BASE_URL}/${owner}/${repo}/100/1`);

      dispatch({
        type: ACTIONS.ISSUES_SUCCESS,
        payload: response.data.issues.data,
      });
    } catch (error) {
      dispatch({
        type: ACTIONS.ISSUES_FAILURE,
        payload: error.response.data.message,
      });
    }
  };

export const getIssue = ({ owner, repo, issue_number }) => async dispatch => {
   dispatch({
      type: ACTIONS.ISSUE_REQUEST,
    });

    try {
      const response = await axios.get(`${BASE_URL}/${owner}/${repo}/${issue_number}`);
      dispatch({
        type: ACTIONS.ISSUE_SUCCESS,
        payload: response.data.issue.data
      });
    } catch (error) {
      dispatch({
        type: ACTIONS.ISSUE_FAILURE,
        payload: error.response,
      });
    }
};
