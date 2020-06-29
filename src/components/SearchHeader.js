import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
  logoArea: {
    display: "flex",
    padding: "10px 10px 10px",
    flex: '0 0 50px',
    justifyContent: "center",
    alignItems: "center",
  },
  searchArea: {
    border: "1px solid #ccc",
    flex: '75%',
    borderRadius: '5px',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: 40,
    transition: theme.transitions.create('width'),
    width: '100%',
  },
  searchIcon: {
    padding: theme.spacing(0, 1),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  search: {
    position: 'relative',
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
  },
}));

export default function SearchHeader() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <div className={classes.logoArea}>
        <img src={process.env.PUBLIC_URL + "/images/logo.png"} />
      </div>
      <div className={classes.searchArea}>
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder="Search…"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            fullWidth={true}
            inputProps={{ 'aria-label': 'search' }}
          />
        </div>
      </div>
    </React.Fragment>
  );
}