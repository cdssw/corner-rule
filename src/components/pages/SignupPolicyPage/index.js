import React, { useEffect, useState } from 'react';
import { PageTemplate, TitleHeader, SignupPolicy } from "components";
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setPolicy } from '../../../modules/policy';

export default function SignupPolicyPage(props) {
  const history = useHistory();
  const dispatch = useDispatch();

  const [state, setState] = useState({
    all: false,
    serviceYn: false,
    privateYn: false,
    profileYn: false,    
    serviceValid: null,
    privateValid: null,
  });

  useEffect(e => {
    window.scrollTo(0, 0);
  }, []);
  
  useEffect(e => {
    if(props.location.policy === undefined) return;
    const current = props.location.policy;
    setState(current);
  }, [props.location.policy]);

  const handleAgree = e => {
    dispatch(setPolicy(true)); // policy 동의상태로 처리
    history.push({
      pathname: '/signup_step1',
      policy: state
    });
  }

  const handleInputChange = e => {
    switch(e.target.name) {
      case 'all':
        setState({
          ...state,
          all: e.target.value,
          serviceYn: e.target.value,
          serviceValid: e.target.value,
          privateYn: e.target.value,
          privateValid: e.target.value,
          profileYn: e.target.value,
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

  const handleBack = e => {
    history.push("/signup_intro");
  }

  return (
    <PageTemplate header={<TitleHeader onBack={handleBack} {...props}>회원가입</TitleHeader>}>
      <SignupPolicy
        state={state}
        onInputChange={handleInputChange}
        onAgreeClick={handleAgree}
      />
    </PageTemplate>
  );
}
