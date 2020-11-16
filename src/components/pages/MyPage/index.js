import React, { useState, useEffect } from 'react';
import { useHistory, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLoginUserInfo, setLogin } from "../../../modules/userInfo";
import { PageTemplate, TitleHeader, MyInfo, PlaceSetting, MyTab, Confirm } from "components";
import * as User from "../../../services/User";
import * as Meet from "../../../services/Meet";
import * as File from "../../../services/File";
import * as Chat from "../../../services/Chat";
import Utils from "../../Utils";
import { HistoryRounded } from '@material-ui/icons';

export default function MyPage(props) {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { login, userInfo } = useSelector(state => state.userInfo, []);
  const [myOpened, setMyOpened] = useState([]);
  const [openPage, setOpenPage] = useState(0);
  const [tab, setTab] = useState(0);
  const [myApplication, setMyApplication] = useState([]);
  const [applicationPage, setApplicationPage] = useState(0);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectPlace, setSelectPlace] = useState({}); // 선택한 관심지역
  const size = 10;
  const token = localStorage.getItem("token") && JSON.parse(localStorage.getItem("token")).access_token;  

  useEffect(() => {
    if(token) {
      loadUserInfo();
      loadMyOpened();
      loadMyApplication();
    } else {
      history.replace('/');
    }
  }, []);

  // 이전 선택된 tab으로 자동 설정
  useEffect(() => {
    if(props.location.tab) setTab(props.location.tab);
  }, [props.location.tab]);

  const loadUserInfo = async e => {
    setLoading(true);
    try {
      const res = await User.getUser(token);
      dispatch(setLoginUserInfo(res.data)); // 가져온 user 정보를 redux에 저장
      dispatch(setLogin(true)); // login 상태로 처리
    } catch(error) {
      Utils.alertError(error);
    } finally {
      setLoading(false);
    }
  }

  const loadMyOpened = async e => {
    setLoading(true);
    try {
      const body = {
        toApproval: false
      };
      const res = await Meet.postMyPageOpened({token: token, body: body, page: openPage, size: size, sort: 'id,desc'})
      const file = await getImagePath(res.data.content);
      const data = await getUnread(file);
      setOpenPage(openPage + 1);
      setMyOpened(myOpened.concat(data));
    } catch(error) {
      Utils.alertError(error);
    } finally {
      setLoading(false);
    }    
  }

  const loadMyApplication = async e => {
    setLoading(true);
    try {
      const body = {};
      const res = await Meet.postMyPageApplication({token: token, body: body, page: applicationPage, size: size, sort: 'id,desc'})
      const file = await getImagePath(res.data.content);
      const data = await getUnread(file);
      setApplicationPage(applicationPage + 1);
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

  const getUnread = async arr => {
    for (const m of arr) {
      const data = await Chat.getUnread({token: token, meetId: m.id});
      m.chatUnread = data.data;
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

  const handleSelectTab = (e, newValue) => {
    setTab(newValue);
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

  const handleBack = () => {
    history.push("/");
  }

  return (
    <PageTemplate header={<TitleHeader onBack={handleBack} {...props}>My Page</TitleHeader>} loading={loading}>
      <MyInfo userInfo={userInfo} onLogout={handleLogout} onMyInfoChange={handleMyInfoChange} onPasswordChange={handlePasswordChange} />
      <div style={{borderBottom: '1px solid #dfdfdf'}}></div><div style={{marginBottom: '10px'}}></div>
      <PlaceSetting userInfo={userInfo} onAddClick={handleAddClick} onPlaceClick={handleConfirmOpen} />
      <div style={{borderBottom: '1px solid #dfdfdf'}}></div><div style={{marginBottom: '10px'}}></div>
      <MyTab
        tab={tab}
        onSelectTab={handleSelectTab}
        myOpened={myOpened}
        openMoreData={loadMyOpened}
        myApplication={myApplication}
        applicationMoreData={loadMyApplication}
      />
      <Confirm
        state={confirmOpen}
        onCancel={handleConfirmCancel}
        onOk={handleConfirmOk}
        title={'관심지역을 삭제하시겠습니까?'}
      />
    </PageTemplate>
  );
}

