import React, { useEffect, useState } from 'react';
import { PageTemplate, TitleHeader, SignupStep1, Confirm, Alert } from "components";
import { Redirect, useHistory } from 'react-router-dom';
import Utils from "../../Utils";
import * as User from "../../../services/User";
import { useSelector } from 'react-redux';

export default function SignupStep1Page(props) {
  const history = useHistory();
  const { agree } = useSelector(state => state.policy, []);

  // back state
  const [policy, setPolicy] = useState(undefined);
  const [step2, setStep2] = useState(undefined);
  const [step3, setStep3] = useState(undefined);

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [backOpen, setBackOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertContent, setAlertContent] = useState('');
  const [state, setState] = useState({
    username: '',
    password: '',
    passwordCheck: '',
    usernameValid: null,
    passwordValid: null,
    passwordCheckValid: null,
    usernameConfirm: false,
  });

  useEffect(e => {
    if(props.location.policy !== undefined) {
      setPolicy(props.location.policy);
    }
    if(props.location.step1 !== undefined) {
      setState(props.location.step1);
    }
    if(props.location.step2 !== undefined) {
      setStep2(props.location.step2);
    }
    if(props.location.step3 !== undefined) {
      setStep3(props.location.step3);
    }
  }, [props.location.policy, props.location.step1, props.location.step2, props.location.step3]);

  const handleInputChange = e => {
    switch(e.target.name) {
      case 'password':
        if(state.passwordCheck !== '') { // 비밀번호 확인에 값이 있을 경우 검증확인
          setState({
            ...state,
            [e.target.name]: e.target.value,
            [e.target.name + 'Valid']: e.target.value,
            passwordCheckValid: e.target.value === state.passwordCheck,
          });
        } else { // 비밀번호 확인에 값이 없으면 체크하지 않음
          setState({
            ...state,
            [e.target.name]: e.target.value,
            [e.target.name + 'Valid']: e.target.value,
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

  const handleConfirmOpen = () => {
    setConfirmOpen(true);
  };

  const handleConfirmCancel = () => {
    setConfirmOpen(false);
  };

  const handleConfirmOk = () => {
    setConfirmOpen(false);
    setState({
      ...state,
      usernameConfirm: true,
    }); 
  };

  const handleBackOpen = () => {
    setBackOpen(true);
  };

  const handleBackCancel = () => {
    setBackOpen(false);
  };

  const handleBackOk = () => {
    history.push({
      pathname: '/signup_policy',
      policy: policy
    });
  }

  const handleNext = e => {
    history.push({
      pathname: '/signup_step2',
      policy: policy,
      step1: state,
      step2: step2,
      step3: step3,
    });
  }

  const handleConfirm = async e => {
    try {
      // api 호출
      const response = await User.getCheckUsername({username: state.username});
      // 결과에 따라 set
      if(response.data === 0) {
        handleConfirmOpen();
      } else {
        setAlertContent('이미 존재하는 아이디 입니다.');
        setAlertOpen(true);
      }
    } catch(error) {
      Utils.alertError(error);
    }
  }  

  if(agree === false) return <Redirect to='/login' />

  return (
    <PageTemplate header={<TitleHeader path='/signup_policy' onBack={handleBackOpen} {...props}>회원가입</TitleHeader>}>
      <SignupStep1
        state={state}
        onInputChange={handleInputChange}
        onConfirm={handleConfirm}
        onNext={handleNext}
      />
      <Confirm
        state={confirmOpen}
        onCancel={handleConfirmCancel}
        onOk={handleConfirmOk}
        title={`[${state.username}] 이메일 아이디를 사용하시겠습니까?`}
        content='아이디는 바꿀수 없습니다. 다시한번 확인하시고 결정하세요.'
      />
      <Confirm
        state={backOpen}
        onCancel={handleBackCancel}
        onOk={handleBackOk}
        title='계속하시겠습니까?'
        content='입력한 정보가 유실됩니다. 다시한번 확인하시고 결정하세요.'
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
