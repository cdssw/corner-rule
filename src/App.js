import React from 'react';
import './App.css';
import { Route, Switch } from "react-router-dom";
import { 
  LoginPage, 
  HomePage, 
  SignupPage, 
  SignupIntroPage,
  MyPage, 
  HopePlacePage, 
  PasswordChangePage, 
  MyInfoChangePage,
  RegPage, 
  ContentPage,
  AddressPage
} from "components";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={HomePage}/>
        <Route exact path="/login" component={LoginPage}/>
        <Route exact path="/signup" component={SignupPage}/>
        <Route exact path="/signup_intro" component={SignupIntroPage}/>
        <Route exact path="/mypage" component={MyPage}/>
        <Route exact path="/mypage/hope_place" component={HopePlacePage}/>
        <Route exact path="/mypage/pass_change" component={PasswordChangePage}/>
        <Route exact path="/mypage/info_change" component={MyInfoChangePage}/>
        <Route exact path="/reg" component={RegPage}/>
        <Route exact path="/content/:id" component={ContentPage}/>
        <Route exact path="/address" component={AddressPage}/>
      </Switch>
    </div>
  );
}

export default App;
