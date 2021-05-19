import React from "react";
import avatar from "../../assets/images/avatar.png";

import "./issue-item.styles.scss";

function IssueItem({ avatar, created, title, number }) {
  return (
    <li className="issue-item">
      <div>
        <img className="avatar" src={avatar} alt="" />
        <span className="description">{title}</span>
      </div>
      <span className="number">
        #{number} opened on {created}
      </span>
    </li>
  );
}

export default IssueItem;
