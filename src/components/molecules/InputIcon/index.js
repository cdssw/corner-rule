import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  inputWrap: {
    border: '1px solid #DDD',
    borderRadius: '5px',
    padding: '0 10px 0 5px',
    backgroundColor: 'white',
    display: 'flex',
    alignItems: 'center',
  },
  input: {
    width: '100%',
    height: '30px',
    outline: 'none',
    border: 'none',
    fontSize: '1rem',
  },
  invalid: {
    color: theme.palette.error.dark,
  },
  icon: {
    paddingTop: '5px',
  }
}));

export default function InputIcon({type, name, icon, invalid, validMessage, onChange}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.inputWrap}>
        <input
          className={classes.input}
          type={type || 'text'}
          name={name}
          onChange={onChange}
        />
        <span className={classes.icon}>{icon}</span>
      </div>
      {invalid && <div className={classes.invalid}><Typography variant="caption">{validMessage}</Typography></div>}
    </div>
  );
}
