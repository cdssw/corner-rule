import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    height: '100%',
    backgroundColor: '#EBEFF7',
  },
}));

export default function LoginTemplate(props) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <div className={classes.root}>
        {props.children}
      </div>
    </React.Fragment>
  );
}
