import React, { useEffect, useRef, useState } from 'react';
import { ChatTemplate, TitleHeader, ChatContent } from "components";
import { Redirect, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar } from '@material-ui/core';
import Person from "@material-ui/icons/Person";
import ChatFooter from '../../organisms/ChatFooter';
import SockJsClient from "react-stomp";
import { useSelector } from 'react-redux';
import * as Chat from "../../../services/Chat";
import Utils from "../../Utils";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  userName: {
    color: theme.colorWhite,
    marginTop: '4px',
  },
  avatarRoot: {
    width: '35px',
    height: '35px',
    border: '2px solid white',
  },
  avatarImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
}));

export default function ChatPage(props) {
  const history = useHistory();
  const { login, userInfo } = useSelector(state => state.userInfo, []);
  const [contentHeight, setContentHeight] = useState(0);
  const [message, setMessage] = useState('');
  const [token, setToken] = useState('');
  const [chat, setChat] = useState([]);
  const [topic, setTopic] = useState('');
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [focus, setFocus] = useState(false);
  const [more, setMore] = useState(false);
  const size = 10;
  const isSafari = navigator.vendor.includes('Apple');

  const clientRef = useRef();
  const inputRef = useRef();
  
  useEffect(() => {
    const token = localStorage.getItem("token");
    setToken(JSON.parse(token).access_token); // header에 전송시 필요    
    fetchMoreData();
  }, []);

  useEffect(() => {
    if(props.location.chatInfo !== undefined) {
      setTopic(`/topic/${props.match.params.id}/${props.location.chatInfo.leaderName}-${props.location.chatInfo.chatName}`)
    }
  }, [props.location.chatInfo])

  const fetchMoreData = async e => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const body = {
        meetId: props.match.params.id,
        leaderName: props.location.chatInfo.leaderName,
        username: props.location.chatInfo.chatName
      }
      const response = await Chat.getHistory({token: JSON.parse(token).access_token, page: page, size: size, sort: 'id,desc', body});
      if(response.data.totalPages > page) {
        setMore(true);
      }
      setPage(page + 1);
      // 기존 데이터 앞에 추가
      setChat(response.data.content.concat(chat));
    } catch(error) {
      Utils.alertError(error);
    } finally {
      setLoading(false);
    }
  }

  const handleContentHeightChange = e => {
    setContentHeight(e);
  }

  const handleMessageChange = e => {
    setMessage(e.target.value);
  }

  const handleMessageReceive = msg => {
    setChat(chat.concat(msg));
  }

  const handleFocus = e => {
    setFocus(true);
  }

  const handleBlur = e => {
    setFocus(false);
  }

  const handleMessageSend = e => {
    try {
      const msgData = {
        'meetId': props.match.params.id,
        'leaderName': props.location.chatInfo.leaderName,
        'username': props.location.chatInfo.chatName,
        'sender': userInfo.username,
        'message': message,
      }

      clientRef.current.sendMessage("/app/message", JSON.stringify(msgData));
      setMessage('');
      if(!isSafari) inputRef.current.focus();
      return true;
    } catch(e) {
      console.log(e);
      return false;
    }
  }

  const handleBack = e => {
    history.push({
      pathname: "/content/" + props.match.params.id,
      state: {path: null}
    });
  }

  if(!login) return <Redirect to='/' />

  return (
    <ChatTemplate
      loading={loading}
      header={<TitleHeader onBack={handleBack} {...props}><ChatHeader {...props} /></TitleHeader>}
      footer={
        <ChatFooter
          onMessageChange={handleMessageChange}
          onMessageSend={handleMessageSend}
          onFocus={handleFocus}
          onBlur={handleBlur}
          message={message}
          inputRef={inputRef}
        />
      }
    >
      <ChatContent
        focus={focus}
        userInfo={userInfo}
        chat={chat}
        more={more}
        onMore={fetchMoreData}
        onHeightChange={handleContentHeightChange}
        inputRef={inputRef}
      />

      {token &&
        <SockJsClient url={process.env.REACT_APP_WS_CHAT} topics={[topic]}
          ref={clientRef}  
          onMessage={handleMessageReceive}
          onConnect={() => console.log('connect')}
          onConnectFailure={e => {
            if(e.headers) {
              // Not Authorization
              console.log(e.headers.message);
            }
          }}
          onDisconnect={() => console.log('disconnect')}
          headers={{'Authorization': token}}
        />
      }
    </ChatTemplate>
  );
}

function ChatHeader(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Avatar
        classes={{root: classes.avatarRoot, img: classes.avatarImg}}
        alt={props.location.chatInfo.userNickNm}
        src={props.location.chatInfo.avatarPath && process.env.REACT_APP_IMAGE + props.location.chatInfo.avatarPath}
      >
        {(props.location.chatInfo.avatarPath === null || props.location.chatInfo.avatarPath === '') && <Person />}
      </Avatar>
      <div style={{width: '5px'}} />
      <div className={classes.userName}>{props.location.chatInfo.userNickNm}</div>
    </div>
  )
  
}