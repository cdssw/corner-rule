/* eslint no-restricted-globals: ["off"] */
import React, { useState, useReducer } from 'react';
import { PageTemplate, TitleHeader, SignupForm } from "components";
import * as User from "../../../services/User";
import * as File from "../../../services/File";

const initialState = {
    input: {
      username: '',
      password: '',
      passwordCheck: '',
      userNm: '',
      userNickNm: '',
      phone: '',
      mainTalent: '',
    },
    array: {
      talent: [],
      interest: []
    },
    boolean: {
      emailConfirm: false,
      userNickNmConfirm: false,
    },
    file: {
      avatarPath: '',
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
    case 'SET_AVATAR':
      return {
        ...state,
        file: {
          avatarPath: action.value
        }
      }
    default:
      return state;
  } 
}

export default function SignupPage(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);

  const { username, password, userNm, userNickNm, phone, mainTalent } = state.input;
  const { talent, interest } = state.array;
  const { avatarPath } = state.file;
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
    if (activeStep === 2) {
      signUp();
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const signUp = async e => {
    const body = {
      username,
      password,
      userNm,
      userNickNm,
      phone,
      mainTalent,
      talent: talent.join(','),
      interest: interest.join(','),
      avatarPath: avatarPath
    }
    setLoading(true);
    try {
      const response = await User.signup(body);
      // 결과에 따라 set
      if(response) {
        console.log(response);
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      }
    } catch(error) {
      alert(error.response.data.message);
      console.log(error.response.data);
    } finally {
      setLoading(false);
    }
  }

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
    const { name, value } = e;
    dispatch({
      type: 'DELETE_ARRAY',
      name,
      value
    });
  }

  const onBooleanConfirm = async e => {
    const { value } = e.currentTarget;

    try {
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
    } catch(error) {
      alert(error.response.data.message);
      console.log(error.response.data);
    }
  }

  const onSetAvatar = async e => {
    e.preventDefault();
    const file = e.target.files[0];

    setLoading(true);
    try {
      const response = await File.postAvatar(file);
      // 결과에 따라 set
      if(response) {
        dispatch({
          type: 'SET_AVATAR',
          value: response.data.filePath
        });
      }
    } catch(error) {
      alert(error.response.data.message);
      console.log(error.response.data);
    } finally {
      setLoading(false);
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
        onSetAvatar={onSetAvatar}
        activeStep={activeStep}
        handleNext={handleNext}
        handleBack={handleBack}
      />
    </PageTemplate>
  );
}
