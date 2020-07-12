import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Link } from "react-router-dom";
import MaskedInput from "react-text-mask";
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import ChipInput from 'material-ui-chip-input';

const useStyles = makeStyles((theme) => ({
  main: {
    backgroundColor: '#5475FF',
    height: '50px',
    padding: '0 30px',
    maxWidth: '100%',
  },
  arrow: {
    color: 'white',
    position: 'relative',
    top: '15px',
    left: '-16px',
  }
}));

function TextMaskCustom(props) {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={(ref) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={['(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
      placeholderChar={'\u2000'}
      showMask
    />
  );
}

TextMaskCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
};

export default function Signup() {
  const classes = useStyles();

  const [telno, setTelno] = useState('');
  const handleTelno = (event) => {
    setTelno(event.target.value);
  };

  const [mainTalent, setMainTalent] = useState([]);
  const handleMainTalent = (value) => {
    setMainTalent(value);
  }

  const [talent, setTalent] = useState([]);
  const handleTalent = (value) => {
    setTalent(value);
  }

  const [interest, setInterest] = useState([]);
  const handleInterest = (value) => {
    setInterest(value);
  }

  return (
    <Container className={classes.main} component="main">
      <Link to="/">
        <ArrowBackIcon className={classes.arrow} />
      </Link>
      <Container component="div">
        <Box fontSize="h6.fontSize" fontWeight="fontWeightBold" m={1}>
          회원가입
        </Box>
        <Container component="div" className={classes.signinDiv}>
          <div>필수정보</div>
          <div>프로필 이미지 들어갈 자리</div>
          <form noValidate autoComplete="off">
            <TextField fullWidth={true} id="email" label="이메일" /><Button>중복확인</Button>
            <TextField fullWidth={true} type="password" id="password" label="비밀번호" p={1} />
            <TextField fullWidth={true} type="password" id="password-check" label="비밀번호 확인" p={1} />
            <TextField fullWidth={true} id="nick-name" label="닉네임" /><Button>중복확인</Button>
            <InputLabel htmlFor="formatted-text-mask-input">전화번호</InputLabel>
            <Input
              value={telno}
              onChange={handleTelno}
              name="textmask"
              id="telno"
              inputComponent={TextMaskCustom}
            />
            <div>부가정보</div>
            <ChipInput onChange={handleMainTalent} label="주특기" />
            <ChipInput onChange={handleTalent} label="특기" />
            <ChipInput onChange={handleInterest} label="관심사" />
            <div className={classes.loginBtnDiv}>
              <Button fullWidth={true} variant="contained" color="primary">회원가입</Button>
            </div>
          </form>
        </Container>
      </Container>
    </Container>
  );
}
