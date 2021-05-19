import React from "react";
import { useDispatch } from "react-redux";

import { searchIssuesStart } from "../../redux/search/search.actions";
import "./header.styles.scss";

function Header() {
  const [owner, setOwner] = React.useState("");
  const [repo, setRepo] = React.useState("");

  const dispatch = useDispatch();

  const onOwnerChange = (e) => {
    setOwner(e.target.value);
  };

  const onRepoChange = (e) => {
    setRepo(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (owner.length && repo.length) {
      dispatch(searchIssuesStart({ owner, repo }));
    }

    setOwner("");
    setRepo("");
  };

  return (
    <div className="header">
      <form onSubmit={onSubmit} className="search-form">
        <input
          className="search-input"
          placeholder="Owner:"
          type="text"
          value={owner}
          onChange={onOwnerChange}
          name="owner"
        />
        <input
          className="search-input"
          placeholder="Repo:"
          type="text"
          value={repo}
          onChange={onRepoChange}
          name="repo"
        />
        <button className="submit-btn" type="submit">
          Search
        </button>
      </form>
      <div className="header__items">
        <a href="/">Logs</a>
      </div>
    </div>
  );
}

export default Header;
