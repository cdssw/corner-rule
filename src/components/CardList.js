import React from 'react';
import {  makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import MCard from "./MCard";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    marginBottom: "60px",
  },
}));

export default function CardList() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <Container className={classes.container}>
        <MCard image="/images/paella.jpg" />
        <MCard image="/images/back1.jpg" />
        <MCard image="/images/food1.jpg" />
      </Container>
    </React.Fragment>
  );
}