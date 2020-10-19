import React, { useState } from 'react';
import { PageTemplate, TitleHeader, SignupPolicy } from "components";
import { useHistory } from 'react-router-dom';

export default function SignupPolicyPage(props) {
  const history = useHistory();
  
  const handleAgree = e => {
    history.push('/signup_step1');
  }

  const [state, setState] = useState({
    all: false,
    service: false,
    serviceValid: null,
    private: false,
    privateValid: null,
    profile: false,    
  });

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
    <PageTemplate header={<TitleHeader {...props}>회원가입</TitleHeader>}>
      <SignupPolicy
        state={state}
        onInputChange={handleInputChange}
        onAgreeClick={handleAgree}
      />
    </PageTemplate>
  );
}
