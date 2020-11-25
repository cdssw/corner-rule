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

export default function SignupStep2(props) {
  const classes = useStyles();

  const validatation = () => {
    const { userNickNmValid, userNmValid, phoneValid, userNickNmConfirm } = props.state;
    return userNickNmValid && userNmValid && phoneValid && userNickNmConfirm;
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
          [필수] 회원정보를 입력합니다.
        </div>
        <div className={classes.title}>2/3</div>
      </div>
      <div style={{height: '31px'}}></div>
      <div className={classes.label}>닉네임</div>
      <TextField 
        name="userNickNm" placeholder="닉네임을 입력하세요." variant="outlined" fullWidth={true}
        error={props.state.userNickNmValid !== null && !props.state.userNickNmValid}
        helperText={props.state.userNickNmValid !== null && !props.state.userNickNmValid && "최소 1글자 이상입니다."}
        value={props.state.userNickNm}
        onChange={props.onInputChange}
        disabled={props.state.userNickNmConfirm}        
        InputProps={{
          className: classes.placeHolder,
          endAdornment: (
            <InputAdornment position="end">
              {props.state.userNickNm !== '' && <ClearIcon color="action" onClick={() => props.onInputChange({target:{name: 'userNickNm', value: ''}})} />}
            </InputAdornment>
          ),
        }}
      />
      <div style={{height: '10px'}}></div>
      <Button className={classes.btn} variant="outlined" fullWidth={true}
        disabled={props.state.userNickNmConfirm}
        onClick={(e) => {
          if(props.state.userNickNm === "") return;
          if(props.state.userNickNmValid === null || !props.state.userNickNmValid) return;
          props.onConfirm();
        }}      
      >
        중복확인
      </Button>
      <div style={{height: '20px'}}></div>
      <div className={classes.label}>이름</div>
      <TextField
        name="userNm" placeholder="이름을 입력하세요." variant="outlined" fullWidth={true}
        error={props.state.userNmValid !== null && !props.state.userNmValid}
        helperText={props.state.userNmValid !== null && !props.state.userNmValid && "최소 1글자 이상입니다."}
        value={props.state.userNm}
        onChange={props.onInputChange}
        InputProps={{
          className: classes.placeHolder,
          endAdornment: (
            <InputAdornment position="end">
              {props.state.userNm !== '' && <ClearIcon color="action" onClick={() => props.onInputChange({target:{name: 'userNm', value: ''}})} />}
            </InputAdornment>
          ),
        }}
      />
      <div style={{height: '20px'}}></div>
      <div className={classes.label}>휴대폰 번호</div>
      <TextField
        name="phone" placeholder="휴대폰 번호를 입력하세요. (- 제외 입력)" variant="outlined" fullWidth={true}
        error={props.state.phoneValid !== null && !props.state.phoneValid}
        helperText={props.state.phoneValid !== null && !props.state.phoneValid && "최소 10자리 이상입니다."}
        value={props.state.phone}
        onChange={props.onInputChange}
        InputProps={{
          className: classes.placeHolder,
          endAdornment: (
            <InputAdornment position="end">
              {props.state.phone !== '' && <ClearIcon color="action" onClick={() => props.onInputChange({target:{name: 'phone', value: ''}})} />}
            </InputAdornment>
          ),
        }}
      />
      <div style={{height: '45px'}}></div>
      {renderNextBtn()}
    </div>
  );
}
