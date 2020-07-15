import React, { useState } from 'react';
import LoginTemplate from "../../templates/LoginTemplate";
import * as Authorization from "../../../services/Authorization";
import * as User from "../../../services/User";
import { setLoginUserInfo } from "../../../modules/userInfo";
import { useDispatch } from "react-redux";
import LoginForm from "../../organisms/LoginForm";

export default function () {
  const dispatch = useDispatch();

  const [login, setLogin] = useState({
    username: null,
    password: null
  });

  const handleInput = (event) => {
    setLogin({
      ...login,
      [event.target.name]: event.target.value
    });
  };

  const handleLogin = async event => {
    const response = await Authorization.loginCall(login);
    localStorage.setItem("token", JSON.stringify(response.data)); // token을 localStorage에 저장
    const userInfo = await User.getUserCall(response.data);
    dispatch(setLoginUserInfo(userInfo.data)); // 가져온 user 정보를 redux에 저장
    console.log(userInfo);
  }

  return (
    <LoginTemplate
      loginForm={<LoginForm handleLogin={handleLogin} handleInput={handleInput} login={login} />}
    />
  );
}
