import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import SearchHeader from './SearchHeader';
import User from './User';

const useStyles = makeStyles((theme) => ({
  container: {
    padding: "0 20px 0 10px",
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
          <SearchHeader />
        </Container>
        <div className={classes.root}>
          <User />
        </div>
    </React.Fragment>
  );
}
