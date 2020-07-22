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
    padding: '0 20px',
    '& div': {
      color: 'white',
    }
  },
  button: {
    backgroundColor: '#1b2c48',
    color: 'white',
  },
}));

export default function LoginForm({onInput, onLogin, saveId, onSaveId}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.emailWrap}>
        <InputIcon icon={<AccountCircleOutlinedIcon color="disabled" />} onChange={onInput} />
      </div>
      <div className={classes.passwordWrap}>
        <InputIcon type="password" icon={<VpnKeyOutlinedIcon color="disabled" />} onChange={onInput} />
      </div>
      <div className={classes.saveIdWrap}>
        <FormControlLabel
          control={<Checkbox 
            icon={<RadioButtonUncheckedOutlinedIcon />} 
            checkedIcon={<RadioButtonCheckedRoundedIcon />} 
            checked={saveId} 
            onChange={onSaveId}
            style={{color: 'white'}}
          />}
          label={<Typography variant="body2" style={{color: 'white'}}>아이디 저장</Typography>}
        />
      </div>
      <div className={classes.buttonWrap}>
        <Button className={classes.button} variant="contained" fullWidth={true} onClick={onLogin}>LOGIN</Button>
      </div>
      <div className={classes.signup}>
        <div>아이디가 없으신가요?</div>
        <div><Link to="/signup">회원가입</Link></div>
      </div>
    </div>
  );
}
