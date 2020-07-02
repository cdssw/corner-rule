import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Login from "./Login";
import LogoHeader from './LogoHeader';

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
    padding: "10px 10px 55px 10px",
    display: "flex",
    justifyContent: "center",
  },
}));

export default function LoginPage() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
        <Container className={classes.container}>
          <LogoHeader />
        </Container>
        <div className={classes.root}>
          <Login />
        </div>
    </React.Fragment>
  );
}
