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
      userNickNmConfirm: false,
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
    case 'ADD_ARRAY':
      return {
        ...state,
        array: {
          ...state.array,
          [action.name]: action.value
        }
      };
    default:
      return state;
  } 
}

export default function SignupPage(props) {

  const [state, dispatch] = useReducer(reducer, initialState);

  const onInputChange = e => {
    const { name, value } = e.target;
    dispatch({
      type: 'CHANGE_INPUT',
      name,
      value
    });
  }

  const onArrayAdd = e => {
    console.log(e);
    const { name, value } = e;
    dispatch({
      type: 'ADD_ARRAY',
      name,
      value
    });
  }

  const onArrayDelete = e => {
    console.log(e);
  }

  return (
    <PageTemplate header={<TitleHeader {...props}>회원가입</TitleHeader>}>
      <SignupForm
        state={state}
        onInputChange={onInputChange}
        onArrayAdd={onArrayAdd}
        onArrayDelete={onArrayDelete}
      />
    </PageTemplate>
  );
}
