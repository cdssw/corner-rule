import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import { PageTemplate, ImageHeader, TitleHeader, Content, ContentHeader, Confirm } from "components";
import * as Meet from "../../../services/Meet";
import * as File from "../../../services/File";
import * as User from "../../../services/User";
import * as Chat from "../../../services/Chat";
import Utils from "../../Utils";
import { useHistory } from 'react-router-dom';

export default function ContentPage(props) {
  const history = useHistory();
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
    getMeet(token);
  }, []);

  const getMeet = async token => {
    setLoading(true);
    try {
      const meet = await Meet.getMeet({id: props.match.params.id, token: token});
      setMeet(meet);
      if(meet.data.imgList && meet.data.imgList.length > 0) {
        const imageList = await File.postImagesPath({fileList: meet.data.imgList});
        setImgPath(imageList);
      }
      if(token !== null) {
        if(meet.data.user.username === userInfo.username) { // 작성자 일경우
          const applicationMeetUser = await Meet.getUserApplicationMeet({id: meet.data.id, token: token});
          const chatList = await Chat.getUnreadUsers({token: token, meetId: meet.data.id});
          // 지원자 중에 채팅 한사람이 있으면 미확인 채팅 카운트를 포함
          const applicator = applicationMeetUser.data.map(m => {
            const v = chatList.data.filter(f => {
              return f.sender === m.username
            });
            if(v.length > 0) m.count = v[0].count;
            return m;
          });
          // 채팅한 사람중 지원자 제외
          const chatter = chatList.data.filter(m => {
            const v = applicator.filter(f => f.username !== m.sender);
            if(v.length > 0) {
              m.username = m.sender;
              return m;
            }
          });
          const users = applicator.concat(chatter);
          setApplicationMeet(users);
        } else { // 문의자일 경우
          getUnread(meet.data);
        }
      }
      getCount(meet.data);
      const avatarPath = await User.getUserAvatar({username: meet.data.user.username, token: token});
      setAvatar(avatarPath.data);
    } catch(error) {
      Utils.alertError(error);
    } finally {
      setLoading(false);
    }
  }

  const getUnread = async meet => {
    const data = await Chat.getUnread({token: token, meetId: meet.id});
    meet.chatUnread = data.data;    
  }

  const getCount = async meet => {
    const data = await Chat.getCount({meetId: meet.id});
    meet.chatCnt = data.data;
  }

  const handleApplication = async e => {
    const body = {
      meetId: meet.data.id
    }
    const token = JSON.parse(localStorage.getItem("token")).access_token;
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
    const token = JSON.parse(localStorage.getItem("token")).access_token;
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

  const handleChatClick = (userId) => {
    let chatInfo = {};    
    if(userInfo.username !== meet.data.user.username) {
      // 작성자가 아닌경우
      chatInfo = {
        avatarPath: avatar,
        userNickNm: meet.data.user.userNickNm,
        leaderName: meet.data.user.username,
        receiver: meet.data.user.username, // 대화 대상자
      }
    } else {
      // 작성자 인경우
      const user = applicationMeet.find(v => { return v.id === userId });
      chatInfo = {
        avatarPath: user.avatarPath,
        userNickNm: user.userNickNm,
        leaderName: meet.data.user.username,
        receiver: user.username, // 대화 대상자
      }
    }
    history.push({
      pathname: '/chat/' + meet.data.id,
      chatInfo: chatInfo
    });
  };

  return (
    <PageTemplate imageWrap={imgPath && imgPath.data.length > 0 && true}
      header={imgPath && imgPath.data.length > 0
        ? <ImageHeader path={props.location.state.path ? props.location.state.path : "/"} imgPath={imgPath} {...props} />
        : <TitleHeader path={props.location.state.path ? props.location.state.path : "/"} {...props}>상세보기</TitleHeader>
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

