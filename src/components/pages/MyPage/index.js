import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLoginUserInfo, setLogin } from "../../../modules/userInfo";
import { PageTemplate, TitleHeader, MyInfo, PlaceSetting, MyTab } from "components";

export default function MyPage(props) {
  const history = useHistory();
  const dispatch = useDispatch();

  const handleLogout = e => {
    localStorage.setItem("token", null); // token 삭제
    dispatch(setLoginUserInfo(null));
    dispatch(setLogin(false));
    history.push("/");
  }

  return (
    <PageTemplate header={<TitleHeader {...props}>My Page</TitleHeader>}>
      <MyInfo onLogout={handleLogout} />
      <div style={{borderBottom: '1px solid #dfdfdf', marginBottom: '10px'}}></div>
      <PlaceSetting />
      <div style={{borderBottom: '1px solid #dfdfdf', marginBottom: '10px'}}></div>      
      <MyTab />
    </PageTemplate>
  );
}

