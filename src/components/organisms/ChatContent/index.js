import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { withResizeDetector } from "react-resize-detector";
import classnames from "classnames";

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
  chatFooter: {
    marginBottom: '55px',
  },
  move: {
    position: 'relative',
    top: '200px',
  }
}));

function Content(props) {
  const classes = useStyles();
  const isSafari = navigator.vendor.includes('Apple');
  const [root, setRoot] = useState(classnames(classes.root));
  const [load, setLoad] = useState(false);
  const week = ['일', '월', '화', '수', '목', '금', '토'];

  useEffect(e => {
    window.scrollTo(0, document.body.scrollHeight);
    window.addEventListener('scroll', handleScroll);
    return () => { window.removeEventListener('scroll', handleScroll)}
  }, []);

  useEffect(e => {
    if(load && props.more) {      
      props.onMore();
    }
  }, [load]);

  // root class가 변경되면 적용
  useEffect(e => {
    const buf = props.inputRef.current.getBoundingClientRect().y + 36.5
    window.scrollTo({top: document.body.scrollHeight - buf, left: 0, behavior: 'smooth'});
  }, [root]);

  useEffect(() => {
    props.onHeightChange(props.height);
    if(isSafari) {
      if(props.height > document.body.offsetHeight - 105) {
        setRoot(classnames(classes.root, classes.chatFooter));
      } else {
        if(props.focus && props.height < document.body.offsetHeight / 2) {
          setRoot(classnames(classes.root, classes.chatFooter, classes.move));
        } else {
          setRoot(classnames(classes.root, classes.chatFooter));
        }
      }
    } else {
      setRoot(classnames(classes.root, classes.chatFooter));
    }
    if(!load) {
      // 371.5(408) 256.5 (293) ==> 36.5를 +
      const buf = props.inputRef.current.getBoundingClientRect().y + 36.5
      window.scrollTo({top: document.body.scrollHeight - buf, left: 0, behavior: 'smooth'});
    }
  }, [props.height, props.focus]);

  const handleScroll = e => {
    if(window.pageYOffset === 0) {
      setLoad(true);
    } else {
      setLoad(false);
    }
  };
  return (
    <div className={root} ref={props.contentRef}>
      {props.chat.map((m, i) => {        
        const index = i !== 0 ? i - 1 : 0;
        const prev = props.chat[index].timeStamp.split('T')[0].substring(0, 10);
        const curr = m.timeStamp.split('T')[0].substring(0, 10);        
        if(m.sender === props.userInfo.username) {
          // 내가 쓴 글
          return (
            <div key={i} className={classes.root}>
              {(i === 0 || prev !== curr) && <div className={classes.date}>{curr.substring(0, 4)}년 {curr.substring(5, 7)}월 {curr.substring(8, 10)}일 {week[new Date(curr).getDay()]}요일</div>}
              <div className={classes.wrap}>
                <div className={classes.meWrap}>
                  <div style={{flexGrow: 1}}></div>
                  <div className={classes.me}>
                    {m.message.split('\n').map((v, n) => {
                      return <div key={n}>{v}</div>
                    })}
                  </div>
                </div>
                <div className={classes.meWrap}>
                  <div style={{flexGrow: 1}}></div>
                  <div className={classes.meTime}>{m.timeStamp.split('T')[1].substring(0, 5)}</div>
                </div>
              </div>  
            </div>
          );
        } else {
          // 상대방이 쓴 글
          return (
            <div key={i} className={classes.root}>
              {(i === 0 || prev !== curr) && <div className={classes.date}>{curr.substring(0, 4)}년 {curr.substring(5, 7)}월 {curr.substring(8, 10)}일 {week[new Date(curr).getDay()]}요일</div>}
              <div className={classes.wrap}>
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
            </div>
          );
        }
      })}
    </div>
  );
}

const AdaptiveWithDetector = withResizeDetector(Content);

export default function ChatContent(props) {
  return (
    <AdaptiveWithDetector {...props} />
  );
}
