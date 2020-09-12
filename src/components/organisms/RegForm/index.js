import React, { useReducer, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { FormHelperText, FormControl, FormControlLabel, Checkbox, OutlinedInput, TextField, Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > div': {
      marginBottom: '20px',
    }
  },
  datetimeWrap: {
    display: 'flex',
    flexDirection: 'column',
    '& label': {
      paddingTop: '5px',
    }
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
  },
  button: {
    marginTop: '20px',
  }
}));

const initialValid = {
  title: {
    error: false,
    required: true,
  },
  startDt: {
    error: false,
    required: true,
  },
  endDt: {
    error: false,
    required: true,
  },
  startTm: {
    error: false,
    required: true,
  },
  endTm: {
    error: false,
    required: true,
  },
  addr: {
    error: false,
    required: true,
  },
  content: {
    error: false,
    required: true,
  },
}

const reducer = (state, action) => {
  return { ...state, [action.type]: { error: action.value.error, required: action.value.required } }
}

export default function RegForm(props) {
  const classes = useStyles();
  const isSafari = navigator.vendor.includes('Apple');
  const [valid, dispatchValid] = useReducer(reducer, initialValid);
  const { title, startDt, endDt, startTm, endTm, addr, content } = props.state;
  const [ disabled, setDisabled ] = useState(true);

  const handleBlur = e => {
    let value = {};
    value.error = false;
    switch(e.target.name) {
      case 'title':
        value = {...valid[e.target.name], error: valid[e.target.name].required && title === '' ? true : false}
        break;
      case 'startDt':
        value = {...valid[e.target.name], error: valid[e.target.name].required && startDt === '' ? true : false}
        break;
      case 'endDt':
        value = {...valid[e.target.name], error: valid[e.target.name].required && endDt === '' ? true : false}
        break;
      case 'startTm':
        value = {...valid[e.target.name], error: valid[e.target.name].required && startTm === '' ? true : false}
        break;
      case 'endTm':
        value = {...valid[e.target.name], error: valid[e.target.name].required && endTm === '' ? true : false}
        break;
      case 'addr':
        value = {...valid[e.target.name], error: valid[e.target.name].required && addr === '' ? true : false}
        break;
      case 'content':
        value = {...valid[e.target.name], error: valid[e.target.name].required && content === '' ? true : false}
        break;
        
    }
    dispatchValid({type: e.target.name, value: value});
  }

  return (
    <div className={classes.root}>
      <TextField 
        name="title" placeholder="제목" variant="outlined" fullWidth={true}
        error={valid.title.error}
        onBlur={handleBlur}
        helperText={valid.title.error && "필수값 입니다."}
        onChange={props.onInputChange}
      />
      <div className={classes.datetimeWrap}>
        <label className={classes.label}>시작일</label>
        <TextField 
          classes={{root: isSafari && classes.muiRoot}}
          name="startDt" placeholder="시작일" variant="outlined" type="date"
          error={valid.startDt.error}
          onBlur={handleBlur}
          helperText={valid.startDt.error && "필수값 입니다."}
          onChange={props.onInputChange}
        />
        <label className={classes.label}>종료일</label>
        <TextField 
          classes={{root: isSafari && classes.muiRoot}}
          name="endDt" placeholder="시작일" variant="outlined" type="date"
          error={valid.endDt.error}
          onBlur={handleBlur}
          helperText={valid.endDt.error && "필수값 입니다."}
          onChange={props.onInputChange}
        />        
      </div>
      <div className={classes.datetimeWrap}>
        <label className={classes.label}>시작시간</label>
        <TextField 
          classes={{root: isSafari && classes.muiRoot}}
          name="startTm" placeholder="시작시간" variant="outlined" type="time"
          error={valid.startTm.error}
          onBlur={handleBlur}
          helperText={valid.startTm.error && "필수값 입니다."}
          onChange={props.onInputChange}
        />
        <label className={classes.label}>종료시간</label>
        <TextField 
          classes={{root: isSafari && classes.muiRoot}}
          name="endTm" placeholder="종료시간" variant="outlined" type="time"
          error={valid.endTm.error}
          onBlur={handleBlur}
          helperText={valid.endTm.error && "필수값 입니다."}
          onChange={props.onInputChange}
        />
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
        <TextField 
          classes={{root: isSafari && classes.muiRoot}}
          name="cost" placeholder="금액" variant="outlined" type="number"
          onBlur={handleBlur}
          onChange={props.onInputChange}
        />
        <FormControlLabel
          className={classes.checkboxWrap}
          control={
            <Checkbox className={classes.checkbox} size="small" />
          }
          label='협의'
        />
      </div>
      <TextField 
        classes={{root: isSafari && classes.muiRoot}}
        name="addr" placeholder="주소" variant="outlined" fullWidth={true}
        error={valid.addr.error}
        onBlur={handleBlur}
        helperText={valid.addr.error && "필수값 입니다."}
        onChange={props.onInputChange}
      />
      <TextField 
        classes={{root: isSafari && classes.muiRoot}}
        name="content" placeholder="내용" variant="outlined" fullWidth={true} multiline rows={4}
        error={valid.content.error}
        onBlur={handleBlur}
        helperText={valid.content.error && "필수값 입니다."}
        onChange={props.onInputChange}
      />      
      <div className={classes.button}>
        <Button disabled={disabled} color='primary' variant="outlined" fullWidth={true} onClick={props.onPasswordClick}>저장</Button>
      </div>      
    </div>
  );
}
