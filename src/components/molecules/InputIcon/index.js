import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  inputWrap: {
    border: '1px solid #c4c4c4',
    borderRadius: '5px',
    padding: '0 5px 0 5px',
    backgroundColor: 'white',
    display: 'flex',
    alignItems: 'center',
    '&:focus-within': {
      borderColor: '#707070',
    },
  },
  input: {
    width: '100%',
    lineHeight: 'normal',
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

export default function InputIcon({type, name, icon, invalid, validMessage, value, onChange}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.inputWrap}>
        <input
          className={classes.input}
          type={type || 'text'}
          name={name}
          onChange={onChange}
          value={value}
        />
        <span className={classes.icon}>{icon}</span>
      </div>
      {invalid && <div className={classes.invalid}><Typography component="span" variant="caption">{validMessage}</Typography></div>}
    </div>
  );
}
