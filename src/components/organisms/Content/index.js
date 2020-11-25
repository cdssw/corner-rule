import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Badge, Avatar, withStyles } from '@material-ui/core';
import Utils from "../../Utils";
import * as resources from "constants/resources";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    maxWidth: '600px',
    marginBottom: '15px',
  },
  wrap: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    marginBottom: '5px',
  },
  buttonWrap: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
  },
  date: {
    display: 'flex',    
    color: '#23c9bd',
  },
  location: {
    display: 'flex',    
    alignItems: 'center',
    color: '#5a6482',
    paddingLeft: '1px',
  },
  detail: {
    flexGrow: 1,
    marginLeft: '8px',
  },
  titleWrap: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  title: {
    fontFamily: 'AppleSDGothicNeoB00',
  },
  regDate: {
    fontSize: '13px',
    color: '#919394',
  },
  titleBottom: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  commWrap: {
    display: 'flex',
    fontSize: '15px',
    color: '#95989A',
    right: '10px',
    '& div': {
      paddingLeft: '2px',
    },
    '& .ico': {
      paddingTop: '2px',
    },
  },
  space: {
    flexGrow: 1,
  },
  badge: {
    border: '1px solid white'
  },
  avatarRoot: {
    width: '35px',
    height: '35px',
    marginRight: '6px',
    border: '2px solid ' + theme.color.border,
    backgroundColor: theme.color.green,
  },
  avatar: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  time: {
    color: '#5985dc'
  },
  day: {
    color: theme.color.green,
  },
  approval: {
    padding: '10px 10px',
    borderRadius: '12px',
    backgroundColor: '#8cfb97',
    fontWeight: 'bold',
    color: '#137e13',
    textAlign: 'center',
  },
}));

const ColorButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText('#59b8dc'),
    backgroundColor: '#59b8dc',
    '&:hover': {
      backgroundColor: '#3C93B4',
    },
  },
  label: {
    color: theme.color.white,
  }
}))(Button);

export default function Content({userInfo, meet, applicationMeet, onApplication, onApproval, onChatClick, onModify, onApplicator, onEstimate, onMeetEnd}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
    {meet && 
      <>
        <div className={classes.wrap}>
          <div className={classes.space}>
            <div className={classes.titleWrap}>
              <div className={classes.title}>{meet.title}</div>
            </div>
            <div className={classes.titleBottom}>
              <div className={classes.regDate}>{Utils.parseDate(meet.modifyDt, '월 ')}일 {meet.modifyDt.split(' ')[1].substring(0, 5)}</div>
              <div className={classes.space}></div>
              <div className={classes.commWrap}>
                <div className="ico"><img src={resources.chat} alt="chat" /></div>
                <div style={{paddingRight: '5px'}}>{meet.chatCnt}</div>
                <div className="ico"><img src={resources.userGray} alt="user_gray" /></div>
                <div>{meet.recruitment - meet.application}</div>
              </div>
            </div>
          </div>
        </div>
        <div style={{marginBottom: '15px'}}></div>
        <div className={classes.wrap}>
          <div className={classes.date}>
            <img src={resources.alarm} alt="alarm" />
            <div className={classes.detail}>
              {meet.term.dtOption && <span>{Utils.parseDate(meet.term.startDt)} - {Utils.parseDate(meet.term.endDt)} </span>}
              {meet.term.tmOption
                ? <span className={classes.time}>시간협의 </span>
                : <span className={classes.time}>{meet.term.startTm}~{meet.term.endTm} </span>
              }
              <span className={classes.day}>{Utils.detailDay(meet.term)}</span>
            </div>
          </div>
        </div>
        <div className={classes.wrap}>
          <div className={classes.location}>
            <img src={resources.location} alt="location" />
            <div className={classes.detail}>
              {(userInfo && userInfo.username === meet.user.username)
               || (userInfo && userInfo.username !== meet.user.username && meet.approvalYn && meet.approvalDt != null)
                ? (meet.address.address1 + ' ' + meet.address.address2)
                : (meet.address.sido, meet.address.sgg)
              }
            </div>
          </div>
        </div>
        <div style={{marginBottom: '20px'}}></div>
        <div className={classes.wrap}>
          <div>{meet.content.split('\n').map((line, i) => <span key={i}>{line}<br/></span>)}</div>
        </div>
        <div style={{marginBottom: '15px'}}></div>
        {userInfo && userInfo.username !== meet.user.username &&
          <>
            <div style={{borderBottom: '1px solid #dfdfdf', width: '100%'}}></div>
            <div style={{marginBottom: '30px'}}></div>
            <div className={classes.buttonWrap}>
              {meet.approvalYn
              ? meet.approvalDt != null
                ? <Button startIcon={<img src={resources.applicationRed} alt="application_red" />} variant="outlined" color='secondary'>승인완료</Button>
                : <Button startIcon={<img src={resources.application} alt="application" />} variant="contained" color='secondary' disabled={true}>승인요청중</Button>
              : <Button startIcon={<img src={resources.application} alt="application" />} variant="contained" color='secondary' onClick={() => onApplication()} disabled={meet.approvalYn}>{meet.approvalYn ? '승인요청중' : '지원하기'}</Button>
              }
              <div style={{width: '13px'}}></div>
              <Badge classes={{badge: classes.badge}} badgeContent={meet.chatUnread} color="secondary">
                <Button startIcon={<img src={resources.chatWhite} alt="chat_white" />} variant="contained" color='primary' onClick={() => onChatClick(meet.user.username)}>채팅문의</Button>
              </Badge>
            </div>
          </>
        }
        {userInfo && userInfo.username === meet.user.username && applicationMeet.length > 0 &&
          <>
            <div className={classes.wrap}>지원자 및 문의</div>
            <div style={{borderBottom: '1px solid #dfdfdf', width: '100%'}}></div>
            <div style={{marginBottom: '20px'}}></div>
            {applicationMeet.map((m, index) => {
              return (
                <div key={index} className={classes.wrap}>
                  <div>
                    <Avatar
                      classes={{root: classes.avatarRoot}}
                      onClick={() => onApplicator(m.username)}
                    >
                      {m.avatarPath
                      ? <img className={classes.avatar} src={process.env.REACT_APP_IMAGE + m.avatarPath} alt='' />
                      : <img src={resources.user} alt="user" />
                      }
                    </Avatar>
                  </div>
                  <div className={classes.userName}>{m.userNickNm}</div>        
                  <div className={classes.space}></div>
                  {m.approvalYn !== undefined && m.approvalYn === false &&
                    <>
                      <Button startIcon={<img style={{width: '16px'}} src={resources.application} alt="application" />} variant="contained" color='secondary' onClick={(e) => onApproval(m.id)}>승인</Button>
                      <div style={{width: '4px'}}></div>
                    </>
                  }
                  {m.approvalYn === true && m.estimate === null && 
                    <ColorButton startIcon={<img style={{width: '16px'}} src={resources.estimate} alt="estimate" />} variant="contained" onClick={(e) => onEstimate(m.username)}>평가</ColorButton>
                  }
                  <div style={{width: '4px'}}></div>
                  <Badge classes={{badge: classes.badge}} badgeContent={m.count} color="secondary">
                    <Button startIcon={<img style={{width: '16px'}} src={resources.chatWhite} alt="chat_white" />} variant="contained" color='primary' onClick={() => onChatClick(m.username)}>채팅</Button>
                  </Badge>
                </div>
              );
            })}
          </>
        }
        </>
      }
    </div>
  );
}
