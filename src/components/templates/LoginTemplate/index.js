import React, { Children } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LoginForm from "../../organisms/LoginForm";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    height: '100%',
    backgroundColor: '#EBEFF7',
  },
}));

export default function (props) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <div className={classes.root}>
        {props.loginForm && props.loginForm}
      </div>
    </React.Fragment>
  );
}
