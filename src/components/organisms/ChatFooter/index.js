import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { OutlinedInput  } from '@material-ui/core';
import { withResizeDetector } from "react-resize-detector";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    backgroundColor: '#f6f6f6',
    minHeight: '55px',
    borderTop: '1px solid #e2e2e2',
  },
  wrap: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    margin: '0 20px',
  },
  message: {
    margin: '8px 0',
    backgroundColor: 'white',
    borderRadius: '20px',
    maxWidth: '90%',
  },
  messageRoot: {
    borderRadius: '20px',
    padding: '6px 14px',
  },
  messageInput: {
    fontSize: '0.875rem',
    fontFamily: 'AppleSDGothicNeoL00',
  },
}));

function Footer(props) {
  const classes = useStyles();
  const [msg, setMsg] = useState('');

  useEffect(() => {
    props.onHeightChange(props.height);
  }, [props.height]);

  const handleMsgChange = e => {
    setMsg(e.target.value);
  }

  const handleSend = e => {
    props.onMessageChange({target: {value: msg}});
    setMsg('');
    props.inputRef.current.focus();
  }

  console.log('message, ', props.message);
  return (
    <div className={classes.root}>
      <div className={classes.wrap}>
        <OutlinedInput 
          inputRef={props.inputRef}
          className={classes.message}
          classes={{root: classes.messageRoot, input: classes.messageInput}}
          name="message" placeholder="메시지를 입력하세요." variant="outlined"
          // multiline={true}
          value={msg}
          onChange={handleMsgChange}
          onKeyPress={e => {
            if(e.key === 'Enter') {
              handleSend();
            }
          }}
        />
        <div style={{width: '14px'}}></div>
        <img alt="message_send" src={process.env.PUBLIC_URL + (msg !== '' ? "/images/ico_send_active.svg" : "/images/ico_send.svg")}
          onClick={msg ? handleSend : null}
        />
      </div>
    </div>
  )
}

const AdaptiveWithDetector = withResizeDetector(Footer);

export default function ChatFooter(props) {
  return (
    <AdaptiveWithDetector {...props} />
  );
}