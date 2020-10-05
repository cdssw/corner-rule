import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ForumIcon from '@material-ui/icons/Forum';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Person from "@material-ui/icons/Person";
import { Button, Badge, Avatar } from '@material-ui/core';
import Utils from "../../Utils";

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
    marginBottom: '15px',
  },
  buttonWrap: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
  },
  date: {
    display: 'flex',    
    alignItems: 'center',
    color: '#23c9bd'
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
    display: 'flex',
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
    height: 'auto',
  },
}));

export default function Content({userInfo, meet}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
    {meet && 
      <>
        <div className={classes.wrap}>
          <div className={classes.space}>
            <div className={classes.title}>{meet.title}</div>
            <div className={classes.titleBottom}>
              <div className={classes.regDate}>{Utils.parseDate(meet.modifyDt, '.')} {meet.modifyDt.split(' ')[1].substring(0, 5)}</div>
              <div className={classes.space}></div>
              <div className={classes.commWrap}>
                <div className="ico"><ForumIcon fontSize="small" /></div>
                <div>5</div>
                <div className="ico"><PermIdentityIcon fontSize="small" /></div>
                <div>{meet.application}/{meet.recruitment}</div>
              </div>
            </div>
          </div>
        </div>
        <div className={classes.wrap}>
          <div className={classes.date}>
            <CalendarTodayIcon />
            <div className={classes.detail}>
              {Utils.parseDate(meet.term.startDt)} - {Utils.parseDate(meet.term.endDt)}{Utils.detailDay(meet.term)} 
              ({meet.term.startTm} - {meet.term.endTm})
            </div>
          </div>
        </div>
        <div className={classes.wrap}>
          <div className={classes.location}>
            <LocationOnIcon />
            <div className={classes.detail}>{meet.address.address1}</div>
          </div>
        </div>
        <div style={{borderBottom: '1px solid #dfdfdf', width: '100%'}}></div><div style={{marginBottom: '20px'}}></div>
        <div className={classes.wrap}>
          <div>{meet.content}</div>
        </div>
        <div style={{borderBottom: '1px solid #dfdfdf', width: '100%'}}></div><div style={{marginBottom: '20px'}}></div>
        {userInfo.username !== meet.user.username
         ?
          <div className={classes.buttonWrap}>
            <Badge classes={{badge: classes.badge}} badgeContent={4} color="secondary">
              <Button variant="contained" color='primary'>채팅문의</Button>
            </Badge>
            <div style={{width: '13px'}}></div>
            <Button variant="contained" color='secondary'>지원하기</Button>
          </div>
          :
          <>
            <div className={classes.wrap}>지원자 및 문의</div>
            <div className={classes.wrap}>
              <div>
                <Avatar
                  classes={{root: classes.avatarRoot, img: classes.avatarImg}}
                  alt={userInfo && userInfo.userNm}
                  src={userInfo && userInfo.avatarPath && process.env.REACT_APP_IMAGE + userInfo.avatarPath}
                >
                  {(userInfo == null || userInfo.avatarPath == null) && <Person />}
                </Avatar>
              </div>
              <div className={classes.userName}>홍길동</div>        
              <div className={classes.space}></div>
              <Button variant="contained" color='secondary'>확정</Button>
              <div style={{width: '4px'}}></div>
              <Badge classes={{badge: classes.badge}} badgeContent={2} color="secondary">
                <Button variant="contained" color='primary'>채팅</Button>
              </Badge>
            </div>
          </>
        }
      </>
    }
    </div>
  );
}
