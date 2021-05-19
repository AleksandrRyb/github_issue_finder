import React from "react";

import "./issue-item.styles.scss";

function IssueItem({ avatar, created, title, number }) {
  return (
    <li className="issue-item">
      <div>
        <img className="avatar" src={avatar} alt={`issue number ${number}`} />
        <span className="description">{title}</span>
      </div>
      <span className="number">
        #{number} opened on {created}
      </span>
    </li>
  );
}

export default IssueItem;
