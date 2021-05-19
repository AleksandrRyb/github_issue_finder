import React from "react";
import "./issue.styles.scss";
import { useSelector, useDispatch } from "react-redux";

import { getIssue } from "../../redux/issue/issue.actions";

function IssuePage({ location }) {
  const [issueParams, setIssueParams] = React.useState(location.state);
  const { issue } = useSelector((state) => state.issue);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getIssue(issueParams));
  }, []);

  console.log(issue);
  return (
    <div className="issue-page">
      <h1>{issue?.title}</h1>
      <div>{issue?.body}</div>
    </div>
  );
}

export default IssuePage;
