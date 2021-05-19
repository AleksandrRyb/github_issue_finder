import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { getIssues } from "../../redux/issue/issue.actions";
import IssueItem from "../../components/issue-item/issue-item.component";

function Issues() {
  const dispatch = useDispatch();
  const { issues } = useSelector((state) => state.issue);
  const { searchIssues, issuesData } = useSelector((state) => state.search);

  React.useEffect(() => {
    document.title = "Issue_Finder | Issues";
  });

  React.useEffect(() => {
    if (searchIssues) {
      dispatch(getIssues(issuesData));
    }
  }, [searchIssues, issuesData]);

  const showIssues = () => {
    return (
      issues &&
      issues.map((issue) => (
        <IssueItem
          title={issue.title}
          created={issue.created_at}
          avatar={issue.user.avatar_url}
          number={issue.number}
        />
      ))
    );
  };

  return (
    <div className="issues-page">
      <ul>{showIssues()}</ul>
    </div>
  );
}

export default Issues;
