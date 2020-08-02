/* eslint no-restricted-globals: ["off"] */
import React, { useState, useReducer } from 'react';
import { useSelector } from "react-redux";
import { PageTemplate, TitleHeader, SignupForm } from "components";
import * as User from "../../../services/User";

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
      return {
        ...state,
        array: {
          ...state.array,
          [action.name]: state.array[action.name].filter(value => value !== action.value)
        }
      };
    case 'CONFIRM_BOOLEAN':
      return {
        ...state,
        boolean: {
          ...state.boolean,
          [action.name]: true
        }
      };
    default:
      return state;
  } 
}

export default function SignupPage(props) {

  const [state, dispatch] = useReducer(reducer, initialState);
  const [activeStep, setActiveStep] = React.useState(0);

  const { username, userNickNm } = state.input;
  const { emailConfirm, userNickNmConfirm } = state.boolean;

  const handleNext = () => {
    if (activeStep === 0 && !emailConfirm) {
      alert('이메일ID 중복확인을 하세요.');
      return;
    }
    if (activeStep === 1 && !userNickNmConfirm) {
      alert('닉네임 중복확인을 하세요.');
      return;
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

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
      value
    });
  }

  const onBooleanConfirm = async e => {
    const { value } = e.currentTarget;

    if(value === "emailConfirm") {
      // api 호출
      const response = await User.getCheckUsername({username: username});
      // 결과에 따라 set
      if(response.data === 0) {
        const check = confirm("이 아이디를 사용하시겠습니까?");
        if(check) {
          dispatch({
            type: 'CONFIRM_BOOLEAN',
            name: value
          });
        }
      } else {
        alert("이미 존재하는 아이디 입니다.");
      }
    } else {
      // api 호출
      const response = await User.getCheckNicknm({nicknm: userNickNm});
      // 결과에 따라 set
      if(response.data === 0) {
        const check = confirm("이 닉네임을 사용하시겠습니까?");
        if(check) {
          dispatch({
            type: 'CONFIRM_BOOLEAN',
            name: value
          });
        }
      } else {
        alert("이미 존재하는 닉네임 입니다.");
      }
    }
  }

  return (
    <PageTemplate header={<TitleHeader {...props}>회원가입</TitleHeader>}>
      <SignupForm
        state={state}
        onInputChange={onInputChange}
        onArrayAdd={onArrayAdd}
        onArrayDelete={onArrayDelete}
        onBooleanConfirm={onBooleanConfirm}
        activeStep={activeStep}
        handleNext={handleNext}
        handleBack={handleBack}
      />
    </PageTemplate>
  );
}
