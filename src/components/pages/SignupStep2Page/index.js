import React, { useEffect, useState } from 'react';
import { PageTemplate, TitleHeader, SignupStep2, Confirm, Alert } from "components";
import { Redirect, useHistory } from 'react-router-dom';
import * as User from "../../../services/User";
import Utils from "../../Utils";
import { useSelector } from 'react-redux';

export default function SignupStep2Page(props) {
  const history = useHistory();
  const { agree } = useSelector(state => state.policy, []);

  // back state
  const [policy, setPolicy] = useState(undefined);
  const [step1, setStep1] = useState(undefined);
  const [step3, setStep3] = useState(undefined);

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertContent, setAlertContent] = useState('');
  const [state, setState] = useState({
    userNickNm: '',
    userNm: '',
    phone: '',
    userNickNmValid: null,
    userNmValid: null,
    phoneValid: null,
    userNickNmConfirm: false,
  });

  useEffect(e => {
    window.scrollTo(0, 0);
  }, []);
  
  useEffect(e => {
    if(props.location.policy !== undefined) {
      setPolicy(props.location.policy);
    }
    if(props.location.step1 !== undefined) {
      setStep1(props.location.step1);
    }
    if(props.location.step2 !== undefined) {
      setState(props.location.step2);
    }
    if(props.location.step3 !== undefined) {
      setStep3(props.location.step3);
    }
  }, [props.location.policy, props.location.step1, props.location.step2, props.location.step2]);

  useEffect(() => {
    if(state.phone.replace(/-/g, '').length === 10) {
      setState({
        ...state,
        phone: state.phone.replace(/-/g, '').replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3'),
        phoneValid: true,
      });
    }
    if(state.phone.replace(/-/g, '').length === 11) {
      setState({
        ...state,
        phone: state.phone.replace(/-/g, '').replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3'),
        phoneValid: true,
      });
    }
  }, [state.phone]);

  const handleInputChange = e => {
    switch(e.target.name) {
      case 'phone':
        const regex = /^[0-9\b -]{0,13}$/;
        if (regex.test(e.target.value)) {
          setState({
            ...state,
            [e.target.name]: e.target.value,
            [e.target.name + 'Valid']: e.target.value.replace(/-/g, '').length >= 10,
          });
        }
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

  const handleConfirm = async e => {
    try {
      // api 호출
      const response = await User.getCheckNicknm({nicknm: state.userNickNm});
      // 결과에 따라 set
      if(response.data === 0) {
        handleConfirmOpen();
      } else {
        setAlertContent('이미 존재하는 닉네임 입니다.');
        setAlertOpen(true);
      }
    } catch(error) {
      Utils.alertError(error);
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
      userNickNmConfirm: true,
    }); 
  };

  const handleBack = e => {
    history.push({
      pathname: '/signup_step1',
      policy: policy,
      step1: step1,
      step2: state,
      step3: step3,
    });
  }

  const handleNext = e => {
    history.push({
      pathname: '/signup_step3',
      policy: policy,
      step1: step1,
      step2: state,
      step3: step3
    });
  }  

  if(agree === false) return <Redirect to='/login' />

  return (
    <PageTemplate header={<TitleHeader onBack={handleBack} {...props}>회원가입</TitleHeader>}>
      <SignupStep2
        state={state}
        onInputChange={handleInputChange}
        onConfirm={handleConfirm}
        onNext={handleNext}      
      />
      <Confirm
        state={confirmOpen}
        onCancel={handleConfirmCancel}
        onOk={handleConfirmOk}
        title={`[${state.userNickNm}] 닉네임을 사용하시겠습니까?`}
        content='닉네임은 바꿀수 없습니다. 다시한번 확인하시고 결정하세요.'
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
