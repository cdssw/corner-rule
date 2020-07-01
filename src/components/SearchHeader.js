import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
  headerContainer: {
    display: "flex",
    flex: "100%",
    maxWidth: "600px",
    justifyContent: "center",
    alignItems: "center",
    padding: "10px",
  },
  logo: { // img 가운데 정렬
    flex: 0,
    width: "30px",
    marginRight: "10px",
  },
  searchArea: {
    border: "1px solid #ccc",
    flexGrow: 1,
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
    <Fragment>
      <div className={classes.headerContainer}>
        <img className={classes.logo} src={process.env.PUBLIC_URL + "/images/logo.png"}/>
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
      </div>
    </Fragment>
  );
}