import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, FormControl, Select, MenuItem } from '@material-ui/core';

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
    color: '#707070',
  },
  desc: {
    fontFamily: 'AppleSDGothicNeoUL00',
    lineHeight: '1.47',
    color: '#707070',
    marginBottom: '30px',
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
  sidoWrap: {
    marginBottom: '10px',
  },
  sggWrap: {
    marginBottom: '20px',
  },  
}));

export default function PlaceSelect(props) {
  const classes = useStyles();

  const validatation = () => {
    const { sggValid } = props.state;
    return sggValid;
  }

  const renderBtn = () => {
    if (validatation()) {
      return (
        <Button className={classes.btnNext} color='primary' variant="contained" fullWidth={true}
          onClick={props.onSelect}
        >
          관심지역 등록
        </Button>
      )
    }
    return (
      <Button disabled className={classes.btnNext} color='primary' variant="contained" fullWidth={true}>
        관심지역 등록
      </Button>
    )
  }

  return (
    <div className={classes.root}>
      <div className={classes.title}>
        관심지역을 등록합니다.
      </div>
      <div style={{height: '14px'}}></div>
      <div className={classes.desc}>
        관심지역을 등록하여<br />
        필요한 정보를 더욱 손쉽게 이용할수 있습니다.
      </div>
      <div style={{height: '31px'}}></div>
      <div className={classes.label}>시도 선택</div>
      <div className={classes.sidoWrap}>
        <FormControl variant="outlined" size="small" fullWidth={true}>
          <Select
            name='sido'
            fullWidth={true}
            onChange={props.onSelectChange}
            value={props.state.sido}
          >
            {props.sidoList.map((v, i) => (
              <MenuItem key={i} value={v.sido}>{v.sido}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div className={classes.label}>시군구 선택</div>
      <div className={classes.sggWrap}>
        <FormControl variant="outlined" size="small" fullWidth={true}>
          <Select
            name='sgg'
            fullWidth={true}
            onChange={props.onSelectChange}
            value={props.state.sgg}
            displayEmpty
          >
            <MenuItem value="" disabled>
              시군구를 선택하세요.
            </MenuItem>
            {props.sggList.map((v, i) => (
              <MenuItem key={i} value={v.sgg}>{v.sgg}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div style={{height: '45px'}}></div>
      {renderBtn()}
    </div>
  );
}