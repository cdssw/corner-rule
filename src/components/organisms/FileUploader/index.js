import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    zIndex: 1,
  },
  uploadWrap: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '300px',
    height: '80px',
    backgroundColor: 'white',
    border: 'solid 1px #707070',
    borderRadius: '10px',
    marginTop: '200px',
  },
  countWrap: {
    width: '90%',
    marginBottom: '10px',
  },
  progress: {
    width: '90%',
  },
}));

export default function FileUploader(props) {
  const classes = useStyles();

  return (
    <>
      <div className={classes.root}>
        <div className={classes.uploadWrap}>
          <div className={classes.countWrap}>{props.current}/{props.total}</div>
          <LinearProgress classes={{root: classes.progress}} variant="determinate" value={props.value} />
        </div>
      </div>
    </>
  );
}
