import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  headerWrap: {
    backgroundColor: theme.colorA,
    display: 'flex',
    justifyContent: 'center',
    position: 'fixed',
    width: '100%',
    height: '60px',
    zIndex: '1000',
  },
  contentWrap: {
    display: 'flex',
    justifyContent: 'center',
  },
  content: {
    marginTop: '60px',
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    maxWidth: '600px',
    padding: '0 10px',
  }
}));

export default function PageTemplate(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <header className={classes.headerWrap}>
        {props.header}
      </header>
      <section className={classes.contentWrap}>
        <div className={classes.content}>{props.children}</div>
      </section>
    </div>
  );
}
