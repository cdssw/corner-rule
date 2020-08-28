import React from 'react';
import { useHistory, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLoginUserInfo, setLogin } from "../../../modules/userInfo";
import { PageTemplate, TitleHeader, MyInfo, PlaceSetting, MyTab } from "components";

export default function MyPage(props) {
  const history = useHistory();
  const dispatch = useDispatch();
  const { login } = useSelector(state => state.userInfo, []);

  const handleLogout = e => {
    localStorage.setItem("token", null); // token 삭제
    dispatch(setLoginUserInfo(null));
    dispatch(setLogin(false));
    history.push("/");
  }

  if(!login) return <Redirect to='/' />

  return (
    <PageTemplate header={<TitleHeader {...props}>My Page</TitleHeader>}>
      <MyInfo onLogout={handleLogout} />
      <div style={{borderBottom: '1px solid #dfdfdf'}}></div><div style={{marginBottom: '10px'}}></div>
      <PlaceSetting />
      <div style={{borderBottom: '1px solid #dfdfdf'}}></div><div style={{marginBottom: '10px'}}></div>
      <MyTab />
    </PageTemplate>
  );
}

