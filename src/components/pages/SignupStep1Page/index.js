import React from 'react';
import { PageTemplate, TitleHeader, SignupStep1 } from "components";

export default function SignupStep1Page(props) {

  return (
    <PageTemplate header={<TitleHeader {...props}>회원가입</TitleHeader>}>
      <SignupStep1 />
    </PageTemplate>
  );
}
