import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { withResizeDetector } from "react-resize-detector";

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
}));

function Content(props) {
  const classes = useStyles();
  const week = ['일', '월', '화', '수', '목', '금', '토'];
  const isSafari = navigator.vendor.includes('Apple');
  const [load, setLoad] = useState(false);
  const [prev, setPrev] = useState(0);

  useEffect(e => {
    if(load) {
      props.onMore();
    }
  }, [load]);

  // 메시지를 보내면 이전 scrollTop 위치는 초기화
  useEffect(() => {
    setPrev(0);
  }, [props.chat])

  useEffect(() => {
    // 아이폰의 경우
    if(isSafari) {
      // 입력창에 focus가 갈 경우
      if(props.focus && !load) {
        // 현재 스크롤 위치가 이전보다 크면 (내용이 추가되었으면)
        // 이전 스크롤 위치를 현재 위치로 설정, 아니면 이전 스크롤 위치 그대로 사용
        const p = document.documentElement.scrollTop > prev ? document.documentElement.scrollTop : prev;
        setPrev(p);
        window.scrollTo({top: p, left: 0});  
      }
      if(!props.focus && !load) {
        if(props.chat.length > 5) {
          // 글을 입력하면 스크롤을 맨 아래로 이동
          window.scrollTo(0, props.height);
        } else {
          window.scrollTo(0, 0);
        }
      }
    } else { // 아이폰이 아니면
      // 입력창에 focus가 가고 history가 로딩이 아니면
      if(props.focus || !load) {
        setTimeout(() => {
          // 0.5초 후에 스크롤을 맨 아래로 내림, 안드로이드 가상키보드가 올라올 시간을 주기 위함
          window.scrollTo({top: document.body.scrollHeight, left: 0, behavior: 'smooth'});  
        }, 500);
      } else if(!load) {
        // height 또는 bottom(두줄)이 바뀐 경우라 history가 아닌 경우 무조건 맨아래로
        window.scrollTo({top: document.body.scrollHeight, left: 0, behavior: 'smooth'});
      }      
    }
  }, [props.height, props.focus, props.bottom]);

  useEffect(e => {
    window.addEventListener('scroll', handleScroll);
    return () => { window.removeEventListener('scroll', handleScroll)}
  }, []);

  const handleScroll = e => {
    // 스크롤이 맨위를 넘어가면 추가로 히스토리를 로딩한다.
    // 아이폰이 아닌 경우 inputbox에서 focus를 해제 한다.
    if(!isSafari) {
      if(window.pageYOffset <= 0) { // top 0도 포함하여 계산
        props.inputRef.current.blur();
        setLoad(true);
      } else {
        setLoad(false);
      }
    } else {
      // 아이폰의 경우 top이 0 미만으로 떨어질 경우만 로딩
      if(window.pageYOffset < 0) {
        setLoad(true);
      } else {
        setLoad(false);
      }
    }
  };

  return (
    <div className={classes.root}
      style={{marginBottom: props.bottom}}
    >
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
