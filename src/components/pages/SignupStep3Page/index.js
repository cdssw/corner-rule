import React, { useEffect, useState } from 'react';
import { PageTemplate, TitleHeader, SignupStep3, Confirm } from "components";
import { Redirect, useHistory } from 'react-router-dom';
import * as File from "../../../services/File";
import * as User from "../../../services/User";
import Utils from "../../Utils";
import { useSelector } from 'react-redux';

export default function SignupStep3Page(props) {
  const history = useHistory();
  const { agree } = useSelector(state => state.policy, []);
  const [loading, setLoading] = useState(false);

  // back state
  const [policy, setPolicy] = useState(undefined);
  const [step1, setStep1] = useState(undefined);
  const [step2, setStep2] = useState(undefined);

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [state, setState] = useState({
    mainTalent: '',
    talent: [],
    interest: [],
    avatarPath: '',
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
      setStep2(props.location.step2);
    }
    if(props.location.step3 !== undefined) {
      setState(props.location.step3);
    }
  }, [props.location.policy, props.location.step1, props.location.step2, props.location.step3]);

  const handleConfirmOpen = () => {
    setConfirmOpen(true);
  };

  const handleConfirmCancel = () => {
    setConfirmOpen(false);
  };

  const handleConfirmOk = () => {
    setConfirmOpen(false);
    handleSignup();
  };

  const handleInputChange = e => {
    switch(e.target.name) {
      case 'talent':
      case 'interest':
        setState({
          ...state,
          [e.target.name]: state[e.target.name].concat(e.target.value)
        });
        break;
      default:
        setState({
          ...state,
          [e.target.name]: e.target.value,
        });
        break;
    }
  }  

  const handleChipDelete = e => {
    setState({
      ...state,
      [e.name]: state[e.name].filter(chip => chip !== e.value)
    });
  }

  const handleSetAvatar = async e => {
    e.preventDefault();
    const file = e.target.files[0];

    setLoading(true);
    try {
      const response = await File.postAvatar(file);
      // 결과에 따라 set
      if(response) {
        setState({
          ...state,
          avatarPath: response.data.filePath
        });
      }
    } catch(error) {
      Utils.alertError(error);
    } finally {
      setLoading(false);
    }
  }  

  const handleBack = e => {
    history.push({
      pathname: '/signup_step2',
      policy: policy,
      step1: step1,
      step2: step2,
      step3: state,
    });
  }

  const handleSignup = async e => {
    const body = {
      username: step1.username,
      password: step1.password,
      userNm: step2.userNm,
      userNickNm: step2.userNickNm,
      phone: step2.phone,
      mainTalent: state.mainTalent,
      talent: state.talent.join(','),
      interest: state.interest.join(','),
      avatarPath: state.avatarPath,
      policy: policy
    }
    setLoading(true);
    try {
      const response = await User.signup(body);
      // 결과에 따라 set
      if(response) {
        history.push('/signup_finish');
      }
    } catch(error) {
      Utils.alertError(error);
    } finally {
      setLoading(false);
    }
  }  

  if(agree === false) return <Redirect to='/login' />

  return (
    <PageTemplate loading={loading} header={<TitleHeader onBack={handleBack} {...props}>회원가입</TitleHeader>}>
      <SignupStep3
        state={state}
        onInputChange={handleInputChange}
        onSetAvatar={handleSetAvatar}
        onChipDelete={handleChipDelete}
        onSignup={handleConfirmOpen}
      />
      <Confirm
        state={confirmOpen}
        onCancel={handleConfirmCancel}
        onOk={handleConfirmOk}
        title={'회원가입 완료하시겠습니까?'}
        content='이메일ID와 닉네임 외에 모든 정보는 수정가능합니다.'
      />
    </PageTemplate>
  );
}
