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
  main: {
    padding: 0,
    maxWidth: '100%',
  },
}));

export default function PageTemplate(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Container className={classes.main} component="main">
        {props.header && props.header}
        {props.cardList && props.cardList}
      </Container>
    </div>
  );
}
