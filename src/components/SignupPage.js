import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Signup from "./Singup";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    height: '100%',
    backgroundColor: '#EBEFF7',
  },
}));

export default function SignupPage() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <div className={classes.root}>
        <Signup />
      </div>
    </React.Fragment>
  );
}
