import React from 'react';
import { PageTemplate } from "components";
import { Redirect, useHistory } from 'react-router-dom';
import { Button, makeStyles } from '@material-ui/core';
import { useSelector } from 'react-redux';

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
    padding: '10px 0',
    fontFamily: 'AppleSDGothicNeoM00',
    fontSize: '1rem',
  }
}));

export default function SignupIntroPage(props) {
  const history = useHistory();
  const { agree } = useSelector(state => state.policy, []);
  
  const handleStart = e => {
    history.push('/login');
  }

  if(agree === false) return <Redirect to='/login' />

  return (
    <PageTemplate>
      <SignupFinish onStartClick={handleStart} />
    </PageTemplate>
  );
}

function SignupFinish(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.intro}>
        축하합니다.<br />
        회원가입이 완료되었습니다!
      </div>
      <div className={classes.space}></div>
      <div className={classes.desc}>
        이제 로그인하여 모든 서비스를<br />
        무료로 이용할수 있습니다.
      </div>
      <Button
        className={classes.btnStart} color='primary' variant="contained" fullWidth={true}
        onClick={props.onStartClick}
      >
        로그인 하러 가기
      </Button>
    </div>
  );
}
