/*eslint no-restricted-globals: "off"*/
import React, { useState, useEffect } from 'react';
import { useHistory, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLoginUserInfo, setLogin } from "../../../modules/userInfo";
import { PageTemplate, TitleHeader, MyInfo, PlaceSetting, MyTab } from "components";
import * as User from "../../../services/User";
import * as Meet from "../../../services/Meet";
import Utils from "../../Utils";

export default function MyPage(props) {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { login, userInfo } = useSelector(state => state.userInfo, []);
  const [myOpened, setMyOpened] = useState([]);
  const [myApplication, setMyApplication] = useState([]);

  useEffect(e => {
    const token = localStorage.getItem("token");
    if(token) {
      loadUserInfo(JSON.parse(token).access_token);
      loadMyOpened(JSON.parse(token).access_token);
      loadMyApplication(JSON.parse(token).access_token);
    }
  }, []);

  const loadUserInfo = async token => {
    setLoading(true);
    try {
      const res = await User.getUser(token);
      dispatch(setLoginUserInfo(res.data)); // 가져온 user 정보를 redux에 저장
    } catch(error) {
      Utils.alertError(error);
    } finally {
      setLoading(false);
    }
  }

  const loadMyOpened = async token => {
    setLoading(true);
    try {
      const body = {
        toApproval: false
      };
      const res = await Meet.postMyPageOpened({token: token, body: body})
      setMyOpened(res.data.content);
    } catch(error) {
      Utils.alertError(error);
    } finally {
      setLoading(false);
    }    
  }

  const loadMyApplication = async token => {
    setLoading(true);
    try {
      const body = {};
      const res = await Meet.postMyPageApplication({token: token, body: body})
      setMyApplication(res.data.content);
    } catch(error) {
      Utils.alertError(error);
    } finally {
      setLoading(false);
    }    
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
        const token = JSON.parse(localStorage.getItem("token")).access_token;
        const param = { token, body };
        setLoading(true);
        try {
          await User.putEditHopePlace(param); // 지역삭제
          loadUserInfo(token); // 사용자 정보 조회
        } catch(error) {
          Utils.alertError(error);
        } finally {
          setLoading(false);
        }
      }
    } else {
      history.push({
        pathname: "/mypage/hope_place",
        placeNo: e.currentTarget.id
      });
    }
  }

  const handlePasswordChange = e => {
    history.push("/mypage/pass_change");
  }

  const handleMyInfoChange = e => {
    history.push("/mypage/info_change");
  }

  if(!login) return <Redirect to='/login' />

  return (
    <PageTemplate header={<TitleHeader path="/" {...props}>My Page</TitleHeader>} loading={loading}>
      <MyInfo userInfo={userInfo} onLogout={handleLogout} onMyInfoChange={handleMyInfoChange} onPasswordChange={handlePasswordChange} />
      <div style={{borderBottom: '1px solid #dfdfdf'}}></div><div style={{marginBottom: '10px'}}></div>
      <PlaceSetting userInfo={userInfo} onClick={handlePlaceClick} />
      <div style={{borderBottom: '1px solid #dfdfdf'}}></div><div style={{marginBottom: '10px'}}></div>
      <MyTab myOpened={myOpened} myApplication={myApplication} />
    </PageTemplate>
  );
}

