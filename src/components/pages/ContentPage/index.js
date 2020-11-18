import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { PageTemplate, ImageHeader, TitleHeader, Content, ContentHeader, Confirm } from "components";
import { setLoginUserInfo, setLogin } from "../../../modules/userInfo";
import * as Meet from "../../../services/Meet";
import * as File from "../../../services/File";
import * as User from "../../../services/User";
import * as Chat from "../../../services/Chat";
import Utils from "../../Utils";
import { useHistory } from 'react-router-dom';

export default function ContentPage(props) {
  const history = useHistory();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { userInfo } = useSelector(state => state.userInfo, []);
  const [meet, setMeet] = useState({});
  const [imgPath, setImgPath] = useState(null);
  const [avatar, setAvatar] = useState("");
  const [applicationMeet, setApplicationMeet] = useState([]);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [id, setId] = useState(undefined); // 선택한 사용자 ID
  const [title, setTitle] = useState(''); // 지원/확정에 따른 질문
  const token = localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")).access_token : null;

  useEffect(e => {
    if(token) { // 로그인 되어 있으면 user정보 복구
      loadUserInfo(token);
    }
    getMeet(token);
  }, []);

  const loadUserInfo = async token => {
    setLoading(true);
    try {
      const userInfo = await User.getUser(token);
      dispatch(setLoginUserInfo(userInfo.data)); // 가져온 user 정보를 redux에 저장
      dispatch(setLogin(true)); // login 상태로 처리
    } catch(error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }
  
  const getMeet = async token => {
    setLoading(true);
    try {
      // meet 정보
      const meet = await Meet.getMeet({id: props.match.params.id, token: token});
      // 첨부이미지 정보
      if(meet.data.imgList && meet.data.imgList.length > 0) {
        const imageList = await File.postImagesPath({fileList: meet.data.imgList});
        setImgPath(imageList);
      }
      // 아바타 경로
      const avatarPath = await User.getUserAvatar({username: meet.data.user.username, token: token});
      setAvatar(avatarPath.data);

      // 로그인 상태이면
      if(userInfo !== null) {
        if(meet.data.user.username === userInfo.username) { // 작성자 일경우
          const applicationUser = await Meet.getUserApplicationMeet({id: meet.data.id, token: token});
          const chatUser = await Chat.getUnreadUsers({token: token, meetId: meet.data.id});

          // 지원자 리턴하되 채팅한 사람중에 있으면 count를 추가
          const applicator = applicationUser.data.map(m => {
            const chat = chatUser.data.filter(v => m.username === v.sender);
            if(chat.length > 0) {
              m.count = chat[0].count;
            }
            return m;
          });
          const chatter = chatUser.data.map(m => {
            m.username = m.sender;
            return m;
          });
          // 합친뒤 중복제거
          const combine = applicator.concat(chatter);
          const users = combine.reduce((prev, curr) => {
            if(!prev.find(a => a.username === curr.username)) {
              prev.push(curr);
            }
            return prev;
          }, []);
          setApplicationMeet(users);
        } else { // 문의자일 경우
          meet.data = await getUnread(meet.data);
        }
      }
      setMeet(meet);
    } catch(error) {
      Utils.alertError(error);
    } finally {
      setLoading(false);
    }
  }

  const getUnread = async meet => {
    const data = await Chat.getUnread({token: token, meetId: meet.id});
    meet.chatUnread = data.data;
    return meet;
  }

  const handleApplication = async e => {
    const body = {
      meetId: meet.data.id
    }
    const param = { token, body };
    setLoading(true);
    try {
      await Meet.postApplication(param);
      getMeet(token);
    } catch(error) {
      Utils.alertError(error);
    } finally {
      setLoading(false);
    }
  }

  const handleApproval = async e => {
    const body = {
      meetId: meet.data.id,
      userId: id
    }
    const param = { token, body };
    setLoading(true);
    try {
      await Meet.postApproval(param);
      getMeet(token);
    } catch(error) {
      Utils.alertError(error);
    } finally {
      setLoading(false);
    }
  }

  const handleConfirmOpen = id => {
    if(id !== undefined) {
      setId(id);
      setTitle('확정 하시겠습니까?');
    } else {
      setId(undefined);
      setTitle('지원 하시겠습니까?');
    }
    setConfirmOpen(true);
  };

  const handleConfirmCancel = () => {
    setConfirmOpen(false);
  };

  const handleConfirmOk = () => {
    setConfirmOpen(false);
    id === undefined ? handleApplication() : handleApproval();
  };

  const handleChatClick = (receiver) => {
    let chatInfo = {};    
    if(userInfo.username !== meet.data.user.username) {
      // 지원자인 경우
      chatInfo = {
        avatarPath: avatar,
        userNickNm: meet.data.user.userNickNm,
        leaderName: meet.data.user.username,        
        owner: false,
        receiver: receiver
      }
    } else {
      // 작성자인 경우
      const user = applicationMeet.find(v => { return v.username === receiver });
      chatInfo = {
        avatarPath: user.avatarPath,
        userNickNm: user.userNickNm,
        leaderName: meet.data.user.username,
        owner: true,
        receiver: receiver
      }
    }
    history.push({
      pathname: '/chat/' + meet.data.id,
      chatInfo: chatInfo,
      path: props.location.path,
      tab: props.location.tab
    });
  };

  const handleBack = e => {
    if(props.location.path) {
      history.push({
        pathname: props.location.path,
        path: props.location.path,
        tab: props.location.tab,
      });
    } else {
      history.goBack(1);
    }
  }

  const handleModify = e => {
    history.replace({
      pathname: '/reg/' + props.match.params.id,
    });
  }

  const handleApplicator = username => {
    history.push({
      pathname: '/applicator',
      username: username,
      meet: meet.data,
      path: props.location.path,
      tab: props.location.tab
    });
  }

  const handleEstimate = username => {
    history.push({
      pathname: '/estimate',
      username: username,
      meet: meet.data,
      path: props.location.path,
      tab: props.location.tab
    });
  }

  return (
    <PageTemplate imageWrap={imgPath && imgPath.data.length > 0 && true}
      header={imgPath && imgPath.data.length > 0
        ? <ImageHeader onBack={handleBack} imgPath={imgPath} {...props} />
        : <TitleHeader onBack={handleBack} {...props}>상세보기</TitleHeader>
      } loading={loading}>
      <ContentHeader meet={meet.data} avatar={avatar} />
      <div style={{borderBottom: '1px solid #dfdfdf'}}></div><div style={{marginBottom: '20px'}}></div>
      <Content
        userInfo={userInfo}
        meet={meet.data}
        applicationMeet={applicationMeet}
        onApplication={handleConfirmOpen}
        onApproval={handleConfirmOpen}
        onChatClick={handleChatClick}
        onModify={handleModify}
        onApplicator={handleApplicator}
        onEstimate={handleEstimate}
      />
      <Confirm
        state={confirmOpen}
        onCancel={handleConfirmCancel}
        onOk={handleConfirmOk}
        title={title}
      />
    </PageTemplate>
  );
}

