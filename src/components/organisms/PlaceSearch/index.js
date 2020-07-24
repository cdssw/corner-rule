import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { InputIcon } from "components";
import FormControl from '@material-ui/core/FormControl';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    padding: "10px 0",
  },
  placeWrap: {
    width: '100px',
    marginRight: '5px',
  },
  place: {
    backgroundColor: 'white',
  },
  searchWrap: {
    flexGrow: 1,
  },
}));

export default function PlaceSearch({place, onPlace, onSearch}) {
  const classes = useStyles();

  return (
    <>
      <div className={classes.root}>
        <div className={classes.placeWrap}>
          <FormControl variant="outlined" size="small" className={classes.place}>
            <Select
              value={place}
              onChange={onPlace}
              fullWidth={true}
            >
              <MenuItem value={10}>역북동</MenuItem>
              <MenuItem value={20}>동부동</MenuItem>
              <MenuItem value={30}>김량장동</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className={classes.searchWrap}>
          <InputIcon icon={<SearchIcon />} onChange={onSearch} />
        </div>
      </div>
      <div style={{borderBottom: '1px solid #dfdfdf', marginBottom: '10px'}}></div>
    </>
  );
}