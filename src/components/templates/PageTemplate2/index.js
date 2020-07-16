import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    height: '100%',
    backgroundColor: '#EBEFF7',
  },  
}));

export default function PageTemplate2(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <header>{props.header}</header>
      <section>{props.children}</section>
    </div>
  );
}
