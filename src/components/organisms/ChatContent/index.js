import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '0 10px',
    display: 'flex',
    flexDirection: 'column',
  },
  date: {
    margin: '20px auto',
    fontSize: '11px',
    color: '#d4d4d4',
  },
  wrap: {
    marginBottom: '5px',
  },
  meWrap: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  me: {
    margin: 'auto',
    maxWidth: '90%',
    backgroundColor: '#5a6482',
    color: 'white',
    padding: '6px 14px',
    borderTopLeftRadius: '20px',
    borderTopRightRadius: '20px',
    borderBottomLeftRadius: '20px',
  },
  meTime: {
    margin: '2px auto',
    fontSize: '11px',
    color: '#d4d4d4',
  },
  youWrap: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  you: {
    margin: 'auto',
    maxWidth: '90%',
    backgroundColor: '#e2e2e2',
    color: '#707070',
    padding: '6px 14px',
    borderTopLeftRadius: '20px',
    borderTopRightRadius: '20px',
    borderBottomRightRadius: '20px',
  },
  youTime: {
    margin: '2px auto',
    fontSize: '11px',
    color: '#d4d4d4',
  },
}));

export default function ChatContent(props) {
  const classes = useStyles();

  useEffect(e => {
    window.scrollTo(0, document.body.scrollHeight);
  }, [props.bottom]);

  return (
    <div className={classes.root} style={{marginBottom: props.bottom ? props.bottom + 20 : 20}}>
      <div className={classes.date}>2020년 10월 22일 목요일</div>
      {props.chat.map((m, i) => {
        if(m.sender === props.userInfo.username) {
          // 내가 쓴 글
          return (
            <div key={i} className={classes.wrap}>
              <div className={classes.meWrap}>
                <div style={{flexGrow: 1}}></div>
                <div className={classes.me}>{m.message.replace('\n', '<br>')}</div>
              </div>
              <div className={classes.meWrap}>
                <div style={{flexGrow: 1}}></div>
                <div className={classes.meTime}>{m.timeStamp.split('T')[1].substring(0, 5)}</div>
              </div>
            </div>  
          );
        } else {
          // 상대방이 쓴 글
          return (
            <div key={i} className={classes.wrap}>
              <div className={classes.youWrap}>
                <div className={classes.you}>
                  {m.message.split('\n').map((v, n) => {
                    return <div key={n}>{v}</div>
                  })}
                </div>
                <div style={{flexGrow: 1}}></div>
              </div>
              <div className={classes.youWrap}>
                <div className={classes.youTime}>{m.timeStamp.split('T')[1].substring(0, 5)}</div>
                <div style={{flexGrow: 1}}></div>
              </div>
            </div>
          );
        }
      })}
    </div>
  );
}