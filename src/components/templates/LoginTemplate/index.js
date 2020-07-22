import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import * as resources from "constants/resources";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    flexDirection: 'column',
    height: '100%',
    backgroundColor: '#5a6482',
  },
  arrowWrap: {
    padding: '10px 0 10px 10px',
  },
  arrow: {
    color: 'white',
  },
  logoWrap: {
    margin: '20px auto',
  },
  contentWrap: {
    flexGrow: 1,
  },
  footerWrap: {
    paddingTop: '13px',
    paddingBottom: '12px',
    backgroundColor: 'white',
    display: 'flex',
    justifyContent: 'center',
  },
}));

export default function LoginTemplate(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.arrowWrap}>
        <Link to="/">
          <ArrowBackIcon className={classes.arrow} />
        </Link>
      </div>
      <div className={classes.logoWrap}>
        <img className={classes.logo} src={resources.logo} />
      </div>
      <div className={classes.contentWrap}>
        {props.loginForm}
      </div>
      <div className={classes.footerWrap}>
        {props.footer}
      </div>
    </div>
  );
}
