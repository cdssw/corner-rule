import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, IconButton } from '@material-ui/core';
import * as resources from "constants/resources";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    padding: '20px 0 10px 15px',
  },
  avatarWrap: {
    width: '90px',
    height: '90px',
    position: 'relative',
  },
  profile: {
    position: 'absolute',
    border: '2px solid ' + theme.color.border,
    borderRadius: '90px',
    width: '100%',
    height: '100%',
  },  
  avatarRoot: {
    width: '86px',
    height: '86px',
    backgroundColor: theme.color.green,
  },
  avatar: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  infoWrap: {
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    margin: '8px 0 8px 0',
    paddingLeft: '10px',
    '& > div': {
      color: '#707070'
    }
  },
  nickNm: {
    fontFamily: 'AppleSDGothicNeoB00',    
  },
  name: {
    fontFamily: 'AppleSDGothicNeoT00',
  },
  modifyWrap: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    color: '#5a6482',
    paddingBottom: '8px',
  },
  logoutWrap: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  buttonTextColor: {
    color: '#707070',
  },
}));

export default function MyInfo(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {props.userInfo &&
        <>
          <div className={classes.avatarWrap}>
            <div className={classes.profile}>
              <Avatar classes={{root: classes.avatarRoot}}>
                {props.userInfo.avatarPath
                ? <img className={classes.avatar} src={process.env.REACT_APP_IMAGE + props.userInfo.avatarPath} alt='' />
                : <img src={resources.user} alt='user' style={{width: '44px'}} />
                }
              </Avatar>
            </div>
          </div>
          <div className={classes.infoWrap}>
            <div className={classes.nickNm}>{props.userInfo.userNickNm}</div>
            <div className={classes.name}>{props.userInfo.userNm}</div>
            <div className={classes.name}>{props.userInfo.phone}</div>
          </div>
          <div className={classes.flexGrow}></div>
          <div className={classes.modifyWrap}>
            <div className={classes.logoutWrap}>
              <IconButton
                onClick={props.onLogout}
                classes={{root: classes.btnRoot}}
              >
                <img src={resources.logout} alt='logout' />
              </IconButton>
              {/* <div onClick={props.onLogout}><img src={resources.logout} alt='logout' /></div> */}
            </div>
          </div>
        </>
      }
    </div>
  );
}
