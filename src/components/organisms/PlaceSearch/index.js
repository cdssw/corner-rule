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

export default function PlaceSearch({place, onPlace, onSearch, search}) {
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
              classes={{outlined: classes.selectOutlined}}
            >
              <MenuItem value={10}>용인시 처인구</MenuItem>
              <MenuItem value={20}>서울시 강남구</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className={classes.searchWrap}>
          <InputIcon icon={<SearchIcon />} name="search" onChange={onSearch} value={search} />
        </div>
      </div>
    </>
  );
}
