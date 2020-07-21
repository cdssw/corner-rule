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
  },
  content: {
    backgroundColor: '#5a6482',
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  wrapArrow: {
  },
  arrow: {
    color: 'white',
  },
  logo: {
  },
  footer: {
    marginTop: 'auto',
    paddingTop: '13px',
    paddingBottom: '12px',
  }
}));

export default function LoginTemplate(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <div className={classes.wrapArrow}>
          <Link to="/">
            <ArrowBackIcon className={classes.arrow} />
          </Link>
        </div>
        <div>
          <img className={classes.logo} src={resources.logo} />
        </div>
        {props.loginForm}
      </div>
      <div className={classes.footer}>
        {props.footer}
      </div>
    </div>
  );
}
