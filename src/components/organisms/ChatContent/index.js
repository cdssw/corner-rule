import React, { useEffect, useRef, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { withResizeDetector } from "react-resize-detector";
import classnames from "classnames";
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  root: {
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
  move: {
    position: 'relative',
    top: '200px',
  }
}));

function Content(props) {
  const classes = useStyles();
  const week = ['일', '월', '화', '수', '목', '금', '토'];
  const isSafari = navigator.vendor.includes('Apple');
  const [root, setRoot] = useState(classnames(classes.root));
  const [load, setLoad] = useState(false);
  const [prev, setPrev] = useState(0);

  useEffect(e => {
    window.scrollTo(0, document.body.scrollHeight);
    window.addEventListener('scroll', handleScroll);
    return () => { window.removeEventListener('scroll', handleScroll)}
  }, []);

  useEffect(e => {
    if(load) {
      props.onMore();
    }
  }, [load]);

  useEffect(() => {
    props.onHeightChange(props.height);
    if(isSafari) {
      if(props.height > document.body.offsetHeight - 105) {
        setRoot(classnames(classes.root));
      } else {
        if(props.focus && props.height < document.body.offsetHeight / 2) {
          setRoot(classnames(classes.root, classes.move));
        } else {
          setRoot(classnames(classes.root));
        }
      }
    } else {
      setRoot(classnames(classes.root));
    }
    if(!load) {
      // 아이폰의 경우 footer의 상대 위치를 구한다.
      const position = props.footerRef.current.getBoundingClientRect();
      // body 스크롤바에서 footer의 아래 position을 빼준다.
      let top = document.body.scrollHeight - position.bottom;
      // console.log(position, document.body.scrollHeight);
      if(props.focus) { // 입력할려고 focus를 잡으면
        // console.log('prev init ', top);
        setPrev(top); // 현재 위치값을 저장
      }

      if(prev !== 0) { // focus가 잡힌적이 있으면
        // console.log('prev ', prev, 'top ', top);
        if(top < prev) { // 현재 위치가 이전 위치보다 작으면 (줄을 줄였으면)
          top = prev - 19; // 아이폰의 1줄 height가 19로 나옴, 그만큼을 scrollbar 이동
          // console.log('set prev ', top);
          setPrev(top); // 다시 현재 값을 저장
        }
      }
      // console.log('top ', top);
      // const top = position.top + window.pageYOffset - position.y;
      // console.log(top, position, position.top + window.pageYOffset, position.top + window.pageYOffset - position.y);
      window.scrollTo({top: top, left: 0, behavior: 'smooth'});  
    }
  }, [props.height, props.focus, props.bottom]);

  const handleScroll = e => {
    if(window.pageYOffset === 0) {
      setLoad(true);
    } else {
      setLoad(false);
    }
  };

  return (
    <div className={root} style={{marginBottom: props.bottom}}>
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
