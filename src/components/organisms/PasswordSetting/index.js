import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Button, TextField, InputAdornment } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '600px',
    height: '100%',
    margin: '50px 10px',
  },
  titleWrap: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  title: {
    fontFamily: 'AppleSDGothicNeoL00',
    fontSize: '20px',
    color: '#707070',
  },
  btn: {
    fontFamily: 'AppleSDGothicNeoM00',
  },  
  btnNext: {
    fontFamily: 'AppleSDGothicNeoM00',
    fontSize: '1rem',
  },
  label: {
    fontFamily: 'AppleSDGothicNeoR00',
    lineHeight: 1.47,
    color: '#707070',
    marginBottom: '4px',
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

export default function PasswordSetting(props) {
  const classes = useStyles();

  const validatation = () => {
    const { currentPasswordValid, passwordValid, passwordCheckValid } = props.state;
    return currentPasswordValid && passwordValid && passwordCheckValid;
  }

  const renderBtn = () => {
    if (validatation()) {
      return (
        <Button className={classes.btnNext} color='primary' variant="contained" fullWidth={true}
          onClick={props.onPasswordClick}
        >
          수정완료
        </Button>
      )
    }
    return (
      <Button disabled className={classes.btnNext} color='primary' variant="contained" fullWidth={true}>
        수정완료
      </Button>
    )
  }

  return (
    <div className={classes.root}>
      <div className={classes.titleWrap}>
        <div className={classes.title}>
          비밀번호를 변경합니다.
        </div>
      </div>
      <div style={{height: '31px'}}></div>
      <div className={classes.label}>현재 비밀번호</div>
      <TextField 
        type='password'
        name="currentPassword" placeholder="현재 비밀번호를 입력하세요." variant="outlined" fullWidth={true}
        error={props.state.currentPasswordValid !== null && !props.state.currentPasswordValid}
        helperText={props.state.currentPasswordValid !== null && !props.state.currentPasswordValid && "최소 1글자 이상입니다."}
        value={props.state.currentPassword}
        onChange={props.onInputChange}
        InputProps={{
          className: classes.placeHolder,
          endAdornment: (
            <InputAdornment position="end">
              {props.state.currentPassword !== '' && <ClearIcon color="action" onClick={() => props.onInputChange({target:{name: 'currentPassword', value: ''}})} />}
            </InputAdornment>
          ),
        }}
      />
      <div style={{height: '20px'}}></div>
      <div className={classes.label}>새로운 비밀번호</div>
      <TextField
        type='password'
        name="password" placeholder="새로운 비밀번호를 입력하세요." variant="outlined" fullWidth={true}
        error={(props.state.passwordValid !== null && !props.state.passwordValid) || (props.state.password2Valid !== null && !props.state.password2Valid)}
        helperText={(props.state.passwordValid !== null && !props.state.passwordValid && "최소 1글자 이상입니다.") || (props.state.password2Valid !== null && !props.state.password2Valid && "현재 비밀번호와 동일합니다.")}
        value={props.state.password}
        onChange={props.onInputChange}
        InputProps={{
          className: classes.placeHolder,
          endAdornment: (
            <InputAdornment position="end">
              {props.state.password !== '' && <ClearIcon color="action" onClick={() => props.onInputChange({target:{name: 'password', value: ''}})} />}
            </InputAdornment>
          ),
        }}        
      />
      <div style={{height: '5px'}}></div>
      <TextField 
        type='password'
        name="passwordCheck" placeholder="새로운 비밀번호를 한번 더 입력하세요." variant="outlined" fullWidth={true}
        error={props.state.passwordCheckValid !== null && !props.state.passwordCheckValid}
        helperText={props.state.passwordCheckValid !== null && !props.state.passwordCheckValid && "비밀번호가 일치하지 않습니다."}
        value={props.state.passwordCheck}
        onChange={props.onInputChange}
        InputProps={{
          className: classes.placeHolder,
          endAdornment: (
            <InputAdornment position="end">
              {props.state.passwordCheck !== '' && <ClearIcon color="action" onClick={() => props.onInputChange({target:{name: 'passwordCheck', value: ''}})} />}
            </InputAdornment>
          ),
        }}                
      />
      <div style={{height: '45px'}}></div>
      {renderBtn()}
    </div>
  );
}
