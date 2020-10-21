import React, { useState, useEffect } from 'react';
import { useHistory, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { PageTemplate, TitleHeader, PasswordSetting, Alert } from "components";
import * as User from "../../../services/User";

export default function PasswordChangePage(props) {
  const history = useHistory();
  const { login, userInfo } = useSelector(state => state.userInfo, []);
  const [loading, setLoading] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertContent, setAlertContent] = useState('');

  const [state, setState] = useState({
    currentPassword: '',
    password: '',
    passwordCheck: '',
    currentPasswordValid: null,
    passwordValid: null,
    password2Valid: null,
    passwordCheckValid: null,
  });

  const handleInputChange = e => {
    switch(e.target.name) {
      case 'password':
        if(state.passwordCheck !== '') { // 비밀번호 확인에 값이 있을 경우 검증확인
          setState({
            ...state,
            [e.target.name]: e.target.value,
            [e.target.name + 'Valid']: e.target.value,
            passwordCheckValid: e.target.value === state.passwordCheck,
            password2Valid: e.target.value !== state.currentPassword,
          });
        } else { // 비밀번호 확인에 값이 없으면 체크하지 않음
          setState({
            ...state,
            [e.target.name]: e.target.value,
            [e.target.name + 'Valid']: e.target.value,
            password2Valid: e.target.value !== state.currentPassword,
          });
        }
        break;
      case 'passwordCheck':
        setState({
          ...state,
          [e.target.name]: e.target.value,
          [e.target.name + 'Valid']: e.target.value,
          passwordCheckValid: e.target.value === state.password,
        });
        break;
      default:
        setState({
          ...state,
          [e.target.name]: e.target.value,
          [e.target.name + 'Valid']: e.target.value,
        });
        break;
    }
  }

  const handlePasswordClick = async event => {
    const body = {
      currentPassword : state.currentPassword,
      password: state.password
    }
    const token = localStorage.getItem("token");
    const param = { token: JSON.parse(token).access_token, body };
    setLoading(true);
    try {
      const res = await User.postPasswordChange(param);
      if(res !== undefined) {
        history.push("/mypage");
      } else {
        setState({
          currentPassword: '',
          password: '',
          passwordCheck: '',
        });
      }
    } catch(e) {
      let msg = null;
      if(e.response.data.code === 'E_00002') {
        msg = '현재 비밀번호가 일치하지 않습니다.';
      } else {
        msg = e.response.data.message;
      }
      setAlertContent(msg);
      setAlertOpen(true);
    } finally {
      setLoading(false);
    }
  }

  // if(!login) return <Redirect to='/' />

  return (
    <PageTemplate loading={loading} header={<TitleHeader {...props}>비밀번호 변경</TitleHeader>}>
      <PasswordSetting
        state={state}
        onInputChange={handleInputChange}
        onPasswordClick={handlePasswordClick}
      />
      <Alert
        state={alertOpen}
        onClose={() => {
          setAlertContent('');
          setAlertOpen(false);
        }}
        content={alertContent}
      />
    </PageTemplate>
  );
}

