import React from 'react';
import './App.css';
import { Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import UserPage from "./components/UserPage";
import Bottom from "./components/Bottom";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/user" component={UserPage}/>
      </Switch>
      <Bottom />
    </div>
  );
}

export default App;
