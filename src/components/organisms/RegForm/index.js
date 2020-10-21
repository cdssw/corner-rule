import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { FormControlLabel, Checkbox, TextField, Button, InputAdornment } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import TimePicker from "react-times";
import 'react-times/css/classic/default.css';
import Utils from '../../Utils';
import './styles.css';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > div': {
      marginBottom: '20px',
    },
    margin: '0 0 50px',
  },
  labelWrap: {
    display: 'flex',
    flexDirection: 'column',
  },
  days: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '5px 10px',
    border: '1px solid #C4C4C4',
    borderRadius: '5px',
  },
  checkboxWrap: {
    margin: 0,
  },
  checkbox: {
    padding: '0',
  },
  costWrap: {
    display: 'flex',
  },
  label: {
    fontFamily: 'AppleSDGothicNeoR00',
    lineHeight: 1.47,
    color: '#707070',
    marginBottom: '4px',
  },
  muiRoot: {
    display: 'block',
  },
  button: {
    padding: '10px 0',
    fontFamily: 'AppleSDGothicNeoM00',
    fontSize: '1rem',
  }
}));

export default function RegForm(props) {
  const classes = useStyles();
  const isSafari = navigator.vendor.includes('Apple');

  const renderSaveBtn = () => {
    if (validatation()) {
      return (
        <Button className={classes.button} color='primary' variant="contained" fullWidth={true}
          onClick={handleSave}
        >
          저장
        </Button>
      )
    }
    return (
      <Button className={classes.button} color='primary' variant="contained" fullWidth={true}
        disabled
      >
        저장
      </Button>
    )
  }

  const validatation = () => {
    const { titleValid, contentValid, term, recruitment, address } = props.state;
    return titleValid
     && contentValid 
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
      <label className={classes.label}>제목</label>
      <TextField 
        name="title" placeholder="제목을 입력하세요." variant="outlined" fullWidth={true}
        error={props.state.titleValid !== null && !props.state.titleValid}
        helperText={props.state.titleValid !== null && !props.state.titleValid && "최소 1글자 이상입니다."}
        value={props.state.title}
        onChange={props.onInputChange}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              {props.state.title !== '' && <ClearIcon color="action" onClick={() => props.onInputChange({target:{name: 'title', value: ''}})} />}
            </InputAdornment>
          ),
        }}
      />
      <div className={classes.labelWrap}>
        <div className={classes.label}>시작일</div>
        <TextField 
          name="startDt" classes={{root: isSafari && classes.muiRoot}}
          variant="outlined" type="date"
          value={props.state.term.startDt}
          onChange={props.onInputChange}
        />
        <div style={{height: '5px'}} />
        <label className={classes.label}>종료일</label>
        <TextField 
          name="endDt" classes={{root: isSafari && classes.muiRoot}}
          variant="outlined" type="date"
          value={props.state.term.endDt}
          onChange={props.onInputChange}
        />        
      </div>
      <div className={classes.labelWrap}>
        <label className={classes.label}>시작시간</label>
        <TimePicker theme="classic" onTimeChange={handleStartTimeChange} time={props.state.term.startTm} />
        <div style={{height: '5px'}} />
        <label className={classes.label}>종료시간</label>
        <TimePicker theme="classic" onTimeChange={handleEndTimeChange} time={props.state.term.endTm} />
      </div>      
      <label className={classes.label}>요일</label>
      <div className={classes.days}>
        <FormControlLabel
          className={classes.checkboxWrap}
          control={
            <Checkbox checked={Utils.detailDayChecker(props.state.term, 64)} className={classes.checkbox} size="small" id="64" onChange={handleCheckBox} />
          }
          label={<span>일</span>}
        />
        <FormControlLabel
          className={classes.checkboxWrap}
          control={
            <Checkbox checked={Utils.detailDayChecker(props.state.term, 32)} className={classes.checkbox} size="small" id="32" onChange={handleCheckBox} />
          }
          label={<span>월</span>}
        />
        <FormControlLabel
          className={classes.checkboxWrap}
          control={
            <Checkbox checked={Utils.detailDayChecker(props.state.term, 16)} className={classes.checkbox} size="small" id="16" onChange={handleCheckBox} />
          }
          label={<span>화</span>}
        />
        <FormControlLabel
          className={classes.checkboxWrap}
          control={
            <Checkbox checked={Utils.detailDayChecker(props.state.term, 8)} className={classes.checkbox} size="small" id="8" onChange={handleCheckBox} />
          }
          label={<span>수</span>}
        />
        <FormControlLabel
          className={classes.checkboxWrap}
          control={
            <Checkbox checked={Utils.detailDayChecker(props.state.term, 4)} className={classes.checkbox} size="small" id="4" onChange={handleCheckBox} />
          }
          label={<span>목</span>}
        />
        <FormControlLabel
          className={classes.checkboxWrap}
          control={
            <Checkbox checked={Utils.detailDayChecker(props.state.term, 2)} className={classes.checkbox} size="small" id="2" onChange={handleCheckBox} />
          }
          label={<span>금</span>}
        />
        <FormControlLabel
          className={classes.checkboxWrap}
          control={
            <Checkbox checked={Utils.detailDayChecker(props.state.term, 1)} className={classes.checkbox} size="small" id="1" onChange={handleCheckBox} />
          }
          label={<span>토</span>}
        />
      </div>
      <label className={classes.label}>비용</label>
      <div className={classes.costWrap}>
        <TextField 
          name="cost" classes={{root: isSafari && classes.muiRoot}}
          placeholder="비용을 입력하세요." variant="outlined"
          value={props.state.cost}
          onChange={props.onInputChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                {props.state.cost !== '' && <ClearIcon color="action" onClick={() => props.onInputChange({target:{name: 'cost', value: ''}})} />}
              </InputAdornment>
            ),
          }}
        />
        <div style={{width: '5px'}} />
        <FormControlLabel
          className={classes.checkboxWrap}
          control={
            <Checkbox checked={props.state.costOption} className={classes.checkbox} size="small" onChange={handleCostCheckBox} />
          }
          label={<span>협의가능</span>}
        />
      </div>
      <div className={classes.labelWrap}>
        <label className={classes.label}>모집인원</label>
        <TextField 
          name="recruitment" classes={{root: isSafari && classes.muiRoot}}
          placeholder="모집인원을 입력하세요." variant="outlined"
          error={props.state.recruitmentValid !== null && !props.state.recruitmentValid}
          helperText={props.state.recruitmentValid !== null && !props.state.recruitmentValid && "최소 1명 이상입니다."}
          value={props.state.recruitment}
          onChange={props.onInputChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                {props.state.recruitment !== '' && <ClearIcon color="action" onClick={() => props.onInputChange({target:{name: 'recruitment', value: ''}})} />}
              </InputAdornment>
            ),
          }}          
        />
      </div>
      <div className={classes.labelWrap}>
        <label className={classes.label}>주소</label>
        <TextField 
          name="address1" classes={{root: isSafari && classes.muiRoot}}
          placeholder="주소를 검색하세요." variant="outlined" fullWidth={true}
          value={props.state.address.address1}
          onClick={props.onAddress}
        />
        <div style={{height: '5px'}} />
        <label className={classes.label}>상세주소</label>
        <TextField 
          name="address2" classes={{root: isSafari && classes.muiRoot}}
          placeholder="상세주소를 입력하세요." variant="outlined" fullWidth={true}
          error={props.state.address.address2Valid !== null && !props.state.address.address2Valid}
          helperText={props.state.address.address2Valid !== null && !props.state.address.address2Valid && "필수값 입니다."}
          value={props.state.address.address2}
          onChange={props.onInputChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                {props.state.address.address2 !== '' && <ClearIcon color="action" onClick={() => props.onInputChange({target:{name: 'address2', value: ''}})} />}
              </InputAdornment>
            ),
          }}
        />
      </div>
      <label className={classes.label}>상세내용</label>
      <TextField 
        name="content" classes={{root: isSafari && classes.muiRoot}}
        placeholder="상세내용을 입력하세요." variant="outlined" fullWidth={true} multiline rows={6}
        error={props.state.contentValid !== null && !props.state.contentValid}
        helperText={props.state.contentValid !== null && !props.state.contentValid && "최소 1글자 이상입니다."}
        value={props.state.content}
        onChange={props.onInputChange}
      />      
      {renderSaveBtn()}       
    </div>
  );
}