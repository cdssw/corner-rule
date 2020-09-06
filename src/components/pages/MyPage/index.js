/*eslint no-restricted-globals: "off"*/
import React, { useState, useEffect } from 'react';
import { useHistory, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLoginUserInfo, setLogin } from "../../../modules/userInfo";
import { PageTemplate, TitleHeader, MyInfo, PlaceSetting, MyTab } from "components";
import * as User from "../../../services/User";

export default function MyPage(props) {
  const history = useHistory();
  const dispatch = useDispatch();
  const { login, userInfo } = useSelector(state => state.userInfo, []);

  useEffect(e => {
    const token = localStorage.getItem("token");
    if(token) {
      loadUserInfo(JSON.parse(token));
    }
  }, []);

  const loadUserInfo = async token => {
    const res = await User.getUser(token);
    dispatch(setLoginUserInfo(res.data)); // 가져온 user 정보를 redux에 저장
  }
  
  const handleLogout = e => {
    localStorage.removeItem('token');
    dispatch(setLoginUserInfo(null));
    dispatch(setLogin(false));
    history.push("/");
  }

  const handlePlaceClick = async e => {
    const hopePlace = userInfo.hopePlace;
    if(hopePlace && userInfo.hopePlace[e.currentTarget.id]) {
      const check = confirm("희망지역을 삭제하시겠습니까?");
      if(check) {
        // place 저장
        const body = {
          hopePlace : {
            ...hopePlace,
            [e.currentTarget.id]: null
          }
        }
        const token = JSON.parse(localStorage.getItem("token"));
        const param = { token, body };
        await User.putEditUser(param); // 지역삭제
        loadUserInfo(token); // 사용자 정보 조회
      }
    } else {
      history.push({
        pathname: "/mypage/hope_place",
        placeNo: e.currentTarget.id
      });
    }
  }

  if(!login) return <Redirect to='/' />

  return (
    <PageTemplate header={<TitleHeader path="/" {...props}>My Page</TitleHeader>}>
      <MyInfo userInfo={userInfo} onLogout={handleLogout} />
      <div style={{borderBottom: '1px solid #dfdfdf'}}></div><div style={{marginBottom: '10px'}}></div>
      <PlaceSetting userInfo={userInfo} onClick={handlePlaceClick} />
      <div style={{borderBottom: '1px solid #dfdfdf'}}></div><div style={{marginBottom: '10px'}}></div>
      <MyTab />
    </PageTemplate>
  );
}

