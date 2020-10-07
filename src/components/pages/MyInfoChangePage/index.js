/* eslint no-restricted-globals: ["off"] */
import React, { useState, useReducer, useEffect } from 'react';
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { PageTemplate, TitleHeader, MyInfoForm } from "components";
import * as User from "../../../services/User";
import * as File from "../../../services/File";
import Utils from "../../Utils";

const initialState = {
    input: {
      userNm: '',
      userNickNm: '',
      phone: '',
      mainTalent: '',
    },
    array: {
      talent: [],
      interest: []
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

export default function MyInfoChangePage(props) {
  const { login, userInfo } = useSelector(state => state.userInfo, []);
  const [state, dispatch] = useReducer(reducer, initialState);
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);

  const { phone, mainTalent } = state.input;
  const { talent, interest } = state.array;
  const { avatarPath } = state.file;

  useEffect(e => {
    if(userInfo) {
      onInputChange({target: {name: 'userNm', value: userInfo.userNm}});
      onInputChange({target: {name: 'userNickNm', value: userInfo.userNickNm}});
      onInputChange({target: {name: 'phone', value: userInfo.phone}});
      if(userInfo.avatarPath) {
        dispatch({type: 'SET_AVATAR', value: userInfo.avatarPath});
      }
      onInputChange({target: {name: 'mainTalent', value: userInfo.mainTalent}});
      userInfo.talent.split(',').map(m => onArrayAdd({name: 'talent', value: m}));
      userInfo.interest.split(',').map(m => onArrayAdd({name: 'interest', value: m}));
    }
  }, [userInfo]);

  const handleNext = () => {
    if (activeStep === 1) {
      editUser();
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const editUser = async e => {
    const body = {
      phone,
      mainTalent,
      talent: talent.join(','),
      interest: interest.join(','),
      avatarPath: avatarPath
    }
    const token = JSON.parse(localStorage.getItem("token"));
    const param = { token, body };
    setLoading(true);
    try {
      const response = await User.putEditUser(param);
      // 결과에 따라 set
      if(response) {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      }
    } catch(error) {
      Utils.alertError(error);
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
      Utils.alertError(error);
    } finally {
      setLoading(false);
    }
  }

  if(!login) return <Redirect to='/login' />

  return (
    <PageTemplate header={<TitleHeader {...props}>정보수정</TitleHeader>}>
      <MyInfoForm
        state={state}
        onInputChange={onInputChange}
        onArrayAdd={onArrayAdd}
        onArrayDelete={onArrayDelete}
        onSetAvatar={onSetAvatar}
        activeStep={activeStep}
        handleNext={handleNext}
        handleBack={handleBack}
      />
    </PageTemplate>
  );
}
