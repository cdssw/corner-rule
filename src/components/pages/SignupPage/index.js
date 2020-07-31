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
      talent: [],
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
          [action.name]: state.array[action.name].concat(action.value)
        }
      };
    case 'DELETE_ARRAY':
      console.log(state.array[action.name].slice(action.index, 1));
      return {
        ...state,
        array: {
          ...state.array,
          [action.name]: state.array[action.name].slice(action.index, 1)
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
    const { name, value } = e;
    dispatch({
      type: 'ADD_ARRAY',
      name,
      value
    });
  }

  const onArrayDelete = e => {
    const { name, value, index } = e;
    dispatch({
      type: 'DELETE_ARRAY',
      name,
      index
    });
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
