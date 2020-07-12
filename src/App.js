import React from 'react';
import './App.css';
import { Route, Switch } from "react-router-dom";
import HomePage from "./components/HomePage";
import UserPage from "./components/UserPage";
import LoginPage from './components/LoginPage';
import SignupPage from "./components/SignupPage";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={HomePage}/>
        <Route exact path="/user" component={UserPage}/>
        <Route exact path="/login" component={LoginPage}/>
        <Route exact path="/signup" component={SignupPage}/>
      </Switch>
    </div>
  );
}

export default App;
