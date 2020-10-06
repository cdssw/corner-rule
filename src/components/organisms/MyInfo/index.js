import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SettingsIcon from '@material-ui/icons/Settings';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import Person from "@material-ui/icons/Person";
import { Avatar, Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    padding: '20px 10px 10px 10px',
  },
  avatarWrap: {
    width: '90px',
    height: '90px',
    position: 'relative',
  },
  profile: {
    position: 'absolute',
    border: '2px solid #919394',
    borderRadius: '90px',
    width: '100%',
    height: '100%',
    backgroundColor: 'lightgray',
  },  
  avatarRoot: {
    width: '86px',
    height: '86px',
    '& img': {
      maxWidth: '100%',
    },
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
    '& > div': {
      paddingLeft: '10px',
    },
  },
  buttonTextColor: {
    color: '#707070',
  },
}));

export default function MyInfo(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.avatarWrap}>
        <div className={classes.profile}>
          <Avatar classes={{root: classes.avatarRoot}}>
            {props.userInfo.avatarPath
            ? <img src={process.env.REACT_APP_IMAGE + props.userInfo.avatarPath} alt='' />
            : <Person classes={{fontSizeLarge: classes.fontSizeLarge}} fontSize='large' />
            }
          </Avatar>
        </div>
      </div>
      <div className={classes.infoWrap}>
        <div>{props.userInfo.userNickNm}</div>
        <div>{props.userInfo.userNm}</div>
        <div>{props.userInfo.phone}</div>
      </div>
      <div className={classes.modifyWrap}>
        <div className={classes.logoutWrap}>
          <div><SettingsIcon /></div>
          <div onClick={props.onLogout}><PowerSettingsNewIcon /></div>
        </div>
        <Button classes={{label: classes.buttonTextColor}} color='primary' variant="outlined" fullWidth={true} onClick={props.onPasswordChange}>비밀번호 변경</Button>
      </div>
    </div>
  );
}
