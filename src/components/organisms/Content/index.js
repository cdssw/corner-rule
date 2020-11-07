import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Person from "@material-ui/icons/Person";
import { Button, Badge, Avatar } from '@material-ui/core';
import Utils from "../../Utils";
import * as resources from "constants/resources";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    maxWidth: '600px',
    padding: '0 10px',
    marginBottom: '15px',
  },
  wrap: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    marginBottom: '8px',
  },
  buttonWrap: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
  },
  date: {
    display: 'flex',    
    alignItems: 'center',
    color: '#23c9bd',
    paddingLeft: '3px',
  },
  location: {
    display: 'flex',    
    alignItems: 'center',
    color: '#5a6482',
  },
  detail: {
    flexGrow: 1,
    marginLeft: '8px',
  },
  title: {
    fontWeight: 'bold',
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
    border: '2px solid #919394',
  },
  avatarImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  iconSize: {
    fontSize: '1.2rem',
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

export default function Content({userInfo, meet, applicationMeet, onApplication, onApproval, onChatClick}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
    {meet && 
      <>
        <div className={classes.wrap}>
          <div className={classes.space}>
            <div className={classes.title}>{meet.title}</div>
            <div className={classes.titleBottom}>
              <div className={classes.regDate}>{Utils.parseDate(meet.modifyDt, '월 ')}일 {meet.modifyDt.split(' ')[1].substring(0, 5)}</div>
              <div className={classes.space}></div>
              <div className={classes.commWrap}>
                <div className="ico"><img src={resources.chat} alt="chat" /></div>
                <div style={{paddingRight: '5px'}}>{meet.chatCnt}</div>
                <div className="ico"><img src={resources.man} alt="man" /></div>
                <div>{meet.application}/{meet.recruitment}</div>
              </div>
            </div>
          </div>
        </div>
        <div className={classes.wrap}>
          <div className={classes.date}>
            <CalendarTodayIcon classes={{root: classes.iconSize}} />
            <div className={classes.detail}>
              {Utils.parseDate(meet.term.startDt, '월 ')}일 ~ {Utils.parseDate(meet.term.endDt, '월 ')}일 {Utils.detailDay(meet.term)} 
              ({meet.term.startTm} ~ {meet.term.endTm})
            </div>
          </div>
        </div>
        <div className={classes.wrap}>
          <div className={classes.location}>
            <LocationOnIcon />
            <div className={classes.detail}>
              {(userInfo && userInfo.username === meet.user.username)
               || (userInfo && userInfo.username !== meet.user.username && meet.approvalYn && meet.approvalDt != null)
                ? (meet.address.address1 + ' ' + meet.address.address2)
                : (meet.address.sido, meet.address.sgg)
              }
            </div>
          </div>
        </div>
        <div style={{borderBottom: '1px solid #dfdfdf', width: '100%'}}></div><div style={{marginBottom: '10px'}}></div>
        <div className={classes.wrap}>
          <div>{meet.content.split('\n').map((line, i) => <span key={i}>{line}<br/></span>)}</div>
        </div>
        <div style={{borderBottom: '1px solid #dfdfdf', width: '100%'}}></div><div style={{marginBottom: '20px'}}></div>
        {userInfo && userInfo.username !== meet.user.username &&
          <div className={classes.buttonWrap}>
            <Badge classes={{badge: classes.badge}} badgeContent={meet.chatUnread} color="secondary">
              <Button variant="contained" color='primary' onClick={() => onChatClick(meet.user.username)}>채팅문의</Button>
            </Badge>
            <div style={{width: '13px'}}></div>
            {meet.approvalYn
            ? meet.approvalDt != null
              ? <div className={classes.approval}>승인완료</div>
              : <Button variant="contained" color='secondary' disabled={true}>승인요청중</Button>
            : <Button variant="contained" color='secondary' onClick={() => onApplication()} disabled={meet.approvalYn}>{meet.approvalYn ? '승인요청중' : '지원하기'}</Button>
            }
          </div>
        }
        {userInfo && userInfo.username === meet.user.username && applicationMeet.length > 0 &&
          <>
            <div className={classes.wrap}>지원자 및 문의</div>
            {applicationMeet.map((m, index) => {
              return (
                <div key={index} className={classes.wrap}>
                  <div>
                    <Avatar
                      classes={{root: classes.avatarRoot, img: classes.avatarImg}}
                      alt={m.userNickNm}
                      src={m.avatarPath && process.env.REACT_APP_IMAGE + m.avatarPath}
                    >
                      {(m.avatarPath == null) && <Person />}
                    </Avatar>
                  </div>
                  <div className={classes.userName}>{m.userNickNm}</div>        
                  <div className={classes.space}></div>
                  {m.approvalYn !== undefined &&
                    <Button variant="contained" color='secondary' onClick={(e) => onApproval(m.id)} disabled={m.approvalYn}>{m.approvalYn ? m.approvalDt : '확정'}</Button>
                  }
                  <div style={{width: '4px'}}></div>
                  <Badge classes={{badge: classes.badge}} badgeContent={m.count} color="secondary">
                    <Button variant="contained" color='primary' onClick={() => onChatClick(m.username)}>채팅</Button>
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
