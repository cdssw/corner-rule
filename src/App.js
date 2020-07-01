import React from 'react';
import './App.css';
import { Route } from "react-router-dom";
import Home from "./components/Home";
import UserPage from "./components/UserPage";

function App() {
  return (
    <div className="App">
      <Route exact path="/" component={Home}/>
      <Route exact path="/user" component={UserPage}/>
    </div>
  );
}

export default App;
