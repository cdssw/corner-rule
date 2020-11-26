import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, OutlinedInput  } from '@material-ui/core';
import { withResizeDetector } from "react-resize-detector";
import * as resources from "constants/resources";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    backgroundColor: '#f6f6f6',
    minHeight: '55px',
    borderTop: '1px solid #e2e2e2',
    borderLeft: '1px solid #e2e2e2',
    borderRight: '1px solid #e2e2e2',
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
    padding: 0,
    height: 'auto',
  },
  muiButtonRoot: {
    padding: 0,
    minWidth: 0,
  },
  muiButtonText: {
    padding: 0,
  }
}));

function Footer(props) {
  const classes = useStyles();

  useEffect(() => {
    props.onHeightChange(props.height);
  }, [props.height]);

  return (
    <div className={classes.root} ref={props.footerRef}>
      <div className={classes.wrap}>
        <OutlinedInput
          inputRef={props.inputRef}
          className={classes.message}
          classes={{root: classes.messageRoot, input: classes.messageInput}}
          name="message" placeholder='메시지를 입력하세요.' variant="outlined"
          value={props.message}
          multiline={true}
          onChange={props.onMessageChange}
          onFocus={props.onFocus}
          onBlur={props.onBlur}
        />
        <>
          <div style={{width: '14px'}}></div>
          <Button classes={{root: classes.muiButtonRoot, text: classes.muiButtonText}}
            onClick={props.message ? props.onMessageSend : null}
            disabled={!props.message}
          >
            <img alt="message_send" src={props.message ? resources.sendActive : resources.send} />
          </Button>
        </>
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