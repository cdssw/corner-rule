import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import ClearIcon from '@material-ui/icons/Clear';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import { InputAdornment, TextField } from "@material-ui/core";
import * as resources from "constants/resources";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    padding: "0 0 5px",
  },
  placeWrap: {
    marginRight: '5px',
  },
  place: {
    backgroundColor: 'white',
  },
  searchWrap: {
    flexGrow: 1,
  },
  search: {
    width: '15px'
  },
  selectOutlined: {
    backgroundColor: theme.colorWhite,
  },
}));

export default function PlaceSearch({userInfo, place, onPlace, onSearch, search, onKeyPress, onSearchClick}) {
  const classes = useStyles();
  const { hopePlaceList } = userInfo;

  return (
    <div className={classes.root}>
      {hopePlaceList.length > 0 &&
        <div className={classes.placeWrap}>
          <FormControl variant="outlined" size="small" className={classes.place}>
            <Select
              value={place}
              onChange={onPlace}
              fullWidth={true}
              classes={{outlined: classes.selectOutlined}}
            >
              {hopePlaceList.map((v, i) => {
                return <MenuItem key={i} value={v.sido + ' ' + v.sgg}>{v.sido + ' ' + v.sgg}</MenuItem>
              })}
            </Select>
          </FormControl>
        </div>
      }
      <div className={classes.searchWrap}>
        <TextField
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                {search !== '' && <ClearIcon color="action" onClick={() => onSearch({target:{name: 'search', value: ''}})} />}
                <img className={classes.search} src={resources.search} alt="search" />
              </InputAdornment>
            ),
          }}
          fullWidth={true}
          variant="outlined"
          placeholder="검색어를 입력하세요."
          name="search"
          type="search"
          value={search}
          onChange={onSearch}
          onKeyPress={onKeyPress}
        />
      </div>
    </div>
  );
}
