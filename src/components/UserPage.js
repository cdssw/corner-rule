import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import User from './User';
import LogoHeader from './LogoHeader';
import Bottom from "./Bottom";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: "0",
    display: "flex",
    overflow: "hidden",
    backgroundColor: "white",
    maxWidth: "inherit",
    justifyContent: "center",
  },
  root: {
    padding: "0 10px 55px 10px",
  },
}));

export default function UserPage() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <Container className={classes.container}>
        <LogoHeader />
      </Container>
      <div className={classes.root}>
        <User />
      </div>
      <Bottom />
    </React.Fragment>
  );
}
