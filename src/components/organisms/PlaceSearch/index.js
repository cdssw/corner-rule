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
    marginRight: '5px',
  },
  place: {
    backgroundColor: 'white',
  },
  searchWrap: {
    flexGrow: 1,
  },
  selectOutlined: {
    backgroundColor: theme.colorWhite,
  },
}));

export default function PlaceSearch({userInfo, place, onPlace, onSearch, search, onKeyPress}) {
  const classes = useStyles();
  const { hopePlaceList } = userInfo;

  return (
    <> 
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
          <InputIcon icon={<SearchIcon />} name="search" onChange={onSearch} value={search} onKeyPress={onKeyPress} />
        </div>
      </div>
    </>
  );
}
