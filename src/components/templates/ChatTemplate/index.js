import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CircularProgress } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    // height: '100vh',
  },
  headerWrap: {
    backgroundColor: theme.colorA,
    display: 'flex',
    justifyContent: 'center',
    position: 'fixed',
    top: 0,
    width: '100%',
    height: '50px',
    zIndex: '1000',
  },
  contentWrap: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
  },
  content: {
    marginTop: '50px',
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    maxWidth: '600px',
    padding: '0 10px',
  },
  imageContent: {
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    maxWidth: '600px',
    padding: '0 10px',
  },
  loading: {
    backgroundColor: 'rgba(0, 0, 0, 0)',
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  footerWrap: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
}));

export default function ChatTemplate(props) {
  const classes = useStyles();

  const content = props.imageWrap ? classes.imageContent : classes.content;

  return (
    <div className={classes.root}>
      {props.header && <header className={classes.headerWrap}>{props.header}</header>}
      <section className={classes.contentWrap}>
        <div className={content}>
          {props.loading &&
            <div className={classes.loading}>
              <CircularProgress size={30} />
            </div>
          }
          {props.children}
        </div>
      </section>
      {props.footer && <footer className={classes.footerWrap}>{props.footer}</footer>}
    </div>
  );
}
