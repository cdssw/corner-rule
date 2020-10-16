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
  muiRoot: {
    display: 'block',
  },
  button: {
    marginTop: '20px',
  }
}));

export default function RegForm(props) {
  const classes = useStyles();
  const isSafari = navigator.vendor.includes('Apple');
  const [dayVisible, setDayVisible] = useState('none');

  const renderSaveBtn = () => {
    if (validatation()) {
      return (
        <div className={classes.button}>
          <Button color='primary' variant="contained" fullWidth={true} onClick={handleSave}>저장</Button>
        </div>
      )
    }
    return (
      <div className={classes.button}>
        <Button color='primary' variant="contained" disabled fullWidth={true} onClick={handleSave}>저장</Button>
      </div>
    )
  }

  const validatation = () => {
    const { titleValid, contentValid, term, recruitment, address } = props.state;
    return titleValid
     && contentValid 
     && term.startDtValid 
     && term.endDtValid
     && recruitment
     && address.address2Valid
     && term.detailDayValid
     ;
  }
  
  const handleSave = e => {
    props.onSaveClick();
  }

  const handleCheckBox = e => {
    if(e.target.checked)
      props.onInputChange({target:{ name: 'detailDay', value: props.state.term.detailDay + parseInt(e.target.id)}});
    else if(!e.target.checked)
      props.onInputChange({target:{ name: 'detailDay', value: props.state.term.detailDay - parseInt(e.target.id)}});
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
        error={props.state.titleValid !== null && !props.state.titleValid}
        helperText={props.state.titleValid !== null && !props.state.titleValid && "최소 1글자 이상입니다."}
        value={props.state.title}
        onChange={props.onInputChange}
      />
      <div className={classes.labelWrap}>
        <label className={classes.label}>시작일</label>
        <TextField 
          name="startDt" classes={{root: isSafari && classes.muiRoot}}
          placeholder="시작일" variant="outlined" type="date"
          value={props.state.term.startDt}
          onChange={props.onInputChange}
        />
        <label className={classes.label}>종료일</label>
        <TextField 
          name="endDt" classes={{root: isSafari && classes.muiRoot}}
          placeholder="종료일" variant="outlined" type="date"
          value={props.state.term.endDt}
          onChange={props.onInputChange}
        />        
      </div>
      <div className={classes.labelWrap}>
        <label className={classes.label}>시작시간</label>
        <TimePicker theme="classic" onTimeChange={handleStartTimeChange} time={props.state.term.startTm} />
        <label className={classes.label}>종료시간</label>
        <TimePicker theme="classic" onTimeChange={handleEndTimeChange} time={props.state.term.endTm} />
      </div>      
      <div>
        <FormControlLabel
          className={classes.checkboxWrap}
          control={
            <Checkbox checked={Utils.detailDayChecker(props.state.term, 64)} className={classes.checkbox} size="small" id="64" onChange={handleCheckBox} />
          }
          label='일'
        />
        <FormControlLabel
          className={classes.checkboxWrap}
          control={
            <Checkbox checked={Utils.detailDayChecker(props.state.term, 32)} className={classes.checkbox} size="small" id="32" onChange={handleCheckBox} />
          }
          label='월'
        />
        <FormControlLabel
          className={classes.checkboxWrap}
          control={
            <Checkbox checked={Utils.detailDayChecker(props.state.term, 16)} className={classes.checkbox} size="small" id="16" onChange={handleCheckBox} />
          }
          label='화'
        />
        <FormControlLabel
          className={classes.checkboxWrap}
          control={
            <Checkbox checked={Utils.detailDayChecker(props.state.term, 8)} className={classes.checkbox} size="small" id="8" onChange={handleCheckBox} />
          }
          label='수'
        />
        <FormControlLabel
          className={classes.checkboxWrap}
          control={
            <Checkbox checked={Utils.detailDayChecker(props.state.term, 4)} className={classes.checkbox} size="small" id="4" onChange={handleCheckBox} />
          }
          label='목'
        />
        <FormControlLabel
          className={classes.checkboxWrap}
          control={
            <Checkbox checked={Utils.detailDayChecker(props.state.term, 2)} className={classes.checkbox} size="small" id="2" onChange={handleCheckBox} />
          }
          label='금'
        />
        <FormControlLabel
          className={classes.checkboxWrap}
          control={
            <Checkbox checked={Utils.detailDayChecker(props.state.term, 1)} className={classes.checkbox} size="small" id="1" onChange={handleCheckBox} />
          }
          label='토'
        />
      </div>
      <div className={classes.costWrap}>
        <TextField 
          name="cost" classes={{root: isSafari && classes.muiRoot}}
          placeholder="금액" variant="outlined" type="number"
          value={props.state.cost}
          onChange={props.onInputChange}
        />
        <FormControlLabel
          className={classes.checkboxWrap}
          control={
            <Checkbox checked={props.state.costOption} className={classes.checkbox} size="small" onChange={handleCostCheckBox} />
          }
          label='협의'
        />
      </div>
      <div className={classes.labelWrap}>
        <label className={classes.label}>모집인원</label>
        <TextField 
          name="recruitment" classes={{root: isSafari && classes.muiRoot}}
          placeholder="모집인원" variant="outlined" type="number"
          error={props.state.recruitmentValid !== null && !props.state.recruitmentValid}
          helperText={props.state.recruitmentValid !== null && !props.state.recruitmentValid && "최소 1명 이상입니다."}
          value={props.state.recruitment}
          onChange={props.onInputChange}
        />
      </div>
      <div className={classes.labelWrap}>
        <label className={classes.label}>주소</label>
        <TextField 
          name="address1" classes={{root: isSafari && classes.muiRoot}}
          placeholder="주소" variant="outlined" fullWidth={true}
          value={props.state.address.address1}
          onClick={props.onAddress}
        />
        <label className={classes.label}>상세주소</label>
        <TextField 
          name="address2" classes={{root: isSafari && classes.muiRoot}}
          placeholder="상세주소" variant="outlined" fullWidth={true}
          error={props.state.address.address2Valid !== null && !props.state.address.address2Valid}
          helperText={props.state.address.address2Valid !== null && !props.state.address.address2Valid && "필수값 입니다."}
          value={props.state.address.address2}
          onChange={props.onInputChange}
        />
      </div>
      <TextField 
        name="content" classes={{root: isSafari && classes.muiRoot}}
        placeholder="내용" variant="outlined" fullWidth={true} multiline rows={4}
        error={props.state.contentValid !== null && !props.state.contentValid}
        helperText={props.state.contentValid !== null && !props.state.contentValid && "최소 1글자 이상입니다."}
        value={props.state.content}
        onChange={props.onInputChange}
      />      
      {renderSaveBtn()} 
    </div>
  );
}