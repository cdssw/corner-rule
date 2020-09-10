import React from 'react';
import './App.css';
import { Route, Switch } from "react-router-dom";
import { LoginPage, HomePage, SignupPage, MyPage, HopePlacePage, PasswordChangePage, RegPage } from "components";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={HomePage}/>
        <Route exact path="/login" component={LoginPage}/>
        <Route exact path="/signup" component={SignupPage}/>
        <Route exact path="/mypage" component={MyPage}/>
        <Route exact path="/mypage/hope_place" component={HopePlacePage}/>
        <Route exact path="/mypage/pass_change" component={PasswordChangePage}/>
        <Route exact path="/reg" component={RegPage}/>
      </Switch>
    </div>
  );
}

export default App;
