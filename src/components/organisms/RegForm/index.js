import React, { useReducer, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { FormControlLabel, Checkbox, TextField, Button } from '@material-ui/core';
import TimePicker from "react-times";
import 'react-times/css/classic/default.css';
import Utils from '../../Utils';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > div': {
      marginBottom: '20px',
    }
  },
  labelWrap: {
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
  error: {
    fontSize: '0.7rem',
    color: 'red',
    marginLeft: '15px',
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
  address1: {
    error: false,
    required: true,
  },
  address2: {
    error: false,
    required: true,
  },
  recruitment: {
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
  const { title, term, recruitment, cost, costOption, address, content } = props.state;
  const [dayVisible, setDayVisible] = useState('none');

  const validatation = e => {
    let value = {};
    value.error = false;
    value = {...valid['title'], error: valid['title'].required && title === '' ? true : false}
    dispatchValid({type: 'title', value: value});
    value = {...valid['startDt'], error: valid['startDt'].required && term.startDt === '' ? true : false}
    dispatchValid({type: 'startDt', value: value});
    value = {...valid['endDt'], error: valid['endDt'].required && term.endDt === '' ? true : false}
    dispatchValid({type: 'endDt', value: value});
    value = {...valid['recruitment'], error: valid['recruitment'].required && recruitment === 0 ? true : false}
    dispatchValid({type: 'recruitment', value: value});    
    value = {...valid['address1'], error: valid['address1'].required && address.address1 === '' ? true : false}
    dispatchValid({type: 'address1', value: value});
    value = {...valid['address2'], error: valid['address2'].required && address.address2 === '' ? true : false}
    dispatchValid({type: 'address2', value: value});
    value = {...valid['content'], error: valid['content'].required && content === '' ? true : false}
    dispatchValid({type: 'content', value: value});

    // detailDay check
    if(term.detailDay === 0) {
      value.error = true;
      setDayVisible('block');
    } else {
      setDayVisible('none');
    }

    return value.error;
  }

  const handleSave = e => {
    const rst = validatation(e);
    if(rst === false) props.onSaveClick();
  }

  const handleCheckBox = e => {
    if(e.target.checked)
      props.onInputChange({target:{ name: 'detailDay', value: term.detailDay + parseInt(e.target.id)}});
    else if(!e.target.checked)
      props.onInputChange({target:{ name: 'detailDay', value: term.detailDay - parseInt(e.target.id)}});
  }

  const handleCostCheckBox = e => {
    e.target.checked
     ? props.onInputChange({target:{ name: 'costOption', value: true}})
     : props.onInputChange({target:{ name: 'costOption', value: false}});
  }

  const handleStartTimeChange = options => {
    props.onInputChange({target:{ name: 'startTm', value: options.hour + ":" + options.minute}});
  }

  const handleEndTimeChange = options => {
    props.onInputChange({target:{ name: 'endTm', value: options.hour + ":" + options.minute}});
  }

  return (
    <div className={classes.root}>
      <TextField 
        name="title" placeholder="제목" variant="outlined" fullWidth={true}
        error={valid.title.error}
        helperText={valid.title.error && "필수값 입니다."}
        value={title}
        onChange={props.onInputChange}
      />
      <div className={classes.labelWrap}>
        <label className={classes.label}>시작일</label>
        <TextField 
          name="startDt" classes={{root: isSafari && classes.muiRoot}}
          placeholder="시작일" variant="outlined" type="date"
          error={valid.startDt.error}
          helperText={valid.startDt.error && "필수값 입니다."}
          value={term.startDt}
          onChange={props.onInputChange}
        />
        <label className={classes.label}>종료일</label>
        <TextField 
          name="endDt" classes={{root: isSafari && classes.muiRoot}}
          placeholder="종료일" variant="outlined" type="date"
          error={valid.endDt.error}
          helperText={valid.endDt.error && "필수값 입니다."}
          value={term.endDt}
          onChange={props.onInputChange}
        />        
      </div>
      <div className={classes.labelWrap}>
        <label className={classes.label}>시작시간</label>
        <TimePicker theme="classic" onTimeChange={handleStartTimeChange} time={term.startTm} />
        <label className={classes.label}>종료시간</label>
        <TimePicker theme="classic" onTimeChange={handleEndTimeChange} time={term.endTm} />
      </div>      
      {/* 요일체크 */}
      <label className={classes.error} style={{display: dayVisible}}>요일을 선택하세요</label>
      <div>
        <FormControlLabel
          className={classes.checkboxWrap}
          control={
            <Checkbox checked={Utils.detailDayChecker(term, 64)} className={classes.checkbox} size="small" id="64" onChange={handleCheckBox} />
          }
          label='일'
        />
        <FormControlLabel
          className={classes.checkboxWrap}
          control={
            <Checkbox checked={Utils.detailDayChecker(term, 32)} className={classes.checkbox} size="small" id="32" onChange={handleCheckBox} />
          }
          label='월'
        />
        <FormControlLabel
          className={classes.checkboxWrap}
          control={
            <Checkbox checked={Utils.detailDayChecker(term, 16)} className={classes.checkbox} size="small" id="16" onChange={handleCheckBox} />
          }
          label='화'
        />
        <FormControlLabel
          className={classes.checkboxWrap}
          control={
            <Checkbox checked={Utils.detailDayChecker(term, 8)} className={classes.checkbox} size="small" id="8" onChange={handleCheckBox} />
          }
          label='수'
        />
        <FormControlLabel
          className={classes.checkboxWrap}
          control={
            <Checkbox checked={Utils.detailDayChecker(term, 4)} className={classes.checkbox} size="small" id="4" onChange={handleCheckBox} />
          }
          label='목'
        />
        <FormControlLabel
          className={classes.checkboxWrap}
          control={
            <Checkbox checked={Utils.detailDayChecker(term, 2)} className={classes.checkbox} size="small" id="2" onChange={handleCheckBox} />
          }
          label='금'
        />
        <FormControlLabel
          className={classes.checkboxWrap}
          control={
            <Checkbox checked={Utils.detailDayChecker(term, 1)} className={classes.checkbox} size="small" id="1" onChange={handleCheckBox} />
          }
          label='토'
        />
      </div>
      <div className={classes.costWrap}>
        <TextField 
          name="cost" classes={{root: isSafari && classes.muiRoot}}
          placeholder="금액" variant="outlined" type="number"
          value={cost}
          onChange={props.onInputChange}
        />
        <FormControlLabel
          className={classes.checkboxWrap}
          control={
            <Checkbox checked={costOption} className={classes.checkbox} size="small" onChange={handleCostCheckBox} />
          }
          label='협의'
        />
      </div>
      <div className={classes.labelWrap}>
        <label className={classes.label}>모집인원</label>
        <TextField 
          name="recruitment" classes={{root: isSafari && classes.muiRoot}}
          placeholder="모집인원" variant="outlined" type="number"
          error={valid.recruitment.error}
          helperText={valid.recruitment.error && "최소 1명 이상입니다."}
          value={recruitment}
          onChange={props.onInputChange}
        />
      </div>
      <div className={classes.labelWrap}>
        <label className={classes.label}>주소</label>
        <TextField 
          name="address1" classes={{root: isSafari && classes.muiRoot}}
          placeholder="주소" variant="outlined" fullWidth={true}
          error={valid.address1.error}
          helperText={valid.address1.error && "필수값 입니다."}
          value={address.address1}
          onClick={props.onAddress}
        />
        <label className={classes.label}>상세주소</label>
        <TextField 
          name="address2" classes={{root: isSafari && classes.muiRoot}}
          placeholder="상세주소" variant="outlined" fullWidth={true}
          error={valid.address2.error}
          helperText={valid.address2.error && "필수값 입니다."}
          value={address.address2}
          onChange={props.onInputChange}
        />
      </div>
      <TextField 
        name="content" classes={{root: isSafari && classes.muiRoot}}
        placeholder="내용" variant="outlined" fullWidth={true} multiline rows={4}
        error={valid.content.error}
        helperText={valid.content.error && "필수값 입니다."}
        value={content}
        onChange={props.onInputChange}
      />      
      <div className={classes.button}>
        <Button color='primary' variant="outlined" fullWidth={true} onClick={handleSave}>저장</Button>
      </div>      
    </div>
  );
}
