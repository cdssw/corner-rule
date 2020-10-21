import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Link } from "react-router-dom";
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import VpnKeyOutlinedIcon from '@material-ui/icons/VpnKeyOutlined';
import RadioButtonUncheckedOutlinedIcon from '@material-ui/icons/RadioButtonUncheckedOutlined';
import RadioButtonCheckedRoundedIcon from '@material-ui/icons/RadioButtonCheckedRounded';
import { InputAdornment, TextField } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    '& > div': {
      marginBottom: '10px',
    },
  },
  saveIdWrap: {
    alignSelf: 'flex-end',
  },
  signup: {
    display: 'flex',
    justifyContent: 'space-between',
    '& div': {
      color: 'white',
    },
    '& a': {
      textDecoration: 'none',
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

export default function LoginForm({username, password, onInput, onLogin, saveId, onSaveId}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.emailWrap}>
        <TextField
          type="email"
          classes={{root: classes.inputRoot}}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <AccountCircleOutlinedIcon color="disabled" />
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
                <VpnKeyOutlinedIcon color="disabled" />
              </InputAdornment>
            ),
          }}
          fullWidth={true}
          variant="outlined"
          placeholder="비밀번호를 입력하세요."
          name="password"
          onChange={onInput} value={password}
        />        
      </div>
      <div className={classes.saveIdWrap}>
        <FormControlLabel
          className={classes.checkboxWrap}
          control={
            <Checkbox 
              icon={<RadioButtonUncheckedOutlinedIcon />} 
              checkedIcon={<RadioButtonCheckedRoundedIcon />} 
              checked={saveId} 
              onChange={onSaveId}
              style={{color: 'white', padding: '0 0 2px 0'}}
              size="small"
            />
          }
          label={<span style={{color: 'white', paddingLeft: '5px'}}>아이디 저장</span>}
        />
      </div>
      <div>
        <Button color='primary' variant="contained" fullWidth={true} onClick={onLogin}>LOGIN</Button>
      </div>
      <div className={classes.signup}>
        <div>아이디가 없으신가요?</div>
        <div className={classes.signup}><Link to="/signup_intro"><div>회원가입</div></Link></div>
      </div>
    </div>
  );
}
