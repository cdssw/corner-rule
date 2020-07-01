import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import SearchHeader from './SearchHeader';
import User from './User';
import Bottom from "./Bottom";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: "0 20px 0 10px",
    display: "flex",
    alignItems: "center",
    overflow: "hidden",
    backgroundColor: "white",
    maxWidth: "inherit",
    justifyContent: "center",
    alignItems: "center",
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
        <User />
        <Bottom />
    </React.Fragment>
  );
}
