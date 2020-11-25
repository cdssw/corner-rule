import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import ClearIcon from '@material-ui/icons/Clear';
import { InputAdornment, TextField } from "@material-ui/core";
import * as resources from "constants/resources";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: "10px 0",    
  },
  label: {
    fontFamily: 'AppleSDGothicNeoR00',
    lineHeight: 1.47,
    color: '#707070',
    marginBottom: '4px',
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
        <label className={classes.label}>주소검색</label>
        <TextField
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                {search !== '' && <ClearIcon color="action" onClick={() => onSearch({target:{name: 'search', value: ''}})} />}
                <img style={{width: '15px'}} src={resources.search} alt="search" />
              </InputAdornment>
            ),
          }}
          fullWidth={true}
          variant="outlined"
          placeholder="주소를 검색하세요."
          name="search"
          value={search}
          onChange={onSearch}
          onKeyPress={onKeyPress}
        />
        <div style={{height: '5px'}} />
        <div className={classes.hint}>예 : 도로명(반포대로 58), 건물명(독립기념관), 지번(삼성동 25)</div>
      </div>
    </>
  );
}
