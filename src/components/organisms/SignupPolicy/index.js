import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Checkbox, FormControlLabel, IconButton } from '@material-ui/core';
import * as resources from "constants/resources";
import { useHistory } from 'react-router-dom';

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
  },
  label: {
    fontFamily: 'AppleSDGothicNeoUL00',
    lineHeight: 1.47,
    color: '#707070',
  },
  btnRoot: {
    borderRadius: 0,
  }
}));

export default function SignupPolicy(props) {
  const history = useHistory();
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

  const handleTermClick = e => {
    history.push("/policy/term");
  }

  const handlePrivacyClick = e => {
    history.push("/policy/privacy");
  }

  const handleAppendixClick = e => {
    history.push("/policy/appendix");
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
          <Checkbox
            icon={<img src={resources.check} alt="check" />} 
            checkedIcon={<img src={resources.checkOn} alt="checkOn" />}
            name="all" checked={props.state.all} className={classes.checkbox} onChange={handleCheckBox}
          />
        }        
        label='모두 동의합니다.'
      />
      <div className={classes.alldesc}>
        전체동의는 필수 및 선택정보에 대한 동의도 포함되어 있으며, 개별적으로도 동의를 선택하실수 있습니다.<br />
        선택항목에 대한 동의를 거부하시는 경우에도<br />
        서비스 이용이 가능합니다.<br />
      </div>
      <div style={{borderBottom: '1px solid #dfdfdf'}}></div><div style={{marginBottom: '20px'}}></div>
      <div className={classes.wrap}>
        <FormControlLabel
          className={classes.checkboxWrap}
          classes={{label: classes.label}}
          control={
            <Checkbox
              icon={<img src={resources.check} alt="check" />} 
              checkedIcon={<img src={resources.checkOn} alt="checkOn" />}            
              name="service" checked={props.state.serviceYn} className={classes.checkbox} onChange={handleCheckBox}
            />
          }
          label='[필수] 서비스 약관'
        />
        <IconButton
          onClick={handleTermClick}
          classes={{root: classes.btnRoot}}
        >
          <img src={resources.arrowRight} alt="arrowRight" />
        </IconButton>
      </div>
      <div className={classes.wrap}>
        <FormControlLabel
          className={classes.checkboxWrap}
          classes={{label: classes.label}}
          control={
            <Checkbox
              icon={<img src={resources.check} alt="check" />} 
              checkedIcon={<img src={resources.checkOn} alt="checkOn" />}
              name="private" checked={props.state.privateYn} className={classes.checkbox} onChange={handleCheckBox}
            />
          }
          label='[필수] 개인정보 수집 및 이용 동의'
        />
        <IconButton
          onClick={handlePrivacyClick}
          classes={{root: classes.btnRoot}}
        >
          <img src={resources.arrowRight} alt="arrowRight" />
        </IconButton>
      </div>
      <div className={classes.wrap}>
        <FormControlLabel
          className={classes.checkboxWrap}
          classes={{label: classes.label}}
          control={
            <Checkbox
              icon={<img src={resources.check} alt="check" />} 
              checkedIcon={<img src={resources.checkOn} alt="checkOn" />}
              name="profile" checked={props.state.profileYn} className={classes.checkbox} onChange={handleCheckBox}
            />
          }
          label='[선택] 추가 정보 수집 동의'
        />
        <IconButton
          onClick={handleAppendixClick}
          classes={{root: classes.btnRoot}}
        >
          <img src={resources.arrowRight} alt="arrowRight" />
        </IconButton>
      </div>
      <div style={{height: '45px'}}></div>
      {renderAgreeBtn()}
    </div>
  );
}
