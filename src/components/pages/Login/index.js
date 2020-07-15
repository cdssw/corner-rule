import React, { useState } from 'react';
import LoginTemplate from "../../templates/LoginTemplate";
import * as Authorization from "../../../services/Authorization";
import * as User from "../../../services/User";
import { setLoginUserInfo, setLogin } from "../../../modules/userInfo";
import { useSelector, useDispatch } from "react-redux";
import LoginForm from "../../organisms/LoginForm";
import { Redirect } from "react-router-dom";

export default function () {
  const { login } = useSelector(state => state.userInfo, []);
  const dispatch = useDispatch();

  const [loginData, setLoginData] = useState({
    username: null,
    password: null
  });
  const [saveId, setSaveId] = useState(false);

  const handleSaveId = (event) => {
    setSaveId(event.target.checked);
  };


  const handleInput = (event) => {
    setLoginData({
      ...loginData,
      [event.target.name]: event.target.value
    });
  };

  const handleLogin = async event => {
    const response = await Authorization.loginCall(loginData);
    localStorage.setItem("token", JSON.stringify(response.data)); // token을 localStorage에 저장
    const userInfo = await User.getUserCall(response.data);
    dispatch(setLoginUserInfo(userInfo.data)); // 가져온 user 정보를 redux에 저장
    dispatch(setLogin()); // login 상태로 처리
  }

  if(login) return <Redirect to='/' />

  return (
    <LoginTemplate
      loginForm={
        <LoginForm
          saveId={saveId}
          onLogin={handleLogin}
          onInput={handleInput}
          onSaveId={handleSaveId}
        />
      }
    />
  );
}
