import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Home from "./Home";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    height: '100%',
    backgroundColor: '#EBEFF7',
  },
}));

export default function HomePage() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <div className={classes.root}>
        <Home />
      </div>
    </React.Fragment>
  );
}
