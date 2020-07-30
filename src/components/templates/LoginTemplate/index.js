import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import * as resources from "constants/resources";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.colorA,
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    minHeight: '600px',
  }, 
  headerWrap: {
    flexBasis: '50px',
    display: 'flex',
    justifyContent: 'center',
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
    padding: '40px',
  },
  logo: {
    width: '154px',
    height: '129px',
  },
  contentWrap: {
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'center',
  },
  content: {
    flexGrow: 1,
    padding: '0 30px',
    maxWidth: '600px',
  },
  footerWrap: {
    flexBasis: '50px',
    backgroundColor: 'white',
    padding: '10px 0 30px 0',
  },
}));

export default function LoginTemplate(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.headerWrap}>
        <header className={classes.header}>
          <div className={classes.arrowWrap}>
            <Link to="/">
              <ArrowBackIcon className={classes.arrow} />
            </Link>
          </div>
        </header>
      </div>
      <div className={classes.logoWrap}>
        <img className={classes.logo} src={resources.logo} />
      </div>
      <div className={classes.contentWrap}>
        <section className={classes.content}>
          {props.children}
        </section>
      </div>
      <footer className={classes.footerWrap}>
        {props.footer}
      </footer>
    </div>
  );
}
