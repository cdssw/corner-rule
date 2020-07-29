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
    backgroundColor: theme.colorA,
  },
  arrowWrap: {
    padding: '13px 0 10px 10px',
  },
  arrow: {
    color: 'white',
  },
  logoWrap: {
    margin: '20px auto',
  },
  logo: {
    width: '154px',
    height: '129px',
  },
  contentWrap: {
    flexGrow: 1,
    padding: '0 40px',
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
        {props.children}
      </div>
      <div className={classes.footerWrap}>
        {props.footer}
      </div>
    </div>
  );
}
