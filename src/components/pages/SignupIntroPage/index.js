import React from 'react';
import { PageTemplate, TitleHeader, SignupIntro } from "components";
import { useHistory } from 'react-router-dom';

export default function SignupIntroPage(props) {
  const history = useHistory();
  
  const handleStart = e => {
    history.push('/signup_policy');
  }

  return (
    <PageTemplate header={<TitleHeader {...props}>회원가입</TitleHeader>}>
      <SignupIntro onStartClick={handleStart} />
    </PageTemplate>
  );
}
