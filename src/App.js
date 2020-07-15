import React from 'react';
import './App.css';
import { Route, Switch } from "react-router-dom";
import Login from './components/pages/Login';
import Home from "./components/pages/Home";
import UserPage from "./components/UserPage";
import SignupPage from "./components/SignupPage";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/login" component={Login}/>
        <Route exact path="/signup" component={SignupPage}/>
        <Route exact path="/user" component={UserPage}/>
      </Switch>
    </div>
  );
}

export default App;
