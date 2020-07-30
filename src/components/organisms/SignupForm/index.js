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
    padding: '10px',
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
  profileAdd: {
    position: 'absolute',
    width: '28px',
    height: '28px',
    border: '2px solid #95989a',
    borderRadius: '90px',
    backgroundColor: 'white',
    right: '15px',
    bottom: '-10px',
  },
  chip: {
    '& > div': {
      '& > div': {
        paddingTop: '0 !important',
        paddingLeft: '10px',
        '& > input': {
          margin: 0,
          paddingTop: 0,
          paddingBottom: 0,
        },
      },
    },
  },
}));

function getSteps() {
  return ['기본정보', '회원정보', '부가정보'];
}

function getStepContent(step, classes) {

  switch (step) {
    case 0:
      return (
        <>
          <div className={classes.inputWrap}>
            <OutlinedInput className={classes.checkInput} id="standard-basic" placeholder="이메일 ID" />
            <Button variant='contained' color='primary'>확인</Button>
          </div>
          <div className={classes.inputWrap}>
            <OutlinedInput type='password' id="standard-basic" placeholder="비밀번호" />
          </div>
          <div className={classes.inputWrap}>
            <OutlinedInput type='password' id="standard-basic" placeholder="비밀번호 확인" />
          </div>
        </>
      );
    case 1:
      return (
        <>
          <div className={classes.inputWrap}>
            <OutlinedInput id="standard-basic" placeholder="이름" />
          </div>
          <div className={classes.inputWrap}>
            <OutlinedInput className={classes.checkInput} id="standard-basic" placeholder="닉네임" />
            <Button variant='contained' color='primary'>확인</Button>
          </div>
          <div className={classes.inputWrap}>
            <OutlinedInput id="standard-basic" placeholder="전화번호" />
          </div>
        </>
      );
    case 2:
      return (
        <>
          <div className={classes.profileWrap}>
            <div className={classes.profile}></div>
            <div className={classes.profileAdd}><AddIcon /></div>
          </div>
          <div className={classes.inputWrap}>
            <OutlinedInput id="standard-basic" placeholder="주특기" />
          </div>
          <div className={classes.inputWrap}>
            <ChipInput className={classes.chip} placeholder="특기" variant="outlined" fullWidth={true} />
          </div>        
          <div className={classes.inputWrap}>
            <ChipInput className={classes.chip} placeholder="관심사" variant="outlined" fullWidth={true} />
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

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
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
              <Typography>{getStepContent(index, classes)}</Typography>
              <div className={classes.actionsContainer}>
                <div>
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className={classes.button}
                  >
                    뒤로
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
        <Paper square elevation={0} className={classes.resetContainer}>
          <Typography>회원가입이 완료되었습니다.</Typography>
          <Button onClick={handleReset} className={classes.button}>
            초기화
          </Button>
        </Paper>
      )}
    </div>
  );
}
