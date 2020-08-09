import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import ChipInput from 'material-ui-chip-input';
import AddIcon from '@material-ui/icons/Add';
import Person from "@material-ui/icons/Person";
import { Avatar } from '@material-ui/core';
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inputWrap: {
    marginBottom: '10px',
    display: 'flex',
  },
  stepperRoot: {
    padding: '24px 10px',
  },
  stepContentRoot: {
    paddingRight: 0,
  },
  checkInput: {
    flexGrow: 1,
    marginRight: '5px',
  },
  profileWrap: {
    margin: '0 auto 20px auto',
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
      maxWidth: '100%',
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
  chip: {
    '& > div': {
      '& > div': {
        paddingTop: '0 !important',
        paddingLeft: '10px',
        '& > input': {
          height: '19px',
          margin: 0,
          paddingTop: 0,
          paddingBottom: 0,
        },
        '& > .MuiChip-root': {
          margin: '3px 5px 3px 0',
          backgroundColor: 'antiquewhite',
        },
      },
    },
  },
}));

function getSteps() {
  return ['기본정보', '회원정보', '부가정보'];
}

function getStepContent(step, props, classes) {
  const { username, password, passwordCheck, userNm, userNickNm, phone, mainTalent } = props.state.input;
  const { talent, interest } = props.state.array;
  const { emailConfirm, userNickNmConfirm } = props.state.boolean;
  const { avatarPath } = props.state.file;

  switch (step) {
    case 0:
      return (
        <>
          <div className={classes.inputWrap}>
            <OutlinedInput className={classes.checkInput} name="username" placeholder="이메일 ID" value={username} disabled={emailConfirm} onChange={props.onInputChange} />
            <Button variant='contained' color='primary' value='emailConfirm' disabled={emailConfirm}
              onClick={props.onBooleanConfirm}>확인</Button>
          </div>
          <div className={classes.inputWrap}>
            <OutlinedInput type='password' name="password" placeholder="비밀번호" value={password} onChange={props.onInputChange} />
          </div>
          <div className={classes.inputWrap}>
            <OutlinedInput type='password' name="passwordCheck" placeholder="비밀번호 확인" value={passwordCheck} onChange={props.onInputChange}  />
          </div>
        </>
      );
    case 1:
      return (
        <>
          <div className={classes.inputWrap}>
            <OutlinedInput name="userNm" placeholder="이름" value={userNm} onChange={props.onInputChange}  />
          </div>
          <div className={classes.inputWrap}>
            <OutlinedInput className={classes.checkInput} name="userNickNm" placeholder="닉네임" value={userNickNm} disabled={userNickNmConfirm} onChange={props.onInputChange}  />
            <Button variant='contained' color='primary' value='userNickNmConfirm' disabled={userNickNmConfirm}
              onClick={props.onBooleanConfirm}>확인</Button>
          </div>
          <div className={classes.inputWrap}>
            <OutlinedInput name="phone" placeholder="전화번호" value={phone} onChange={props.onInputChange}  />
          </div>
        </>
      );
    case 2:
      return (
        <>
          <label htmlFor="upload-avatar">
            <div className={classes.profileWrap}>
              <div className={classes.profile}>
                <Avatar classes={{root: classes.avatarRoot}}>
                  {avatarPath
                  ? <img src={process.env.REACT_APP_IMAGE + avatarPath} alt='' />
                  : <Person classes={{fontSizeLarge: classes.fontSizeLarge}} fontSize='large' />
                  }
                </Avatar>
              </div>
              <div className={classes.profileAdd}><AddIcon /></div>
              <input id="upload-avatar" type="file" onChange={props.onSetAvatar} style={{display: 'none'}} />
            </div>
          </label>
          <div className={classes.inputWrap}>
            <OutlinedInput name="mainTalent" placeholder="주특기" value={mainTalent} onChange={props.onInputChange}  />
          </div>
          <div className={classes.inputWrap}>
            <ChipInput className={classes.chip} placeholder="특기" variant="outlined" fullWidth={true}
              value={talent}
              onAdd={(value) => props.onArrayAdd({name: 'talent', value})}
              onDelete={(value, index) => props.onArrayDelete({name: 'talent', value, index})}
            />
          </div>        
          <div className={classes.inputWrap}>
            <ChipInput className={classes.chip} placeholder="관심사" variant="outlined" fullWidth={true}
              value={interest}
              onAdd={(value) => props.onArrayAdd({name: 'interest', value})}
              onDelete={(value, index) => props.onArrayDelete({name: 'interest', value, index})}
            />
          </div>
        </>
      );
    default:
      return 'Unknown step';
  }
}

export default function SignupForm(props) {
  const classes = useStyles();
  const steps = getSteps();

  return (
    <div className={classes.root}>
      <Stepper
        activeStep={props.activeStep}
        orientation="vertical"
        classes={{
          root: classes.stepperRoot,
        }}
      >
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
            <StepContent classes={{root: classes.stepContentRoot}}>
              <Typography component="span">{getStepContent(index, props, classes)}</Typography>
              <div className={classes.actionsContainer}>
                <div>
                  <Button
                    disabled={props.activeStep === 0}
                    onClick={props.handleBack}
                    className={classes.button}
                  >
                    이전
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={props.handleNext}
                    className={classes.button}
                  >
                    {props.activeStep === steps.length - 1 ? '완료' : '다음'}
                  </Button>
                </div>
              </div>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {props.activeStep === steps.length && (
        <Paper className={classes.resetContainer}>
          <Typography>회원가입이 완료되었습니다.</Typography>
          <Link to="/">
            <Button  variant='contained' color='primary'>HOME</Button>
          </Link>
        </Paper>
      )}
    </div>
  );
}
