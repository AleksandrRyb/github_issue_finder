import React from "react";
import { toast } from "react-toastify";
import CustomToast, {
  toastSettings,
} from "../../components/custom-toast/custom-toast.component";

import { useSelector, useDispatch } from "react-redux";

import "./issues.styles.scss";
import { getIssues } from "../../redux/issue/issue.actions";
import IssueItem from "../../components/issue-item/issue-item.component";
import CustomPagination from "../../components/custom-pagination/custom-pagination.component";

function Issues() {
  const [page, setPage] = React.useState(0);
  const { issues, issuesSuccess, issuesRequest, errorMessage } = useSelector(
    (state) => state.issue
  );
  const { searchIssues, issuesData } = useSelector((state) => state.search);
  const dispatch = useDispatch();

  React.useEffect(() => {
    document.title = "Issue_Finder | Issues";
  }, []);

  React.useEffect(() => {
    if (searchIssues) {
      dispatch(getIssues(issuesData));
    }
  }, [searchIssues, issuesData]);

  React.useEffect(() => {
    if (!errorMessage && issuesSuccess) {
      toast.success(`You got ${issues.length} results`, toastSettings);
    } else if (errorMessage && !issuesSuccess) {
      toast.error(errorMessage);
    }
  }, [errorMessage, issuesSuccess, issuesRequest]);

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

export default Issues;
