import React from "react";
import moment from "moment";

import "./issue-item.styles.scss";

function IssueItem({ avatar, created, title, number, handleClick }) {
  return (
    <li className="issue-item" onClick={() => handleClick(number)}>
      <div>
        <img className="avatar" src={avatar} alt={`issue number ${number}`} />
        <span className="description">{title}</span>
      </div>
      <span className="number">
        #{number} opened on {moment(created).format("MMM Do YY")}
      </span>
    </li>
  );
}

export default IssueItem;
