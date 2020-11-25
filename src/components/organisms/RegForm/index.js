import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { FormControlLabel, Checkbox, TextField, Button, InputAdornment } from '@material-ui/core';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import ClearIcon from '@material-ui/icons/Clear';
import TimePicker from "react-times";
import 'react-times/css/classic/default.css';
import Utils from '../../Utils';
import './styles.css';
import * as resources from "constants/resources";

const useStyles = makeStyles((theme) => ({
  root: {
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
    padding: '0 3px 0 0',
  },
  checkboxTitle: {
    fontFamily: 'AppleSDGothicNeoL00',
    color: '#707070',
    marginBottom: '4px',
    fontSize: '0.875rem',
  },
  flexWrap: {
    display: 'flex',
  },
  planWrap: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  label: {
    fontFamily: 'AppleSDGothicNeoL00',
    lineHeight: 1.47,
    color: '#707070',
    marginBottom: '4px',
    fontSize: '12px',
  },
  labelTitle: {
    fontFamily: 'AppleSDGothicNeoL00',
    color: '#707070',
    marginBottom: '4px',
  },
  muiRoot: {
    display: 'block',
  },
  button: {
    fontFamily: 'AppleSDGothicNeoM00',
    fontSize: '1rem',
  },
  toggleGrouped: {
    width: '40px',
  },
  toggleRoot: {
    border: '1px solid ' + theme.color.border,
  },
  toggleSelected: {
    backgroundColor: theme.color.green + ' !important',
    color: theme.color.white + ' !important',
  },  
  placeHolder: {
    '& ::placeholder': {
      fontFamily: 'AppleSDGothicNeoT00'
    },
    '& ::-webkit-input-placeholder': {
      fontFamily: 'AppleSDGothicNeoT00'
    },
    '& ::-ms-input-placeholder': {
      fontFamily: 'AppleSDGothicNeoT00'
    }    
  },
}));

