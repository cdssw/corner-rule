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
}));

export default function LoginForm(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Container component="div" className={classes.signin}>
        <Box className={classes.signinTitle} fontSize="h6.fontSize" fontWeight="fontWeightBold" m={1}>
          LOGIN
        </Box>
        <Container component="div" className={classes.signinDiv}>
          <TextField fullWidth={true} name="username" label="Email" onChange={props.onInput} />
          <TextField fullWidth={true} type="password" name="password" label="Password" onChange={props.onInput} />
          <FormControlLabel
            control={<Checkbox checked={props.saveId} onChange={props.onSaveId} />}
            label="아이디 저장"
          />
          <div className={classes.loginBtnDiv}>
            <Button fullWidth={true} variant="contained" color="primary" onClick={props.onLogin}>로그인</Button>
          </div>
        </Container>
      </Container>
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
