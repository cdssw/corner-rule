import React from 'react';
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

export default function SignupStep1(props) {
  const classes = useStyles();

  const validatation = () => {
    const { usernameValid, usernameConfirm, passwordValid, passwordCheckValid } = props.state;
    return usernameValid && usernameConfirm && passwordValid && passwordCheckValid;
  }

  const renderNextBtn = () => {
    if (validatation()) {
      return (
        <Button className={classes.btnNext} color='primary' variant="contained" fullWidth={true}
          onClick={props.onNext}
        >
          다음
        </Button>
      )
    }
    return (
      <Button disabled className={classes.btnNext} color='primary' variant="contained" fullWidth={true}>
        다음
      </Button>
    )
  }

  return (
    <div className={classes.root}>
      <div className={classes.titleWrap}>
        <div className={classes.title}>
          [필수] 기본정보를 입력합니다.
        </div>
        <div className={classes.title}>1/3</div>
      </div>
      <div style={{height: '31px'}}></div>
      <div className={classes.label}>이메일 ID</div>
      <TextField 
        type='email'
        name="username" placeholder="이메일을 입력하세요." variant="outlined" fullWidth={true}
        error={props.state.usernameValid !== null && !props.state.usernameValid}
        helperText={props.state.usernameValid !== null && !props.state.usernameValid && "최소 1글자 이상입니다."}
        value={props.state.username}
        onChange={props.onInputChange}
        disabled={props.state.usernameConfirm}
        InputProps={{
          className: classes.placeHolder,
          endAdornment: (
            <InputAdornment position="end">
              {props.state.username !== '' && <ClearIcon color="action" onClick={() => props.onInputChange({target:{name: 'username', value: ''}})} />}
            </InputAdornment>
          ),
        }}         
      />
      <div style={{height: '10px'}}></div>
      <Button className={classes.btn} variant="outlined" fullWidth={true}
        disabled={props.state.usernameConfirm}
        onClick={(e) => {
          if(props.state.username === "") return;
          if(props.state.usernameValid === null || !props.state.usernameValid) return;
          props.onConfirm();
        }}
      >
        중복확인
      </Button>
      <div style={{height: '20px'}}></div>
      <div className={classes.label}>비밀번호</div>
      <TextField
        type='password'
        name="password" placeholder="비밀번호를 입력하세요." variant="outlined" fullWidth={true}
        error={props.state.passwordValid !== null && !props.state.passwordValid}
        helperText={props.state.passwordValid !== null && !props.state.passwordValid && "최소 1글자 이상입니다."}
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
        name="passwordCheck" placeholder="비밀번호를 한번 더 입력하세요." variant="outlined" fullWidth={true}
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
      {renderNextBtn()}
    </div>
  );
}
