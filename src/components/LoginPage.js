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
    display: "flex",
    justifyContent: "center",
    height: '100%',
    backgroundColor: '#EBEFF7',
  },
}));

export default function LoginPage() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <div className={classes.root}>
        <Login />
      </div>
    </React.Fragment>
  );
}
