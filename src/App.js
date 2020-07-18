import React from 'react';
import './App.css';
import { Route, Switch } from "react-router-dom";
import { LoginPage, HomePage } from "components";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={HomePage}/>
        <Route exact path="/login" component={LoginPage}/>
      </Switch>
    </div>
  );
}

export default App;
