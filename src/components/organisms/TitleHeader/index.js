import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxWidth: '600px',
    padding: '0 10px',
    height: '100%',
    flex: 1,
  },
  arrowWrap: {
    padding: '9px 0 5px 0',
  },
  arrow: {
    color: 'white',
  },
  title: {
    color: theme.colorWhite,
    fontFamily: 'AppleSDGothicNeoL00',
    fontSize: '1rem',
  },
  space: {
    padding: '10px 24px 10px 0px',
  }
}));

export default function TitleHeader(props) {
  const classes = useStyles();
  const history = useHistory();

  const handleBack = e => {
    props.onBack ? props.onBack() : history.goBack(1);
  }

  return (
    <div className={classes.root}>
      <div className={classes.arrowWrap}>
        <ArrowBackIcon className={classes.arrow} onClick={handleBack} />
      </div>
      <div className={classes.title}>{props.children}</div>
      <div className={classes.space}></div>
    </div>
  );
}
