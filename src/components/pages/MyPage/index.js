/*eslint no-restricted-globals: "off"*/
import React, { useState, useEffect } from 'react';
import { useHistory, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLoginUserInfo, setLogin } from "../../../modules/userInfo";
import { PageTemplate, TitleHeader, MyInfo, PlaceSetting, MyTab, Confirm } from "components";
import * as User from "../../../services/User";
import * as Meet from "../../../services/Meet";
import * as File from "../../../services/File";
import Utils from "../../Utils";

export default function MyPage(props) {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { login, userInfo } = useSelector(state => state.userInfo, []);
  const [myOpened, setMyOpened] = useState([]);
  const [myApplication, setMyApplication] = useState([]);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectPlace, setSelectPlace] = useState({}); // 선택한 관심지역

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
      const data = await getImagePath(res.data.content);
      setMyOpened(myOpened.concat(data));
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
      const data = await getImagePath(res.data.content);
      setMyApplication(myApplication.concat(data));
    } catch(error) {
      Utils.alertError(error);
    } finally {
      setLoading(false);
    }    
  }

  const getImagePath = async arr => {
    for (const m of arr) {
      const data = await File.postImagesPath({fileList: m.imgList});
      m.imgList = data.data;
    }
    return arr;
  }
  
  const handleLogout = e => {
    localStorage.removeItem('token');
    localStorage.removeItem('place');
    dispatch(setLoginUserInfo(null));
    dispatch(setLogin(false));
    history.push("/");
  }

  const handleAddClick = e => {
    history.push({
      pathname: "/mypage/hope_place",
      placeNo: e.currentTarget.id
    });
  }

  const handlePlaceClick = async e => {
    if(localStorage.getItem('place') === selectPlace.place)
      localStorage.setItem("place", "");

    const token = JSON.parse(localStorage.getItem("token")).access_token;
    const param = { token, id: selectPlace.id };
    setLoading(true);
    try {
      await User.deleteHopePlace(param); // 지역삭제
      loadUserInfo(token); // 사용자 정보 조회
    } catch(error) {
      Utils.alertError(error);
    } finally {
      setLoading(false);
    }
  }

  const handlePasswordChange = e => {
    history.push("/mypage/pass_change");
  }

  const handleMyInfoChange = e => {
    history.push("/mypage/info_change");
  }

  const handleConfirmOpen = e => {
    setSelectPlace({id: e.currentTarget.id, place: e.currentTarget.innerText});
    setConfirmOpen(true);
  };

  const handleConfirmCancel = () => {
    setConfirmOpen(false);
  };

  const handleConfirmOk = () => {
    setConfirmOpen(false);
    handlePlaceClick();
  };

  if(!login) return <Redirect to='/login' />

  return (
    <PageTemplate header={<TitleHeader path="/" {...props}>My Page</TitleHeader>} loading={loading}>
      <MyInfo userInfo={userInfo} onLogout={handleLogout} onMyInfoChange={handleMyInfoChange} onPasswordChange={handlePasswordChange} />
      <div style={{borderBottom: '1px solid #dfdfdf'}}></div><div style={{marginBottom: '10px'}}></div>
      <PlaceSetting userInfo={userInfo} onAddClick={handleAddClick} onPlaceClick={handleConfirmOpen} />
      <div style={{borderBottom: '1px solid #dfdfdf'}}></div><div style={{marginBottom: '10px'}}></div>
      <MyTab myOpened={myOpened} myApplication={myApplication} />
      <Confirm
        state={confirmOpen}
        onCancel={handleConfirmCancel}
        onOk={handleConfirmOk}
        title={'관심지역을 삭제하시겠습니까?'}
      />
    </PageTemplate>
  );
}

