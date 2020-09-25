import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CircularProgress } from '@material-ui/core';

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
    height: '50px',
    zIndex: '1000',
  },
  contentWrap: {
    display: 'flex',
    justifyContent: 'center',
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
  loading: {
    margin: '30px auto',
  },
}));

export default function PageTemplate(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <header className={classes.headerWrap}>
        {props.header}
      </header>
      <section className={classes.contentWrap}>
        <div className={classes.content}>
          {props.loading &&
            <div className={classes.loading}>
              <CircularProgress size={30} />
            </div>
          }
          {props.children}
        </div>
      </section>
    </div>
  );
}
