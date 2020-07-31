import React, { useState, useReducer } from 'react';
import { useSelector } from "react-redux";
import { PageTemplate, TitleHeader, SignupForm } from "components";

const initialState = {
    input: {
      username: '',
      password: '',
      passwordCheck: '',
      userNm: '',
      userNickNm: '',
      phoneNo: '',
      mainTalent: '',
    },
    array: {
      talnet: [],
      interest: []
    },
    boolean: {
      emailConfirm: false,
      userNickNmCheck: false,
    }  
};

function reducer(state, action) {
  switch (action.type) {
    case 'CHANGE_INPUT':
      return {
        ...state,
        input: {
          ...state.input,
          [action.name]: action.value
        }
      };
    default:
      return state;
  } 
}

export default function SignupPage(props) {

  const [state, dispatch] = useReducer(reducer, initialState);

  const onChange = e => {
    const { name, value } = e.target;
    dispatch({
      type: 'CHANGE_INPUT',
      name,
      value
    });
  }

  return (
    <PageTemplate header={<TitleHeader {...props}>회원가입</TitleHeader>}>
      <SignupForm state={state} onChange={onChange} />
    </PageTemplate>
  );
}
