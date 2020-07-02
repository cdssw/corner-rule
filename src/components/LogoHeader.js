import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  headerContainer: {
    display: "flex",
    flex: "100%",
    maxWidth: "600px",
    alignItems: "center",
    padding: "10px",
    justifyContent: "center",
  },
  logo: {
    flex: 0,
  },
}));

export default function LogoHeader() {
  const classes = useStyles();

  return (
    <Fragment>
      <div className={classes.headerContainer}>
        <img className={classes.logo} src={process.env.PUBLIC_URL + "/images/logo.png"}/>
      </div>
    </Fragment>
  );
}
