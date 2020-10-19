import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Button, TextField } from '@material-ui/core';
import Person from "@material-ui/icons/Person";
import AddIcon from '@material-ui/icons/Add';

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
    padding: '15px 0',
    fontFamily: 'AppleSDGothicNeoM00',
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
    border: 'solid 1px #b5b5b5',
    borderRadius: '5px',
    minHeight: '36px',
    backgroundColor: 'rgba(90, 100, 130, 0.05)',
  },
}));

export default function SignupStep3() {
  const classes = useStyles();

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
              <Person classes={{fontSizeLarge: classes.fontSizeLarge}} fontSize='large' />
              {/* {avatarPath
              ? <img src={process.env.REACT_APP_IMAGE + avatarPath} alt='' />
              : <Person classes={{fontSizeLarge: classes.fontSizeLarge}} fontSize='large' />
              } */}
            </Avatar>
          </div>
          <div className={classes.profileAdd}><AddIcon /></div>
          <input id="upload-avatar" type="file" style={{display: 'none'}} />
        </div>
      </label>
      <div style={{height: '20px'}}></div>
      <div className={classes.label}>전문분야</div>
      <TextField 
        name="title" placeholder="제일 잘할 수 있는 일을 입력합니다." variant="outlined" fullWidth={true}
      />
      <div style={{height: '20px'}}></div>
      <div className={classes.label}>특기 (최대 5개)</div>
      <div className={classes.area}></div>
      <div style={{height: '4px'}}></div>
      <TextField
        name="title" placeholder="잘하는 특기 입력 후 엔터를 누르세요." variant="outlined" fullWidth={true}
      />
      <div style={{height: '20px'}}></div>
      <div className={classes.label}>관심사 (최대 3개)</div>
      <div className={classes.area}></div>
      <div style={{height: '4px'}}></div>
      <TextField
        name="title" placeholder="관심사 입력 후 엔터를 누르세요." variant="outlined" fullWidth={true}
      />
      <div style={{height: '45px'}}></div>
      <Button className={classes.btnNext} color='primary' variant="contained" fullWidth={true}>
        회원가입 완료
      </Button>
    </div>
  );
}