export default function RegForm(props) {
  const classes = useStyles();
  const isSafari = navigator.vendor.includes('Apple');
  const [days, setDays] = useState(() => [0]);

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
     && recruitment
     && address.address2Valid
     && term.detailDayValid
     ;
  }
  
  const handleSave = e => {
    props.onSaveClick();
  }

  const handleCheckBox = e => {
    props.onInputChange(e);
  }

  const handleDays = (e, n) => {
    setDays(n);
    const sum = n.reduce((acc, cur) => acc + cur);
    handleCheckBox({target: {name: 'detailDay', value: sum}});
  }

  const handleOptionCheckBox = e => {
    e.target.checked
     ? props.onInputChange({target:{ name: e.target.name, value: true}})
     : props.onInputChange({target:{ name: e.target.name, value: false}});
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
          className: classes.placeHolder,
          endAdornment: (
            <InputAdornment position="end">
              {props.state.title !== '' && <ClearIcon color="action" onClick={() => props.onInputChange({target:{name: 'title', value: ''}})} />}
            </InputAdornment>
          ),
        }}
      />
      <div style={{marginBottom: '40px'}}></div>
      <label className={classes.labelTitle}>기본정보</label>
      <div style={{borderBottom: '1px solid #dfdfdf'}} />
      <div style={{marginBottom: '20px'}}></div>
      <div className={classes.labelWrap}>
        <label className={classes.label}>주소</label>
        <TextField 
          name="address1" classes={{root: isSafari && classes.muiRoot}}
          placeholder="주소를 검색하세요." variant="outlined" fullWidth={true}
          value={props.state.address.address1}
          onClick={props.onAddress}
          InputProps={{
            className: classes.placeHolder,
          }}   
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
            className: classes.placeHolder,
            endAdornment: (
              <InputAdornment position="end">
                {props.state.address.address2 !== '' && <ClearIcon color="action" onClick={() => props.onInputChange({target:{name: 'address2', value: ''}})} />}
              </InputAdornment>
            ),
          }}
        />
      </div>
      <div style={{marginBottom: '15px'}}></div>
      <label className={classes.label}>비용</label>
      <div className={classes.flexWrap}>
        <TextField 
          name="cost" classes={{root: isSafari && classes.muiRoot}}
          placeholder="비용을 입력하세요." variant="outlined"
          value={props.state.cost}
          onChange={props.onInputChange}
          InputProps={{
            className: classes.placeHolder,
            endAdornment: (
              <InputAdornment position="end">
                {props.state.cost !== '' && <ClearIcon color="action" onClick={() => props.onInputChange({target:{name: 'cost', value: ''}})} />}
              </InputAdornment>
            ),
          }}
        />
        <div style={{width: '15px'}} />
        <FormControlLabel
          className={classes.checkboxWrap}
          control={
            <Checkbox
              icon={<img src={resources.check} alt="check" />} 
              checkedIcon={<img src={resources.checkOn} alt="checkOn" />}
              name="costOption"
              checked={props.state.costOption} className={classes.checkbox} size="small" onChange={handleOptionCheckBox} />
          }
          label={<span>협의</span>}
        />
      </div>
      <div style={{marginBottom: '15px'}}></div>
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
            className: classes.placeHolder,
            endAdornment: (
              <InputAdornment position="end">
                {props.state.recruitment !== '' && <ClearIcon color="action" onClick={() => props.onInputChange({target:{name: 'recruitment', value: ''}})} />}
              </InputAdornment>
            ),
          }}          
        />
      </div>
      <div style={{marginBottom: '40px'}}></div>
      <div className={classes.planWrap}>
        <label className={classes.labelTitle}>시간 및 요일</label>
        <FormControlLabel
          className={classes.checkboxWrap}
          control={
            <Checkbox
              icon={<img src={resources.check} alt="check" />} 
              checkedIcon={<img src={resources.checkOn} alt="checkOn" />}
              name="tmOption"
              checked={props.state.term.tmOption} className={classes.checkbox} size="small" onChange={handleOptionCheckBox} />
          }
          label={<span>협의</span>}
        />
      </div>
      <div style={{borderBottom: '1px solid #dfdfdf'}} />
      <div style={{marginBottom: '20px'}}></div>
      <div className={classes.labelWrap}>
        <label className={classes.label}>시작시간</label>
        <TimePicker withoutIcon={true} theme="classic" onTimeChange={handleStartTimeChange} time={props.state.term.startTm} />
        <div style={{height: '5px'}} />
        <label className={classes.label}>종료시간</label>
        <TimePicker withoutIcon={true} theme="classic" onTimeChange={handleEndTimeChange} time={props.state.term.endTm} />
      </div>      
      <div style={{height: '15px'}} />
      <label className={classes.label}>요일</label>
      <div>
        <ToggleButtonGroup classes={{grouped: classes.toggleGrouped}} value={days} onChange={handleDays}>
          <ToggleButton classes={{root: classes.toggleRoot, selected: classes.toggleSelected}} selected={Utils.detailDayChecker(props.state.term, 64)} value={64}>일</ToggleButton>
          <ToggleButton classes={{root: classes.toggleRoot, selected: classes.toggleSelected}} selected={Utils.detailDayChecker(props.state.term, 32)} value={32}>월</ToggleButton>
          <ToggleButton classes={{root: classes.toggleRoot, selected: classes.toggleSelected}} selected={Utils.detailDayChecker(props.state.term, 16)} value={16}>화</ToggleButton>
          <ToggleButton classes={{root: classes.toggleRoot, selected: classes.toggleSelected}} selected={Utils.detailDayChecker(props.state.term, 8)} value={8}>수</ToggleButton>
          <ToggleButton classes={{root: classes.toggleRoot, selected: classes.toggleSelected}} selected={Utils.detailDayChecker(props.state.term, 4)} value={4}>목</ToggleButton>
          <ToggleButton classes={{root: classes.toggleRoot, selected: classes.toggleSelected}} selected={Utils.detailDayChecker(props.state.term, 2)} value={2}>금</ToggleButton>
          <ToggleButton classes={{root: classes.toggleRoot, selected: classes.toggleSelected}} selected={Utils.detailDayChecker(props.state.term, 1)} value={1}>토</ToggleButton>          
        </ToggleButtonGroup>
      </div>
      <div style={{marginBottom: '40px'}}></div>
      <div className={classes.planWrap}>
        <FormControlLabel
          className={classes.checkboxWrap}
          control={
            <Checkbox
              icon={<img src={resources.check} alt="check" />} 
              checkedIcon={<img src={resources.checkOn} alt="checkOn" />}
              name="dtOption"
              checked={props.state.term.dtOption} className={classes.checkbox} size="small" onChange={handleOptionCheckBox} />
          }
          label={<span className={classes.checkboxTitle}>일정설정</span>}
        />
      </div>      
      <div style={{borderBottom: '1px solid #dfdfdf'}} />
      {props.state.term.dtOption &&
        <>
          <div style={{marginBottom: '20px'}}></div>
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
        </>
      }
      <div style={{height: '30px'}} />
      <label className={classes.label}>상세내용</label>
      <TextField 
        name="content" classes={{root: isSafari && classes.muiRoot}}
        placeholder="상세내용을 입력하세요." variant="outlined" fullWidth={true} multiline rows={6}
        error={props.state.contentValid !== null && !props.state.contentValid}
        helperText={props.state.contentValid !== null && !props.state.contentValid && "최소 1글자 이상입니다."}
        value={props.state.content}
        onChange={props.onInputChange}
        InputProps={{
          className: classes.placeHolder,
        }}
      />  
      <div style={{height: '30px'}} />    
      {renderSaveBtn()}       
    </div>
  );
}