import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    maxWidth: '600px',
    height: '100%',
    margin: '83px 10px',
  },
  intro: {
    height: '27px',
    fontFamily: 'AppleSDGothicNeoL00',
    fontSize: '22px',
    lineHeight: '1.32',
    color: '#707070',
  },
  space: {
    height: '14px',
  },
  desc: {
    fontFamily: 'AppleSDGothicNeoUL00',
    lineHeight: '1.47',
    color: '#707070',
    textAlign: 'center',
    marginBottom: '81px',
  },
  btnStart: {
    width: '90%',
    padding: '15px 0',
    fontFamily: 'AppleSDGothicNeoM00',
  }
}));

export default function SignupIntro(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.intro}>
        회원가입을 시작합니다!
      </div>
      <div className={classes.space}></div>
      <div className={classes.desc}>
        계정을 생성하여 모든 서비스를<br />
        무료로 이용할수 있습니다.
      </div>
      <Button
        className={classes.btnStart} color='primary' variant="contained" fullWidth={true}
        onClick={props.onStartClick}
      >
        회원가입 시작
      </Button>
    </div>
  );
}
