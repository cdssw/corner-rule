/* eslint no-restricted-globals: ["off"] */
import React, { useState } from 'react';
import { PageTemplate, TitleHeader } from "components";
import SignupIntro from '../../organisms/SignupIntro';

export default function SignupIntroPage(props) {

  return (
    <PageTemplate header={<TitleHeader {...props}>회원가입</TitleHeader>}>
      <SignupIntro />
    </PageTemplate>
  );
}
