import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar } from '@material-ui/core';
import Person from "@material-ui/icons/Person";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  logo: {
    width: '110px',
  },
}));

export default function Header(props) {
  const classes = useStyles();

  return (
    <>
      <img className={classes.logo} src={process.env.PUBLIC_URL + "/images/logo_small.png"} />
      <div>
        <Link to='/login'>
          <Avatar><Person/></Avatar>
        </Link>
      </div>
    </>
  );
}
