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
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: "10px 0",    
  },
  searchWrap: {
    width: '100%',
    marginBottom: '5px',
  },
  hint: {
    color: '#5a6482',
    fontSize: '12px',
  }
}));

export default function AddressSearch({onSearch, search, onKeyPress}) {
  const classes = useStyles();

  return (
    <> 
      <div className={classes.root}>
        <div className={classes.searchWrap}>
          <InputIcon icon={<SearchIcon />} name="search" onChange={onSearch} value={search} onKeyPress={onKeyPress} />
        </div>
        <div className={classes.hint}>예 : 도로명(반포대로 58), 건물명(독립기념관), 지번(삼성동 25)</div>
      </div>
    </>
  );
}
