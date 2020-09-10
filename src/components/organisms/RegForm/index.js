import React, { useReducer, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { FormControl, FormControlLabel, Checkbox, OutlinedInput } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > div': {
      marginBottom: '20px',
    }
  },
  datetimeWrap: {
    display: 'flex',
    justifyContent: 'space-between',
    '& div': {
      flexBasis: '49%',
    },
  },
  checkboxWrap: {
    margin: 0,
  },
  checkbox: {
    padding: '0 2px 0 11px',
  },
  costWrap: {
    display: 'flex',
    '& div': {
      flexBasis: '49%',
    },
  },
  label: {
    fontSize: '0.7rem',
  },
  muiRoot: {
    display: 'block',
  }
}));

export default function RegForm(props) {
  const classes = useStyles();
  const isSafari = navigator.vendor.includes('Apple');

  return (
    <div className={classes.root}>
      <FormControl fullWidth={true}>
        <OutlinedInput name="title" placeholder="제목" />
      </FormControl>
      <div className={classes.datetimeWrap}>
        <FormControl>
          <label className={classes.label}>시작일</label>
          <OutlinedInput classes={{root: isSafari && classes.muiRoot}} type="date" name="startDt" placeholder="시작일" />
        </FormControl>
        <FormControl>
          <label className={classes.label}>종료일</label>
          <OutlinedInput classes={{root: isSafari && classes.muiRoot}} type="date" name="endDt" placeholder="종료일" />
        </FormControl>
      </div>
      <div className={classes.datetimeWrap}>
        <FormControl>
          <label className={classes.label}>시작시간</label>
          <OutlinedInput classes={{root: isSafari && classes.muiRoot}} type="time" name="startTm" placeholder="시작시간" />
        </FormControl>
        <FormControl>
          <label className={classes.label}>종료시간</label>
          <OutlinedInput classes={{root: isSafari && classes.muiRoot}} type="time" name="endTm" placeholder="종료시간" />
        </FormControl>
      </div>      
      <div>
        <FormControlLabel
          className={classes.checkboxWrap}
          control={
            <Checkbox className={classes.checkbox} size="small" />
          }
          label='일'
        />
        <FormControlLabel
          className={classes.checkboxWrap}
          control={
            <Checkbox className={classes.checkbox} size="small" />
          }
          label='월'
        />
        <FormControlLabel
          className={classes.checkboxWrap}
          control={
            <Checkbox className={classes.checkbox} size="small" />
          }
          label='화'
        />
        <FormControlLabel
          className={classes.checkboxWrap}
          control={
            <Checkbox className={classes.checkbox} size="small" />
          }
          label='수'
        />
        <FormControlLabel
          className={classes.checkboxWrap}
          control={
            <Checkbox className={classes.checkbox} size="small" />
          }
          label='목'
        />
        <FormControlLabel
          className={classes.checkboxWrap}
          control={
            <Checkbox className={classes.checkbox} size="small" />
          }
          label='금'
        />
        <FormControlLabel
          className={classes.checkboxWrap}
          control={
            <Checkbox className={classes.checkbox} size="small" />
          }
          label='토'
        />
      </div>
      <div className={classes.costWrap}>
        <FormControl>
          <OutlinedInput classes={{root: isSafari && classes.muiRoot}} type="number" name="cost" placeholder="금액" />
        </FormControl>
        <FormControlLabel
          className={classes.checkboxWrap}
          control={
            <Checkbox className={classes.checkbox} size="small" />
          }
          label='협의'
        />
      </div>
      <FormControl fullWidth={true}>
        <OutlinedInput name="addr" placeholder="주소" />
      </FormControl>
      <FormControl fullWidth={true}>
        <OutlinedInput
          placeholder="상세내용"
          multiline
          rows={4}
        />
      </FormControl>      
    </div>
  );
}
