import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Person from "@material-ui/icons/Person";
import { Avatar } from '@material-ui/core';
import Utils from "../../Utils";
import * as resources from "constants/resources";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    maxWidth: '600px',
    padding: '0 10px',
    marginBottom: '15px',
  },
  wrap: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    marginBottom: '10px',
  },
  location: {
    display: 'flex',    
    alignItems: 'center',
    color: '#5a6482',
  },
  titleWrap: {
    marginTop: '14px',
    display: 'flex',
    justifyContent: 'space-between',
  },
  title: {
    fontWeight: 'bold',
  },
  regDate: {
    fontSize: '13px',
    color: '#919394',
  },
  space: {
    flexGrow: 1,
  },
  avatarRoot: {
    width: '72px',
    height: '72px',
    marginRight: '6px',
    border: '2px solid #919394',
  },
  avatarImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  userName: {
    fontSize: '1rem',
  },
  wrapRound: {
    width: '100%',
    borderRadius: '5px',
    padding: '10px',
    border: '1px solid #dfdfdf',
    display: 'flex',
  },
  wrapRoundNoflex: {
    width: '100%',
    borderRadius: '5px',
    padding: '10px',
    border: '1px solid #dfdfdf',
  },
  wrapInner: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chipRed: {
    borderRadius: '15px',
    padding: '3px 10px 2px 11px',
    border: '1px solid #ff2467',
    color: '#ff2467',
    margin: '0 5px 5px 0',
  },
  chipBlue: {
    borderRadius: '15px',
    padding: '3px 10px 2px 11px',
    border: '1px solid #8e9cc4',
    color: '#8e9cc4',
    margin: '0 5px 5px 0',
  },
}));

export default function ApplicatorInfo(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.wrap}>
        <div className={classes.space}>
          <div className={classes.titleWrap}>
            <div className={classes.title}>아이 등원 요청</div>
          </div>
          <div className={classes.titleBottom}>
            <div className={classes.regDate}>11월 17일 13:08</div>
          </div>
        </div>
      </div>
      <div style={{borderBottom: '1px solid #dfdfdf', width: '100%'}}></div><div style={{marginBottom: '10px'}}></div>
      <div className={classes.wrap}>
        <div>
          <Avatar classes={{root: classes.avatarRoot, img: classes.avatarImg}}>
            <Person fontSize="large" />
          </Avatar>
        </div>
        <div className={classes.userName}>닉네임</div>
        <div className={classes.space}></div>
        <div>
          <img src={resources.star} />
          <img src={resources.star} />
          <img src={resources.starEmpty} />
        </div>
      </div>
      <div className={classes.wrap}>
        <div className={classes.wrapRound}>
          <img src={resources.check} style={{paddingRight: '10px'}} />
          <div>모집 참여 건수</div>
          <div className={classes.space}></div>
          <div>7건</div>
        </div>
      </div>
      <div className={classes.wrap}>
        <div className={classes.wrapRound}>
          <img src={resources.check} style={{paddingRight: '10px'}} />
          <div>전문분야</div>
          <div className={classes.space}></div>
          <div style={{color: '#18448f'}}>프로그램 개발</div>
        </div>
      </div>
      <div className={classes.wrap}>
        <div className={classes.wrapRoundNoflex}>
          <div style={{display: 'flex', marginBottom: '5px'}}>
            <img src={resources.check} style={{paddingRight: '10px'}} />
            <div>특기</div>
          </div>
          <div style={{display: 'flex'}}>
            <div style={{width: '23px'}}></div>
            <div className={classes.wrapInner}>
              <div className={classes.chipRed}>디자인</div>
              <div className={classes.chipRed}>부동산</div>
              <div className={classes.chipRed}>프로그래밍</div>
              <div className={classes.chipRed}>유튜브</div>
              <div className={classes.chipRed}>포토샵</div>
            </div>
          </div>
        </div>
      </div>
      <div className={classes.wrap}>
        <div className={classes.wrapRoundNoflex}>
          <div style={{display: 'flex', marginBottom: '5px'}}>
            <img src={resources.check} style={{paddingRight: '10px'}} />
            <div>관심사</div>
          </div>
          <div style={{display: 'flex'}}>
            <div style={{width: '23px'}}></div>
            <div className={classes.wrapInner}>
              <div className={classes.chipBlue}>음악</div>
              <div className={classes.chipBlue}>영상</div>
              <div className={classes.chipBlue}>음식 만들기</div>
            </div>
          </div>
        </div>
      </div>      
    </div>
  );
}
