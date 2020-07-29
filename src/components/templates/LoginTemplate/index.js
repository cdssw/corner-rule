import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import * as resources from "constants/resources";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    backgroundColor: theme.colorA,
  },
  headerWrap: {
    backgroundColor: theme.colorA,
    display: 'flex',
    justifyContent: 'center',
    position: 'fixed',
    width: '100%',
    height: '50px',
  },
  header: {
    flexGrow: 1,
    maxWidth: '600px',
  },
  arrowWrap: {
    padding: '13px 0 10px 10px',
  },
  arrow: {
    color: 'white',
  },
  logoWrap: {
    display: 'flex',
    justifyContent: 'center',
    padding: '15vh 0 15vh 0',
  },
  logo: {
    width: '154px',
    height: '129px',
  },
  contentWrap: {
    backgroundColor: theme.colorA,
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '67px',
  },
  content: {
    flexGrow: 1,
    padding: '0 30px',
    maxWidth: '600px',
  },
  footerWrap: {
    paddingTop: '13px',
    paddingBottom: '12px',
    backgroundColor: 'white',
    display: 'flex',
    justifyContent: 'center',
    position: 'fixed',
    bottom: 0,
    width: '100%',
  },
}));

export default function LoginTemplate(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <header className={classes.headerWrap}>
        <div className={classes.header}>
          <div className={classes.arrowWrap}>
            <Link to="/">
              <ArrowBackIcon className={classes.arrow} />
            </Link>
          </div>
        </div>
      </header>
      <div className={classes.logoWrap}>
        <img className={classes.logo} src={resources.logo} />
      </div>
      <div className={classes.contentWrap}>
        <div className={classes.content}>
          {props.children}
        </div>
      </div>
      <div className={classes.footerWrap}>
        {props.footer}
      </div>
    </div>
  );
}
