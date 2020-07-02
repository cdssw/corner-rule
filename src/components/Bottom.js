import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import FavoriteIcon from '@material-ui/icons/Favorite';
import HomeIcon from "@material-ui/icons/Home";
import PersonIcon from "@material-ui/icons/Person";
import { Link, useLocation } from "react-router-dom";

const useStyles = makeStyles({
  bottom: {
    position: "fixed",
    bottom: 0,
    width: '100%',
  }
});

export default function Bottom() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  React.useEffect(() => {
    window.location.pathname === '/user' ? setValue(2) : setValue(0);
  }, []);

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      className={classes.bottom}
    >
      <BottomNavigationAction label="Home" icon={<HomeIcon />} component={Link} to="/" />
      <BottomNavigationAction label="Favorite" icon={<FavoriteIcon />} component={Link} to="/" />
      <BottomNavigationAction label="User" icon={<PersonIcon />} component={Link} to="/user" />
    </BottomNavigation>
  );
}
