import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar } from '@material-ui/core';
import Person from "@material-ui/icons/Person";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  logo: {
    width: '110px',
  },
}));

export default function Header({userInfo}) {
  const classes = useStyles();

  return (
    <>
      <img className={classes.logo} src={process.env.PUBLIC_URL + "/images/logo_small.png"} />
      <div>
        <Link to='/login'>
          <Avatar
            alt={userInfo && userInfo.userNm}
            src={userInfo && process.env.PUBLIC_URL + "/images/foreigner1.png"}
          >
            {!userInfo && <Person />}</Avatar>
        </Link>
      </div>
    </>
  );
}
