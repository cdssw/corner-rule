import React from 'react';
import { PageTemplate, TitleHeader, SignupStep3 } from "components";

export default function SignupStep3Page(props) {

  return (
    <PageTemplate header={<TitleHeader {...props}>회원가입</TitleHeader>}>
      <SignupStep3 />
    </PageTemplate>
  );
}
