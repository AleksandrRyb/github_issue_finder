import React from "react";
import ReactPaginate from "react-paginate";

import "./custom-pagination.styles.scss";

function CustomPagination({ handleChange, pageCount }) {
  return (
    <ReactPaginate
      nextLabel={null}
      previousLabel={null}
      pageRangeDisplayed={3}
      containerClassName="pagination"
      pageCount={pageCount}
      onPageChange={handleChange}
      activeClassName="active-page"
    />
  );
}

export default CustomPagination;
