import React from "react";
import { makeStyles, ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { InputIcon } from "components";
import FormControl from '@material-ui/core/FormControl';

const placeTheme = createMuiTheme({
  overrides: {
    MuiOutlinedInput: {
      root: {
        '& $notchedOutline': {
          borderColor: '#707070',
        },
        '&$focused $notchedOutline': {
          borderColor: '#707070',
          borderWidth: 1,
        },
      },
      inputMarginDense: {
        paddingTop: '9px',
        paddingBottom: '9px',
      },
    }
  }
});

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
}));

export default function PlaceSearch({place, onPlace, onSearch}) {
  const classes = useStyles();

  return (
    <ThemeProvider theme={placeTheme}>
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
      {/* hr */}
      <div style={{borderBottom: '1px solid #dfdfdf', marginBottom: '10px'}}></div>
    </ThemeProvider>
  );
}