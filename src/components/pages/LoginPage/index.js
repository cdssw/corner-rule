import React, { useState } from 'react';
import * as Authorization from "../../../services/Authorization";
import * as User from "../../../services/User";
import { setLoginUserInfo, setLogin } from "../../../modules/userInfo";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { LoginTemplate, LoginForm, Footer } from "components";

export default function LoginPage() {
  const { login } = useSelector(state => state.userInfo, []);
  const [loading, setLoading] = useState(false);
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
    setLoading(true);
    try {
      const response = await Authorization.loginCall(loginData);
      if(response === undefined) {
        setLoginData({
          username: '',
          password: ''
        });
        return;
      }
      localStorage.setItem("token", JSON.stringify(response.data)); // token을 localStorage에 저장
      const userInfo = await User.getUser(response.data);
      dispatch(setLoginUserInfo(userInfo.data)); // 가져온 user 정보를 redux에 저장
      dispatch(setLogin(true)); // login 상태로 처리
    } catch(error) {
      if(error.response.data.error_description === 'Bad credentials') {
        alert("아이디와 비밀번호를 확인하고 다시 로그인 하세요.");
      } else {
        alert(error.response.data.message);
        console.log(error.response.data);
      }
    } finally {
      setLoading(false);
    }
  }

  if(login) return <Redirect to='/' />

  return (
    <LoginTemplate footer={<Footer />} loading={loading}>
      <LoginForm
        saveId={saveId}
        onLogin={handleLogin}
        onInput={handleInput}
        onSaveId={handleSaveId}
        username={loginData.username}
        password={loginData.password}
      />
    </LoginTemplate>
  );
}
