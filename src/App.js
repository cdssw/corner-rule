import React from 'react';
import './App.css';
import { Route, Switch } from "react-router-dom";
import { LoginPage, HomePage } from "components";
import UserPage from "./components/UserPage";
import SignupPage from "./components/SignupPage";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={HomePage}/>
        <Route exact path="/login" component={LoginPage}/>
        <Route exact path="/signup" component={SignupPage}/>
        <Route exact path="/user" component={UserPage}/>
      </Switch>
    </div>
  );
}

export default App;
