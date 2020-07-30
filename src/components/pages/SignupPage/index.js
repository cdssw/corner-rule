import React, { useState, useReducer } from 'react';
import { useSelector } from "react-redux";
import { PageTemplate, TitleHeader, SignupForm } from "components";

function reducer(state, action) {
  return {
    ...state,
    [action.name]: action.value
  };
}

export default function SignupPage(props) {

  const [state, dispatch] = useReducer(reducer, {
    email: '',
    emailConfirm: false,
    password: '',
    passwordCheck: '',
    userNm: '',
    userNickNm: '',
    userNickNmCheck: false,
    phoneNo: '',
    mainTalent: '',
    talnet: [],
    interest: []
  });

  const onChange = e => {
    dispatch(e.target);
  }

  return (
    <PageTemplate header={<TitleHeader {...props}>회원가입</TitleHeader>}>
      <SignupForm state={state} onChange={onChange} />
    </PageTemplate>
  );
}
