import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import * as strings from "constants/strings";
import * as resources from "constants/resources";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    padding: "0 0 0 4px",
  },
  address: {
    fontFamily: "SegoeUI",
    fontSize: "10px",
    lineHeight: "14px",
    color: "#cbcbcb",
  },
  copyright: {
    fontFamily: "SegoeUI",
    fontSize: "10px",
    lineHeight: "14px",
    color: "#cbcbcb",
  },
}));

export default function Footer(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <img alt="logo-gray" src={resources.logoGray}/>
      <div className={classes.text}>
        <div className={classes.address}>
          {strings.address}
        </div>
        <div className={classes.copyright}>
          {strings.copyright1} <b>{strings.company}</b> {strings.copyright2}
        </div>
      </div>
    </div>
  );
}
