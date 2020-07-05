import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SvgIcon from '@material-ui/core/SvgIcon';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  main: {
    backgroundColor: '#5475FF',
    height: '180px',
    padding: '0 30px',
  },
  signin: {
    backgroundColor: 'white',
    position: 'relative',
    width: '100%',
    height: '389px',
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
  bar: {
    paddingTop: '20px',
    borderBottom: '1px solid #70707050'
  },
  barInText: {
    position: "relative",
    textAlign: 'center',
    margin: '0 auto',
    top: '10px',
    backgroundColor: 'white',
    width: '30px',
    color: '#70707080',
    fontSize: '15px',
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
    top: '10px',
    left: '-16px',
  }
}));

function GoogleIcon(props) {
  return (
    <SvgIcon {...props}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="24px" height="24px"><path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/></svg>
    </SvgIcon>
  );
}

export default function Login() {
  const classes = useStyles();

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
          <form noValidate autoComplete="off">
            <TextField fullWidth={true} id="standard-basic" label="Email" />
            <TextField fullWidth={true} type="password" id="standard-basic" label="Password" p={1} />
            <div className={classes.loginBtnDiv}>
              <Button fullWidth={true} variant="contained" color="primary">로그인</Button>
            </div>
            <div className={classes.bar}>
              <Box className={classes.barInText} fontWeight="fontWeightBold" m={1}>OR</Box> 
            </div>
          </form>
          <div className={classes.loginBtnDiv}>
            <Button fullWidth={true} variant="outlined" color="default" startIcon={<GoogleIcon />}>GOOGLE</Button>
          </div>
        </Container>
      </Container>
      <div className={classes.signup}>
        <Box fontSize="caption.fontSize" m={1}>
          아이디가 없으신가요?
        </Box>
        <Box fontSize="caption.fontSize" m={1}>
          <a href='#'>회원가입</a>
        </Box>
      </div>
    </Container>
  );
}
