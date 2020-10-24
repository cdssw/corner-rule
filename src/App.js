import React from 'react';
import './App.css';
import { Route, Switch } from "react-router-dom";
import { 
  LoginPage, 
  HomePage, 
  SignupPage, 
  SignupIntroPage,
  SignupPolicyPage,
  SignupStep1Page,
  SignupStep2Page,
  SignupStep3Page,
  SignupFinishPage,
  MyPage, 
  HopePlacePage, 
  PasswordChangePage, 
  MyInfoChangePage,
  RegPage, 
  ContentPage,
  AddressPage,
  ChatPage,
} from "components";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={HomePage}/>
        <Route exact path="/login" component={LoginPage}/>
        <Route exact path="/signup" component={SignupPage}/>
        <Route exact path="/signup_intro" component={SignupIntroPage}/>
        <Route exact path="/signup_policy" component={SignupPolicyPage}/>
        <Route exact path="/signup_step1" component={SignupStep1Page}/>
        <Route exact path="/signup_step2" component={SignupStep2Page}/>
        <Route exact path="/signup_step3" component={SignupStep3Page}/>
        <Route exact path="/signup_finish" component={SignupFinishPage}/>
        <Route exact path="/mypage" component={MyPage}/>
        <Route exact path="/mypage/hope_place" component={HopePlacePage}/>
        <Route exact path="/mypage/pass_change" component={PasswordChangePage}/>
        <Route exact path="/mypage/info_change" component={MyInfoChangePage}/>
        <Route exact path="/reg" component={RegPage}/>
        <Route exact path="/content/:id" component={ContentPage}/>
        <Route exact path="/address" component={AddressPage}/>
        <Route exact path="/chat/:id" component={ChatPage}/>
      </Switch>
    </div>
  );
}

export default App;
