import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  wrap: {
    height: '100vh',
  },
  header: {
    backgroundColor: theme.colorA,
    display: 'flex',
    justifyContent: 'center',
    position: 'fixed',
    width: '100%',
    height: '8vh',
    zIndex: '1000',
  },
  headerWrap: {
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxWidth: '600px',
    padding: '0 10px',
  },
  content: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 'auto',
    display: 'flex',
    justifyContent: 'center',
  },
  contentWrap: {
    marginTop: '8vh',
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'center',
    maxWidth: '600px',
    padding: '0 10px',
    flexDirection: 'column',
  }
}));

export default function PageTemplate(props) {
  const classes = useStyles();

  return (
    <div className={classes.wrap}>
      <header className={classes.header}>
        <div className={classes.headerWrap}>{props.header}</div>
      </header>
      <section className={classes.content}>
        <div className={classes.contentWrap}>{props.children}</div>
      </section>
    </div>
  );
}
