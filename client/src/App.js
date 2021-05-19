import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";

import Logo from "./assets/images/github.svg";
import Header from "./components/header/header.component";
import IssuePage from "./pages/issue/issue.component";
import IssuesPage from "./pages/issues/issues.component";

function App() {
  return (
    <div className="app-wrapper">
      <div className="logo">
        <img src={Logo} alt="logo" />
        <h1>Issue_Finder</h1>
      </div>
      <Header />
      <Router>
        <Switch>
          <Route exact path="/" component={IssuesPage} />
          <Route path="/:issue_number" component={IssuePage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
