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
  const [confirmEnd, setConfirmEnd] = useState(false);
  const [id, setId] = useState(undefined); // 선택한 사용자 ID
  const [title, setTitle] = useState(''); // 지원/확정에 따른 질문
  const [content, setContent] = useState('') // 확정시 모집완료됨 확인 메시지
  const [sub, setSub] = useState(false); // 작성자의 경우 submenu 활성화
  const token = localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")).access_token : null;

  useEffect(e => {
    if(token && !userInfo) { // 로그인 되어 있으면 user정보 복구
      loadUserInfo(token);
    } else {
      getMeet(token, userInfo);
    }    
  }, []);

  const loadUserInfo = async token => {
    setLoading(true);
    try {
      const userInfo = await User.getUser(token);
      dispatch(setLoginUserInfo(userInfo.data)); // 가져온 user 정보를 redux에 저장
      dispatch(setLogin(true)); // login 상태로 처리
      getMeet(token, userInfo.data);
    } catch(error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }
  
  const getMeet = async (token, userInfo) => {
    setLoading(true);
    try {
      // meet 정보
      const meet = await Meet.getMeet({id: props.match.params.id, token: token});

      // 마감된 경우 리더 및 지원자가 아닌경우 리턴
      if(meet.data.recruitment === meet.data.application) {
        if(userInfo) {
          const isJoin = await Meet.getIsJoin({meetId: props.match.params.id, token: token});
          if(userInfo.username !== meet.data.user.username && !isJoin.data) {
            history.replace('/');
          }
        } else {
          history.replace('/');
        }
      }

      // 첨부이미지 정보
      if(meet.data.imgList && meet.data.imgList.length > 0) {
        const imageList = await File.postImagesPath({fileList: meet.data.imgList});
        setImgPath(imageList);
      }
      // 아바타 경로
      const avatarPath = await User.getUserAvatar({username: meet.data.user.username, token: token});
      setAvatar(avatarPath.data);

      // 로그인 상태이면
      if(userInfo) {
        if(meet.data.user.username === userInfo.username) { // 작성자 일경우
          setSub(true);
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
      getMeet(token, userInfo);
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
      getMeet(token, userInfo);
    } catch(error) {
      Utils.alertError(error);
    } finally {
      setLoading(false);
    }
  }

  const handleConfirmOpen = id => {
    if(id !== undefined) {
      setId(id);
      setTitle('승인 하시겠습니까?');
      if(meet.data.recruitment - 1 === meet.data.application) {
        setContent('승인시 모든 인원이 확정되므로 더이상 모집자를 받을수 없습니다.')
      } else {
        setContent('');
      }
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

  const handleConfirmEnd = id => {
    setId(id);
    setTitle('종료 하시겠습니까?');
    setContent('종료시 더이상 해당 모집에 대하여 접근할수 없습니다.');
    setConfirmEnd(true);
  };

  const handleConfirmEndCancel = () => {
    setConfirmEnd(false);
  };

  const handleConfirmEndOk = () => {
    setConfirmEnd(false);
    handleMeetEnd();
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
      history.push('/');
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

  const handleMeetEnd = async () => {
    await Meet.putEndMeet({id: id, token: token});
    history.replace({
      pathname: props.location.path ? props.location.path : '/'
    });
  }

  return (
    <PageTemplate imageWrap={imgPath && imgPath.data.length > 0 && true}
      header={imgPath && imgPath.data.length > 0
        ? <ImageHeader sub={sub} onBack={handleBack} onModify={handleModify} onMeetEnd={() => handleConfirmEnd(meet.data.id)} imgPath={imgPath} {...props} />
        : <TitleHeader sub={sub} onBack={handleBack} onModify={handleModify} onMeetEnd={() => handleConfirmEnd(meet.data.id)} {...props}>상세보기</TitleHeader>
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
        onMeetEnd={handleConfirmEnd}
      />
      <Confirm
        state={confirmOpen}
        onCancel={handleConfirmCancel}
        onOk={handleConfirmOk}
        title={title}
        content={content}
      />
      <Confirm
        state={confirmEnd}
        onCancel={handleConfirmEndCancel}
        onOk={handleConfirmEndOk}
        title={title}
        content={content}
      />
    </PageTemplate>
  );
}

