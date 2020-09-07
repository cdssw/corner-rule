import React, { useReducer, useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { FormHelperText, FormControl } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    padding: "30px 30px",
  },
  inputWrap: {
    marginBottom: '10px',
    '& div': {
      display: 'flex',
    },
  },
  button: {
    marginTop: '20px',
  }
}));

const initialValid = {
  currentPassword: {
    error: false,
    required: false,
  },  
  password: {
    error: false,
    required: false,
  },
  passwordCheck: {
    error: null,
    required: false,
    valid: false,
  },
}

const reducer = (state, action) => {
  return { ...state, [action.type]: { error: action.value.error, required: action.value.required, valid: action.value.valid } }
}

export default function PasswordSetting(props) {
  const classes = useStyles();
  const { currentPassword, password, passwordCheck } = props.state;
  const [valid, dispatchValid] = useReducer(reducer, initialValid);
  const [ disabled, setDisabled ] = useState(true);

  const handleBlur = e => {
    let value = {};
    switch(e.target.name) {
      case 'currentPassword': {
        value.required = currentPassword === '' ? true : false;
        if(value.required === true) value.error = true;
        value.error = value.required === true ? true : false;
        break;
      }
      case 'password':
        value.required = password === '' ? true : false;
        if(value.required === true) value.error = true;
        value.valid = currentPassword === password ? true : false;
        if(value.valid === true) value.error = true;
        if(valid.passwordCheck.error !== null) {
          handleBlur({target: {name:'passwordCheck'}});
        }
        break;
      case 'passwordCheck':
        value.required = passwordCheck === '' ? true : false;
        if(value.required === true) {
          value.error = true;
          break;
        }
        value.valid = password === passwordCheck ? false : true;
        value.error = value.valid === true ? true : false;
        break;
    }
    dispatchValid({type: e.target.name, value: value});
  }

  useEffect(() => {
    // 비밀번호 변경 버튼 활성화 여부
    if(valid.currentPassword.error === false
      && valid.password.error === undefined
      && valid.passwordCheck.error === false) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [valid]);

  return (
    <> 
      <div className={classes.root}>
        <div className={classes.inputWrap}>
          <FormControl error={valid.currentPassword.error}>
            <OutlinedInput onBlur={handleBlur} type='password' name="currentPassword" placeholder="현재 비밀번호" value={currentPassword} onChange={props.onInputChange} />
            {valid.currentPassword.required && <FormHelperText>필수값 입니다.</FormHelperText>}
          </FormControl>
        </div>        
        <div className={classes.inputWrap}>
          <FormControl error={valid.password.error}>
            <OutlinedInput onBlur={handleBlur} type='password' name="password" placeholder="비밀번호" value={password} onChange={props.onInputChange} />
            {valid.password.required && <FormHelperText>필수값 입니다.</FormHelperText>}
            {valid.password.valid && <FormHelperText>새로운 비밀번호를 입력하세요.</FormHelperText>}
          </FormControl>
        </div>
        <div className={classes.inputWrap}>
          <FormControl error={valid.passwordCheck.error}>
            <OutlinedInput onBlur={handleBlur} type='password' name="passwordCheck" placeholder="비밀번호 확인" value={passwordCheck} onChange={props.onInputChange} />
            {valid.passwordCheck.required && <FormHelperText>필수값 입니다.</FormHelperText>}
            {valid.passwordCheck.valid && <FormHelperText>비밀번호가 일치하지 않습니다.</FormHelperText>}
          </FormControl>
        </div>
        <div className={classes.button}>
          <Button disabled={disabled} color='primary' variant="outlined" fullWidth={true} onClick={props.onPasswordClick}>비밀번호 변경</Button>
        </div>
      </div>
    </>
  );
}
