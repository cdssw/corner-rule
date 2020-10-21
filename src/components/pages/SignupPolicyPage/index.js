import React, { useEffect, useState } from 'react';
import { PageTemplate, TitleHeader, SignupPolicy } from "components";
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setPolicy } from '../../../modules/policy';

export default function SignupPolicyPage(props) {
  const history = useHistory();
  const dispatch = useDispatch();

  const [state, setState] = useState({
    all: false,
    service: false,
    private: false,
    profile: false,    
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
          service: e.target.value,
          serviceValid: e.target.value,
          private: e.target.value,
          privateValid: e.target.value,
          profile: e.target.value,
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

  return (
    <PageTemplate header={<TitleHeader path="/signup_intro" {...props}>회원가입</TitleHeader>}>
      <SignupPolicy
        state={state}
        onInputChange={handleInputChange}
        onAgreeClick={handleAgree}
      />
    </PageTemplate>
  );
}
