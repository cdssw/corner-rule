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
  },
}));

export default function Header({userInfo}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <img className={classes.logo} src={resources.logoHorizon} />
      <div className={classes.space}></div>
      <div className={classes.userName}>{userInfo && userInfo.userNm}</div>
      <div>
        <Link to='/login'>
          <Avatar
            classes={{root: classes.avatarRoot}}
            alt={userInfo && userInfo.userNm}
            src={userInfo && process.env.PUBLIC_URL + "/images/foreigner1.png"}
          >
            {!userInfo && <Person />}</Avatar>
        </Link>
      </div>
    </div>
  );
}
