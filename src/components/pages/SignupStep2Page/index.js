import React from 'react';
import { PageTemplate, TitleHeader, SignupStep2 } from "components";

export default function SignupStep2Page(props) {

  return (
    <PageTemplate header={<TitleHeader {...props}>회원가입</TitleHeader>}>
      <SignupStep2 />
    </PageTemplate>
  );
}
