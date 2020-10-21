import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar } from '@material-ui/core';
import Person from "@material-ui/icons/Person";
import { Link } from "react-router-dom";
import * as resources from "constants/resources";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    maxWidth: '600px',
    padding: '0 10px',
  },
  logo: {
    width: '120px',
    height: '35px',
  },
  space: {
    flexGrow: 1,
  },
  userName: {
    color: theme.colorWhite,
    paddingRight: '5px',
  },
  avatarRoot: {
    width: '35px',
    height: '35px',
    border: '2px solid white',
  },
  avatarImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
}));

export default function Header({userInfo, path}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <img className={classes.logo} src={resources.logoHorizon} alt="logo" />
      <div className={classes.space}></div>
      <div className={classes.userName}>{userInfo && userInfo.userNickNm}</div>
      <div>
        <Link to={path}>
          <Avatar
            classes={{root: classes.avatarRoot, img: classes.avatarImg}}
            alt={userInfo && userInfo.userNickNm}
            src={userInfo && userInfo.avatarPath && process.env.REACT_APP_IMAGE + userInfo.avatarPath}
          >
            {(userInfo === null || userInfo.avatarPath === null || userInfo.avatarPath === '') && <Person />}</Avatar>
        </Link>
      </div>
    </div>
  );
}
