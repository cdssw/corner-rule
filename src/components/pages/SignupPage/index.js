import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import { PageTemplate, TitleHeader, SignupForm } from "components";

export default function SignupPage() {

  return (
    <PageTemplate header={<TitleHeader>회원가입</TitleHeader>}>
      <SignupForm />
    </PageTemplate>
  );
}
