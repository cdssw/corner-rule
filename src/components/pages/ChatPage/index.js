import React, { useEffect, useRef, useState } from 'react';
import { ChatTemplate, TitleHeader, ChatContent } from "components";
import { Redirect, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar } from '@material-ui/core';
import Person from "@material-ui/icons/Person";
import ChatFooter from '../../organisms/ChatFooter';

import SockJsClient from "react-stomp";
import { useSelector } from 'react-redux';

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
  const [bottom, setBottom] = useState(50);
  const [contentHeight, setContentHeight] = useState(0);
  const [message, setMessage] = useState('');
  const [token, setToken] = useState('');
  const [chat, setChat] = useState([]);
  const [safari, setSafari] = useState(false);
  const [topic, setTopic] = useState('');

  const clientRef = useRef();
  const inputRef = useRef();
  
  useEffect(() => {
    const token = localStorage.getItem("token");
    setToken(JSON.parse(token).access_token); // header에 전송시 필요    
  }, [])

  useEffect(() => {
    setTopic(`/topic/${props.match.params.id}/${props.location.chatInfo.leaderName}-${props.location.chatInfo.chatName}`)
  }, [props.location.chatInfo])

  const handleFooterHeightChange = e => {
    setBottom(e);
  }

  const handleContentHeightChange = e => {
    setContentHeight(e);
  }

  const handleMessageChange = e => {
    setMessage(e.target.value);
  }

  const handleMessageReceive = msg => {
    setMessage('');
    setChat(chat.concat(msg));
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
      inputRef.current.focus();
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

  const handleSafari = e => {
    setSafari(e);
  }

  if(!login) return <Redirect to='/' />
  
  return (
    <ChatTemplate
      header={<TitleHeader onBack={handleBack} {...props}><ChatHeader {...props} /></TitleHeader>}
      footer={
        <ChatFooter
          bottom={bottom}
          message={message}
          onMessageChange={handleMessageChange}
          onHeightChange={handleFooterHeightChange}
          onMessageSend={handleMessageSend}
          onSafari={handleSafari}
          inputRef={inputRef}
        />
      }
      safari={safari}
    >
      <ChatContent
        bottom={bottom}
        userInfo={userInfo}
        chat={chat}
        onHeightChange={handleContentHeightChange}
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