import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar } from '@material-ui/core';
import Person from "@material-ui/icons/Person";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  header: {
    position: 'relative',
    margin: '0 auto',
    boxSizing: 'border-box',
    height: '80px',
    backgroundColor: '#5475FF',
    padding: '0 10px',
  },
  headerWrap: {
    boxSizing: 'border-box',
    height: '100%',
    margin: '0 auto',
    maxWidth: '600px',
    position: 'relative',
  },
  logo: {
    position: 'absolute',
    top: '20px',
    left: '48%',
    transform: 'translate(-50%)',
    width: '110px',
  },
  name: {
    color: 'white',
    fontSize: '0.9rem',
    position: 'absolute',
    right: '45px',
    top: '25px',
  },
  avatar: {
    position: 'absolute',
    right: '0px',
    top: '18px',
    border: '2px solid white',
    width: '33px',
    height: '33px',
  },
}));

export default function (props) {
  const classes = useStyles();

  return (
    <header className={classes.header}>
      <div className={classes.headerWrap}>
        <img className={classes.logo} src={process.env.PUBLIC_URL + "/images/logo_small.png"} />
        <div className={classes.name}>{props.userInfo && props.userInfo.userNm}</div>
        <Link to='/login'>
          <Avatar className={classes.avatar}><Person/></Avatar>
        </Link>
      </div>
    </header>
  );
}
