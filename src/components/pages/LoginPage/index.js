import React, { useEffect, useState } from 'react';
import * as Authorization from "../../../services/Authorization";
import * as User from "../../../services/User";
import { setLoginUserInfo, setLogin } from "../../../modules/userInfo";
import { useDispatch } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { LoginTemplate, LoginForm, Footer, Alert } from "components";

export default function LoginPage() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [loginData, setLoginData] = useState({
    username: '',
    password: ''
  });
  const [saveId, setSaveId] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertContent, setAlertContent] = useState('');
  const token = localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")).access_token : null;

  useEffect(e => {
    const username = localStorage.getItem('username');
    if(username) {
      setLoginData({username: username, password: ''});
      setSaveId(true);
    }
  }, []);

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
    if(loginData.username === '' || loginData.password === '') {
      setAlertContent('아이디와 비밀번호를 입력하세요.');
      setAlertOpen(true);
      return;
    }

    setLoading(true);
    try {
      const response = await Authorization.loginCall(loginData);
      if(response === undefined) {
        setLoginData({
          username: localStorage.getItem('username'),
          password: ''
        });
        return;
      }
      localStorage.setItem("token", JSON.stringify(response.data)); // token을 localStorage에 저장
      const userInfo = await User.getUser(response.data.access_token);
      dispatch(setLoginUserInfo(userInfo.data)); // 가져온 user 정보를 redux에 저장
      dispatch(setLogin(true)); // login 상태로 처리

      saveId ? localStorage.setItem('username', loginData.username) : localStorage.setItem('username', '');
    } catch(e) {
      setLoginData({
        username: localStorage.getItem('username'),
        password: ''
      });
      let msg = null;
      if(e.response.data.error_description === 'Bad credentials') {
        msg = '아이디와 비밀번호를 확인하고 다시 로그인 하세요.';
      } else {
        msg = e.response.data.message;
      }
      setAlertContent(msg);
      setAlertOpen(true);
    } finally {
      setLoading(false);
    }
  }

  const handleSignupIntro = e => {
    history.push('/signup_intro');
  }

  if(token) return <Redirect to='/' />

  return (
    <LoginTemplate footer={<Footer />} loading={loading}>
      <LoginForm
        saveId={saveId}
        onLogin={handleLogin}
        onInput={handleInput}
        onSaveId={handleSaveId}
        username={loginData.username}
        password={loginData.password}
        onSignupIntro={handleSignupIntro}
      />
      <Alert
        state={alertOpen}
        onClose={() => {
          setAlertContent('');
          setAlertOpen(false);
        }}
        content={alertContent}
      />
    </LoginTemplate>
  );
}
