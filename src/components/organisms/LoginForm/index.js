import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Link } from "react-router-dom";
import { InputIcon } from "components";
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import VpnKeyOutlinedIcon from '@material-ui/icons/VpnKeyOutlined';
import RadioButtonUncheckedOutlinedIcon from '@material-ui/icons/RadioButtonUncheckedOutlined';
import RadioButtonCheckedRoundedIcon from '@material-ui/icons/RadioButtonCheckedRounded';
import { Typography } from '@material-ui/core';

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
}));

export default function LoginForm({username, password, onInput, onLogin, saveId, onSaveId}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.emailWrap}>
        <InputIcon icon={<AccountCircleOutlinedIcon color="disabled" />} name="username" onChange={onInput} value={username} />
      </div>
      <div className={classes.passwordWrap}>
        <InputIcon type="password" icon={<VpnKeyOutlinedIcon color="disabled" />} name="password" onChange={onInput} value={password} />
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
              style={{color: 'white', padding: 0}}
              size="small"
            />
          }
          label={<Typography component="span" variant="body1" style={{color: 'white', paddingLeft: '5px'}}>아이디 저장</Typography>}
        />
      </div>
      <div className={classes.buttonWrap}>
        <Button color='primary' variant="contained" fullWidth={true} onClick={onLogin}>LOGIN</Button>
      </div>
      <div className={classes.signup}>
        <div>아이디가 없으신가요?</div>
        <div className={classes.signup}><Link to="/signup"><div>회원가입</div></Link></div>
      </div>
    </div>
  );
}
