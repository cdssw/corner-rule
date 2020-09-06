import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import { Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    padding: "10px 0",
  },
  sidoWrap: {
    marginBottom: '10px',
  },
  sggWrap: {
    marginBottom: '20px',
  },
  place: {
    backgroundColor: 'white',
  },
}));

export default function PlaceSelect(props) {
  const classes = useStyles();

  return (
    <> 
      <div className={classes.root}>
        <div className={classes.sidoWrap}>
          <div>시도 선택</div>
          <FormControl variant="outlined" size="small" fullWidth={true}>
            <Select
              fullWidth={true}
              onChange={props.onSidoChange}
              value={props.sido}
            >
              {props.sidoList.map((v, i) => (
                <MenuItem key={i} value={v.sido}>{v.sido}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div>시군구 선택</div>
        <div className={classes.sggWrap}>
          <FormControl variant="outlined" size="small" fullWidth={true}>
            <Select
              fullWidth={true}
              onChange={props.onSggChange}
              value={props.sgg}
            >
              {props.sggList.map((v, i) => (
                <MenuItem key={i} value={v.sgg}>{v.sgg}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <Button classes={{label: classes.buttonTextColor}} color='primary' variant="outlined" onClick={props.onSelect}>선택</Button>
      </div>
    </>
  );
}
