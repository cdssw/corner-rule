import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Home from "./Home";
import Bottom from "./Bottom";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    height: '100%',
    backgroundColor: '#EBEFF7',
    paddingBottom: '70px',
  },
}));

export default function HomePage() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <div className={classes.root}>
        <Home />
      </div>
      <Bottom />
    </React.Fragment>
  );
}
