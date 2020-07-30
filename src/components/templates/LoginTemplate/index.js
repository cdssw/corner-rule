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
  flexWrap: {
    display: 'flex',
    justifyContent: 'center',
  },
  container: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '600px',
  },
  headerWrap: {
    height: '50px',
  },
  header: {
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
  },
  logo: {
    width: '154px',
    height: '129px',
  },
  contentWrap: {
    display: 'flex',
    justifyContent: 'center',
    padding: '40px',
  },
  content: {
    padding: '0 30px',
  },
  footerWrap: {  
    backgroundColor: 'white',
    position: 'fixed',
    bottom: 0,
    width: '100%',
    margin: '0 auto',
    padding: '10px 0 30px 0',
  },
}));

export default function LoginTemplate(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.flexWrap}>
        <div className={classes.container}>
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
        </div>
      </div>
      <div className={classes.footerWrap}>
        {props.footer}
      </div>
    </div>
  );
}
