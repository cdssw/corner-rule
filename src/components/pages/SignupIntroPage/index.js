import React from 'react';
import { PageTemplate, TitleHeader } from "components";
import { useHistory } from 'react-router-dom';
import { Button, makeStyles } from '@material-ui/core';

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
    padding: '10px 0',
    fontFamily: 'AppleSDGothicNeoM00',
    fontSize: '1rem',
  }
}));

export default function SignupIntroPage(props) {
  const history = useHistory();
  
  const handleStart = e => {
    history.push('/signup_policy');
  }

  return (
    <PageTemplate header={<TitleHeader {...props}>회원가입</TitleHeader>}>
      <SignupIntro onStartClick={handleStart} />
    </PageTemplate>
  );
}

function SignupIntro(props) {
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
