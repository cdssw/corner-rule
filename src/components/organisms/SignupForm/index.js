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
  const { username, password, passwordCheck, userNm, userNickNm, phoneNo, mainTalent } = props.state.input;
  const { talent, interest } = props.state.array;
  const onEmailConfirm = e => {
    // api 호출
    // 결과에 따라
    props.onChange(true);
  };

  const onNickNmConfirm = e => {
    // api 호출
    // 결과에 따라
    props.onChange(true);
  };

  switch (step) {
    case 0:
      return (
        <>
          <div className={classes.inputWrap}>
            <OutlinedInput className={classes.checkInput} name="username" placeholder="이메일 ID" value={username} onChange={props.onChange} />
            <Button variant='contained' color='primary' onClick={onEmailConfirm}>확인</Button>
          </div>
          <div className={classes.inputWrap}>
            <OutlinedInput type='password' name="password" placeholder="비밀번호" value={password} onChange={props.onChange} />
          </div>
          <div className={classes.inputWrap}>
            <OutlinedInput type='password' name="passwordCheck" placeholder="비밀번호 확인" value={passwordCheck} onChange={props.onChange}  />
          </div>
        </>
      );
    case 1:
      return (
        <>
          <div className={classes.inputWrap}>
            <OutlinedInput name="userNm" placeholder="이름" value={userNm} onChange={props.onChange}  />
          </div>
          <div className={classes.inputWrap}>
            <OutlinedInput className={classes.checkInput} name="userNickNm" placeholder="닉네임" value={userNickNm} onChange={props.onChange}  />
            <Button variant='contained' color='primary' onChange={onNickNmConfirm}>확인</Button>
          </div>
          <div className={classes.inputWrap}>
            <OutlinedInput name="phoneNo" placeholder="전화번호" value={phoneNo} onChange={props.onChange}  />
          </div>
        </>
      );
    case 2:
      return (
        <>
          <div className={classes.profileWrap}>
            <div className={classes.profile}>
              <Avatar classes={{root: classes.avatarRoot}}>
                <Person classes={{fontSizeLarge: classes.fontSizeLarge}} fontSize='large' />
              </Avatar>
            </div>
            <div className={classes.profileAdd}><AddIcon /></div>
          </div>
          <div className={classes.inputWrap}>
            <OutlinedInput name="mainTalent" placeholder="주특기" value={mainTalent} onChange={props.onChange}  />
          </div>
          <div className={classes.inputWrap}>
            <ChipInput name="talent" className={classes.chip} placeholder="특기" variant="outlined" fullWidth={true} value={talent} onChange={props.onChange}  />
          </div>        
          <div className={classes.inputWrap}>
            <ChipInput name="interest" className={classes.chip} placeholder="관심사" variant="outlined" fullWidth={true} value={interest} onChange={props.onChange}  />
          </div>
        </>
      );
    default:
      return 'Unknown step';
  }
}

export default function SignupForm(props) {
  const classes = useStyles();

  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();
  const { emailConfirm, userNickNmConfirm } = props.state.boolean;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <div className={classes.root}>
      <Stepper
        activeStep={activeStep}
        orientation="vertical"
        classes={{
          root: classes.stepperRoot,
        }}
      >
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
            <StepContent classes={{root: classes.stepContentRoot}}>
              <Typography>{getStepContent(index, props, classes)}</Typography>
              <div className={classes.actionsContainer}>
                <div>
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className={classes.button}
                  >
                    이전
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? '완료' : '다음'}
                  </Button>
                </div>
              </div>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
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
