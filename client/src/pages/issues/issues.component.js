import React from "react";
import "./issues.styles.scss";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { getIssues } from "../../redux/issue/issue.actions";

import IssueItem from "../../components/issue-item/issue-item.component";
import CustomPagination from "../../components/custom-pagination/custom-pagination.component";
import CustomToast, {
  toastSettings,
} from "../../components/custom-toast/custom-toast.component";

function IssuesPage() {
  const [page, setPage] = React.useState(0);
  const { issues, issuesSuccess, issuesRequest, errorMessage } = useSelector(
    (state) => state.issue
  );
  const { searchIssues, issuesData } = useSelector((state) => state.search);
  const dispatch = useDispatch();
  const history = useHistory();

  //Change title of document
  React.useEffect(() => {
    document.title = "Issue_Finder | Issues";
  }, []);

  //Observe navbar form
  React.useEffect(() => {
    if (searchIssues) {
      dispatch(getIssues(issuesData));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchIssues, issuesData]);

  //Observe for data fetching
  React.useEffect(() => {
    if (!errorMessage && issuesSuccess) {
      toast.success(`You got ${issues.length} results`, toastSettings);
    } else if (errorMessage && !issuesSuccess) {
      toast.error(errorMessage);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errorMessage, issuesSuccess, issuesRequest]);

  const handleIssueClick = (number) => {
    const issueParams = {
      owner: issuesData.owner,
      repo: issuesData.repo,
      issue_number: number,
    };
    history.push(`${number}`, issueParams);
  };

  const showIssues = () => {
    return (
      issues &&
      issues
        .slice(page * 10, (page + 1) * 10)
        .map((issue) => (
          <IssueItem
            key={issue.id}
            title={issue.title}
            created={issue.created_at}
            avatar={issue.user.avatar_url}
            number={issue.number}
            handleClick={handleIssueClick}
          />
        ))
    );
  };

  const handlePageChange = (data) => {
    setPage(data.selected);
  };

  return (
    <div className="issues-page-wrapper">
      <div className="issues-page">
        <ul>{showIssues()}</ul>
      </div>
      <CustomPagination
        handleChange={handlePageChange}
        pageCount={issues?.length / 10 || null}
      />
      <CustomToast />
    </div>
  );
}

export default IssuesPage;
