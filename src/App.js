import React from 'react';
import './App.css';
import { Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import UserPage from "./components/UserPage";
import LoginPage from './components/LoginPage';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/user" component={UserPage}/>
        <Route exact path="/login" component={LoginPage}/>
      </Switch>
    </div>
  );
}

export default App;
