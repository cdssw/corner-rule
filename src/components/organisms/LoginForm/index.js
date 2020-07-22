import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    '& > div': {
      marginBottom: '10px',
    },
  },
  email: {
    width : '100%',
    background: 'url("https://img.icons8.com/material-outlined/24/000000/google-web-search.png") no-repeat calc(100% - 5px)',
    padding: '0 30px 0 10px',
    height: '30px',
    borderRadius: '5px',
    border: '1px solid #DDD',
    outline: 'none',
  },
  password: {
    width : '100%',
    background: 'url("https://img.icons8.com/material-outlined/24/000000/google-web-search.png") no-repeat calc(100% - 5px)',
    padding: '0 30px 0 10px',
    height: '30px',
    borderRadius: '5px',
    border: '1px solid #DDD',
    outline: 'none',
  },
  saveIdWrap: {
    alignSelf: 'flex-end',
  }
}));

export default function LoginForm(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.emailWrap}>
        <input className={classes.email} onChange={props.onInput} />
      </div>
      <div className={classes.passwordWrap}>
        <input className={classes.password} type='password' onChange={props.onInput} />
      </div>
      <div className={classes.saveIdWrap}>
        <FormControlLabel
          control={<Checkbox checked={props.saveId} onChange={props.onSaveId} />}
          label="아이디 저장"
        />
      </div>
      <div className={classes.buttonWrap}>
        <Button variant="contained" color="primary" onClick={props.onLogin}>로그인</Button>
      </div>
      <div className={classes.signup}>
        <Box fontSize="caption.fontSize" m={1}>
          아이디가 없으신가요?
        </Box>
        <Box fontSize="caption.fontSize" m={1}>
          <Link to="/signup">회원가입</Link>
        </Box>
      </div>
    </div>
  );
}
