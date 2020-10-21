import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Button, Chip, TextField, InputAdornment } from '@material-ui/core';
import Person from "@material-ui/icons/Person";
import AddIcon from '@material-ui/icons/Add';
import ClearIcon from '@material-ui/icons/Clear';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '600px',
    height: '100%',
    margin: '50px 10px',
  },
  titleWrap: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  title: {
    fontFamily: 'AppleSDGothicNeoL00',
    fontSize: '20px',
    color: '#707070',
  },
  btn: {
    fontFamily: 'AppleSDGothicNeoM00',
  },  
  btnNext: {
    padding: '10px 0',
    fontFamily: 'AppleSDGothicNeoM00',
    fontSize: '1rem',
  },
  label: {
    fontFamily: 'AppleSDGothicNeoR00',
    lineHeight: 1.47,
    color: '#707070',
    marginBottom: '4px',
  },
  profileWrap: {
    margin: '0 auto',
    width: '100px',
    height: '100px',
    position: 'relative',
  },
  profile: {
    position: 'absolute',
    left: '-12px',
    border: '2px solid #919394',
    borderRadius: '90px',
    width: '100%',
    height: '100%',
    backgroundColor: 'lightgray',
  },
  avatarRoot: {
    width: '96px',
    height: '96px',
    '& img': {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    },
  },
  fontSizeLarge: {
    fontSize: '3.5rem',
  },
  profileAdd: {
    position: 'absolute',
    width: '28px',
    height: '28px',
    border: '2px solid #95989a',
    borderRadius: '90px',
    backgroundColor: 'white',
    right: '15px',
    bottom: 0,
    color: '#707070',
  },
  area: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    border: 'solid 1px #b5b5b5',
    borderRadius: '5px',
    minHeight: '36px',
    padding: '5px',
    backgroundColor: 'rgba(90, 100, 130, 0.05)',
  },
  chipDeleteIcon: {
    color: 'rgba(255, 255, 255, 0.9)'
  },
  chipTalent: {
    height: '26px',
    margin: '2px 2px 2px 0',
  },
  chipInterest: {
    height: '26px',
    backgroundColor: '#8e9cc4',
    color: 'white',
    margin: '2px 4px 2px 0',
  },
}));

export default function SignupStep3(props) {
  const classes = useStyles();
  const [talent, setTalent] = useState('');
  const [interest, setInterest] = useState('');

  const handleChangeTalent = e => {
    setTalent(e.target.value);
  }

  const handleChangeInterest = e => {
    setInterest(e.target.value);
  }

  const handleKeyPressTalent = e => {
    if(e.key === 'Enter') {
      if(props.state.talent.length >= 5) return;
      if(props.state.talent.filter(chip => chip === talent).length > 0) return;
      props.onInputChange({target: {name: 'talent', value: talent}});
      setTalent('');
    }
  }

  const handleKeyPressInterest = e => {
    if(e.key === 'Enter') {
      if(props.state.interest.length >= 3) return;
      if(props.state.interest.filter(chip => chip === interest).length > 0) return;
      props.onInputChange({target: {name: 'interest', value: interest}});
      setInterest('');
    }
  }

  const renderTalent = () => {
    if(props.state.talent.length > 0) {
      return (
        <div className={classes.area}>
          {props.state.talent.map((m, i) => {
            return (
              <Chip key={i} classes={{root: classes.chipTalent}} color="secondary"
                label={m}
                onDelete={() => props.onChipDelete({name:'talent', value:m})}
              />
            );
          })}
        </div>
      )
    }
  }  

  const renderInterest = () => {
    if(props.state.interest.length > 0) {
      return (
        <div className={classes.area}>
          {props.state.interest.map((m, i) => {
            return (
              <Chip key={i} classes={{root: classes.chipInterest, deleteIcon: classes.chipDeleteIcon}}
                label={m}
                onDelete={() => props.onChipDelete({name:'interest', value:m})}
              />
            );
          })}
        </div>
      )
    }
  }   

  return (
    <div className={classes.root}>
      <div className={classes.titleWrap}>
        <div className={classes.title}>
          [선택] 프로필정보를 입력합니다.
        </div>
        <div className={classes.title}>3/3</div>
      </div>
      <div style={{height: '26px'}}></div>
      <label htmlFor="upload-avatar">
        <div className={classes.profileWrap}>
          <div className={classes.profile}>
            <Avatar classes={{root: classes.avatarRoot}}>
              {props.state.avatarPath
              ? <img src={process.env.REACT_APP_IMAGE + props.state.avatarPath} alt='' />
              : <Person classes={{fontSizeLarge: classes.fontSizeLarge}} fontSize='large' />
              }
            </Avatar>
          </div>
          <div className={classes.profileAdd}><AddIcon /></div>
          <input id="upload-avatar" type="file" onChange={props.onSetAvatar} style={{display: 'none'}} />
        </div>
      </label>
      <div style={{height: '20px'}}></div>
      <div className={classes.label}>전문분야</div>
      <TextField 
        name="mainTalent" placeholder="제일 잘할 수 있는 일을 입력하세요." variant="outlined" fullWidth={true}
        value={props.state.mainTalent}
        onChange={props.onInputChange}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              {props.state.mainTalent !== '' && <ClearIcon color="action" onClick={() => props.onInputChange({target:{name: 'mainTalent', value: ''}})} />}
            </InputAdornment>
          ),
        }}
      />
      <div style={{height: '20px'}}></div>
      <div className={classes.label}>특기 (최대 5개)</div>
      {renderTalent()}
      <div style={{height: '4px'}}></div>
      <TextField
        name="talent" placeholder="잘하는 특기 입력 후 엔터를 누르세요." variant="outlined" fullWidth={true}
        value={talent}
        onChange={handleChangeTalent}
        onKeyPress={handleKeyPressTalent}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              {talent !== '' && <ClearIcon color="action" onClick={() => setTalent('')} />}
            </InputAdornment>
          ),
        }}
      />
      <div style={{height: '20px'}}></div>
      <div className={classes.label}>관심사 (최대 3개)</div>
      {renderInterest()}
      <div style={{height: '4px'}}></div>
      <TextField
        name="interest" placeholder="관심사 입력 후 엔터를 누르세요." variant="outlined" fullWidth={true}
        value={interest}
        onChange={handleChangeInterest}
        onKeyPress={handleKeyPressInterest}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              {interest !== '' && <ClearIcon color="action" onClick={() => setInterest('')} />}
            </InputAdornment>
          ),
        }}
      />
      <div style={{height: '45px'}}></div>
      <Button
        className={classes.btnNext} color='primary' variant="contained" fullWidth={true}
        onClick={props.onSignup}
      >
        회원가입 완료
      </Button>
    </div>
  );
}