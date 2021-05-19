import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";

import Logo from "./assets/images/github.svg";
import Header from "./components/header/header.component";
import Issues from "./pages/issues/issues.component";

function App() {
  return (
    <div className="app-wrapper">
      <div className="logo">
        <img src={Logo} alt="logo" />
        <h1>Issue_Finder</h1>
      </div>
      <Header />
      <Router>
        <Route path="/" component={Issues} />
      </Router>
    </div>
  );
}

export default App;
