import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import ClearIcon from '@material-ui/icons/Clear';
import { InputAdornment, TextField } from '@material-ui/core';
import * as resources from "constants/resources";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    '& > div': {
      marginBottom: '10px',
    },
  },
  btn: {
    fontFamily: 'AppleSDGothicNeoB00',
    fontSize: '1rem',
  },
  saveIdWrap: {
    alignSelf: 'flex-end',
  },
  signup: {
    display: 'flex',
    justifyContent: 'space-between',
    '& div': {
      color: '#2d2d2d',
    },
    '& div:nth-child(2)': {
      textDecoration: 'underline',
    }
  },
  checkboxWrap: {
    marginRight: 0,
  },
  inputRoot: {
    backgroundColor: 'white',
    borderRadius: '5px',
  }
}));

export default function LoginForm({username, password, onInput, onLogin, saveId, onSaveId, onSignupIntro}) {
  const classes = useStyles();

  const handleKeyPress = e => {
    if(e.key === 'Enter') onLogin();
  }
  return (
    <div className={classes.root}>
      <div className={classes.emailWrap}>
        <TextField
          type="email"
          classes={{root: classes.inputRoot}}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <img src={resources.userGray} alt="userGray" />
              </InputAdornment>
            ),
          }}
          fullWidth={true}
          variant="outlined"
          placeholder="아이디를 입력하세요."
          name="username"
          onChange={onInput} value={username}
        />
      </div>
      <div className={classes.passwordWrap}>
        <TextField
          type="password"
          classes={{root: classes.inputRoot}}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                {password !== '' && <ClearIcon color="action" onClick={() => onInput({target:{name: 'password', value: ''}})} />}
                <img src={resources.eyeBlocked} alt="eyeBlocked" />
              </InputAdornment>
            ),
          }}
          fullWidth={true}
          variant="outlined"
          placeholder="비밀번호를 입력하세요."
          name="password"
          onChange={onInput} value={password}
          onKeyPress={handleKeyPress}
        />        
      </div>
      <div className={classes.saveIdWrap}>
        <FormControlLabel
          className={classes.checkboxWrap}
          control={
            <Checkbox 
              icon={<img src={resources.check} alt="check" />} 
              checkedIcon={<img src={resources.checkOn} alt="checkOn" />} 
              checked={saveId} 
              onChange={onSaveId}
              style={{color: 'white', padding: '0 0 2px 0'}}
              size="small"
            />
          }
          label={<span style={{color: '#2d2d2d', paddingLeft: '5px'}}>아이디 저장</span>}
        />
      </div>
      <div>
        <Button classes={{label: classes.btn}} color='primary' variant="contained" fullWidth={true} onClick={onLogin}>LOGIN</Button>
      </div>
      <div className={classes.signup}>
        <div>아이디가 없으신가요?</div>
        <div onClick={onSignupIntro}>회원가입</div>
      </div>
    </div>
  );
}
