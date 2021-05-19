import React from "react";
import "./issues.styles.scss";
import { useSelector, useDispatch } from "react-redux";
import ReactPaginate from "react-paginate";
import { getIssues } from "../../redux/issue/issue.actions";
import IssueItem from "../../components/issue-item/issue-item.component";

function Issues() {
  const [page, setPage] = React.useState(0);
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
      <ReactPaginate
        nextLabel={null}
        previousLabel={null}
        pageRangeDisplayed={3}
        containerClassName="pagination"
        pageCount={issues?.length / 10 || null}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default Issues;
