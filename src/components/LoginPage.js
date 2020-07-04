import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Login from "./Login";

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
    paddingBottom: '70px',
    maxWidth: '600px',
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
