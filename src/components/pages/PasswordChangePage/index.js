import React, { useState, useEffect } from 'react';
import { useHistory, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { PageTemplate, TitleHeader, PasswordSetting } from "components";
import * as User from "../../../services/User";

export default function PasswordChangePage(props) {
  const history = useHistory();
  const { login, userInfo } = useSelector(state => state.userInfo, []);
  const [state, setState] = useState({
    currentPassword: '',
    password: '',
    passwordCheck: '',
  });

  const handleInputChange = e => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    });
  }

  const handlePasswordClick = async event => {
    const body = {
      currentPassword : state.currentPassword,
      password: state.password
    }
    const token = JSON.parse(localStorage.getItem("token"));
    const param = { token, body };
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
  }

  if(!login) return <Redirect to='/' />

  return (
    <PageTemplate header={<TitleHeader {...props}>비밀번호 변경</TitleHeader>}>
      <PasswordSetting
        onInputChange={handleInputChange}
        state={state}
        onPasswordClick={handlePasswordClick}
      />
    </PageTemplate>
  );
}

