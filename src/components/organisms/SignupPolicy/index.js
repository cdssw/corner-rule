import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Checkbox, FormControlLabel } from '@material-ui/core';
import Utils from '../../Utils';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '600px',
    height: '100%',
    margin: '50px 10px',
  },
  title: {
    fontFamily: 'AppleSDGothicNeoL00',
    fontSize: '20px',
    lineHeight: '1.3',
    color: '#707070',
  },
  desc: {
    fontFamily: 'AppleSDGothicNeoUL00',
    lineHeight: '1.47',
    color: '#707070',
    textAlign: 'center',
    marginBottom: '81px',
  },
  btnNext: {
    padding: '10px 0',
    fontFamily: 'AppleSDGothicNeoM00',
    fontSize: '1rem',
  },
  checkboxWrap: {
    margin: 0,
    fontWeight: 'bold',
  },
  checkbox: {
    marginLeft: '5px',
    padding: '0 10px 0 0',
  },  
  alllabel: {
    fontFamily: 'AppleSDGothicNeoB00',
    lineHeight: 1.47,
    color: '#707070',
  },
  alldesc: {
    margin: '10px 0 16px 40px',
    fontFamily: 'AppleSDGothicNeoT00',
    fontSize: '12px',
    lineHeight: 1.46,
    color: '#707070',
  },
  wrap: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '15px',
  },
  label: {
    fontFamily: 'AppleSDGothicNeoUL00',
    lineHeight: 1.47,
    color: '#707070',
  },
}));

export default function SignupPolicy(props) {
  const classes = useStyles();

  const handleCheckBox = e => {
    if(e.target.checked)
      props.onInputChange({target:{ name: e.target.name, value: true}});
    else if(!e.target.checked)
      props.onInputChange({target:{ name: e.target.name, value: false}});
  }
  
  const validatation = () => {
    const { serviceValid, privateValid } = props.state;
    return serviceValid && privateValid;
  }

  const renderAgreeBtn = () => {
    if (validatation()) {
      return (
        <Button className={classes.btnNext} color='primary' variant="contained" fullWidth={true}
          onClick={props.onAgreeClick}
        >
          동의
        </Button>
      )
    }
    return (
      <Button disabled className={classes.btnNext} color='primary' variant="contained" fullWidth={true}>
        동의
      </Button>
    )
  }

  return (
    <div className={classes.root}>
      <div className={classes.title}>
        서비스<br />
        이용약관에 동의해주세요.
      </div>
      <div style={{height: '21px'}}></div>
      <FormControlLabel
        className={classes.checkboxWrap}
        classes={{label: classes.alllabel}}
        id="all"
        control={
          <Checkbox name="all" checked={props.state.all} className={classes.checkbox} onChange={handleCheckBox} />
        }        
        label='모두 동의합니다.'
      />
      <div className={classes.alldesc}>
        전체동의는 필수 및 선택정보에 대한 동의도 포함되어 있으며,<br />
        개별적으로도 동의를 선택하실수 있습니다. 선택항목에 대한<br />
        동의를 거부하시는 경우에도 서비스는 이용이 가능합니다.<br />
      </div>
      <div style={{borderBottom: '1px solid #dfdfdf'}}></div><div style={{marginBottom: '20px'}}></div>
      <div className={classes.wrap}>
        <FormControlLabel
          className={classes.checkboxWrap}
          classes={{label: classes.label}}
          control={
            <Checkbox name="service" checked={props.state.service} className={classes.checkbox} onChange={handleCheckBox} />
          }
          label='[필수] 서비스 약관'
        />
        <img alt="right_arrow" src={process.env.PUBLIC_URL + "/images/right_arrow.svg"} />
      </div>
      <div className={classes.wrap}>
        <FormControlLabel
          className={classes.checkboxWrap}
          classes={{label: classes.label}}
          control={
            <Checkbox name="private" checked={props.state.private} className={classes.checkbox} onChange={handleCheckBox} />
          }
          label='[필수] 개인정보 수집 및 이용 동의'
        />
        <img alt="right_arrow" src={process.env.PUBLIC_URL + "/images/right_arrow.svg"} />
      </div>
      <div className={classes.wrap}>
        <FormControlLabel
          className={classes.checkboxWrap}
          classes={{label: classes.label}}
          control={
            <Checkbox name="profile" checked={props.state.profile} className={classes.checkbox} onChange={handleCheckBox} />
          }
          label='[선택] 프로필 정보 추가 수집 동의'
        />
        <img alt="right_arrow" src={process.env.PUBLIC_URL + "/images/right_arrow.svg"} />
      </div>
      <div style={{height: '45px'}}></div>
      {renderAgreeBtn()}
    </div>
  );
}
