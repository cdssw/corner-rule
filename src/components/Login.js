import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Link, Redirect } from "react-router-dom";
import { loginCall } from "../services/Authorization";

const useStyles = makeStyles((theme) => ({
  main: {
    backgroundColor: '#5475FF',
    height: '180px',
    padding: '0 30px',
    maxWidth: '100%',
  },
  signin: { 
    backgroundColor: 'white',
    position: 'relative',
    width: '100%',
    height: '310px',
    borderRadius: '10px',
    top: '120px',
    maxWidth: '400px',
  },
  logo: {
    position: 'absolute',
    top: '15px',
    left: '50%',
    transform: 'translate(-50%)',
    width: '130px',
  },
  signinTitle: {
    position: 'relative',
    top: '20px',
    textAlign: 'center',
    color: '#2D305775',
  },
  signinDiv: {
    position: 'relative',
    width: '100%',
    '& .MuiTextField-root': {
      margin: '10px auto',
    }
  },
  loginBtnDiv: {
    paddingTop: '30px',
    width: '100%',
  },
  signup: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    top: '145px',
    '& .MuiBox-root': {
      color: '#2D3057', 
    }
  },
  arrow: {
    color: 'white',
    position: 'relative',
    top: '15px',
    left: '-16px',
  }
}));

export default function Login() {
  const classes = useStyles();

  const [checkId, setCheckId] = useState(false);
  const [login, setLogin] = useState({
    username: null,
    password: null
  });

  const handleChecked = (event) => {
    setCheckId(event.target.checked);
  };

  const handleLogin = (event) => {
    setLogin({
      ...login,
      [event.target.name]: event.target.value
    });
  };

  const handleLoginButton = async event => {
    const response = await loginCall(login);
    console.log(response);
    alert(response.data.access_token);
    return <Redirect to={{ pathname: '/' }} />   
  }

  return (
    <Container className={classes.main} component="main">
      <Link to="/">
        <ArrowBackIcon className={classes.arrow} />
      </Link>
      <img className={classes.logo} src={process.env.PUBLIC_URL + "/images/login_logo.png"} />
      <Container component="div" className={classes.signin}>
        <Box className={classes.signinTitle} fontSize="h6.fontSize" fontWeight="fontWeightBold" m={1}>
          LOGIN
        </Box>
        <Container component="div" className={classes.signinDiv}>
          <TextField fullWidth={true} name="username" label="Email" onChange={handleLogin} />
          <TextField fullWidth={true} type="password" name="password" label="Password" onChange={handleLogin} />
          <FormControlLabel
            control={<Checkbox checked={checkId} onChange={handleChecked} />}
            label="아이디 저장"
          />
          <div className={classes.loginBtnDiv}>
            <Button fullWidth={true} variant="contained" color="primary" onClick={handleLoginButton}>로그인</Button>
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
    </Container>
  );
}
