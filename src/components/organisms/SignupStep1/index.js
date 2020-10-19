import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, TextField } from '@material-ui/core';

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
    padding: '15px 0',
    fontFamily: 'AppleSDGothicNeoM00',
  },
  label: {
    fontFamily: 'AppleSDGothicNeoR00',
    lineHeight: 1.47,
    color: '#707070',
    marginBottom: '4px',
  },
}));

export default function SignupStep1() {
  const classes = useStyles();

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
        name="title" placeholder="이메일을 입력합니다." variant="outlined" fullWidth={true}
      />
      <div style={{height: '10px'}}></div>
      <Button className={classes.btn} color='primary' variant="outlined" fullWidth={true}>
        중복확인
      </Button>
      <div style={{height: '20px'}}></div>
      <div className={classes.label}>비밀번호</div>
      <TextField
        type='password'
        name="title" placeholder="비밀번호를 입력합니다." variant="outlined" fullWidth={true}
      />
      <div style={{height: '5px'}}></div>
      <TextField 
        type='password'
        name="title" placeholder="비밀번호를 한번 더 입력합니다." variant="outlined" fullWidth={true}
      />
      <div style={{height: '45px'}}></div>
      <Button className={classes.btnNext} color='primary' variant="contained" fullWidth={true}>
        다음
      </Button>
    </div>
  );
}
