import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Link } from "react-router-dom";
import * as resources from "constants/resources";

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
    padding: '11px 0 5px 0',
  },
  arrow: {
    color: 'white',
  },
  title: {
    color: theme.colorWhite,
    fontSize: '1rem',
  },
  space: {
    padding: '10px 24px 10px 0px',
  }
}));

export default function TitleHeader({children}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.arrowWrap}>
        <Link to="/">
          <ArrowBackIcon className={classes.arrow} />
        </Link>
      </div>
      <div className={classes.title}>{children}</div>
      <div className={classes.space}></div>
    </div>
  );
}
