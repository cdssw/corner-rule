import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Person from "@material-ui/icons/Person";
import { Avatar, Button } from '@material-ui/core';
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
    padding: '20px',
    border: '1px solid #dfdfdf',
    display: 'flex',
    flexDirection: 'column',
  },
  innerWrap: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '20px',
  },
  starWrap: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  }
}));

export default function ApplicatorEstimate(props) {
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
            <Person fontSize='large' />
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
          <div className={classes.innerWrap}>
            <div className={classes.starWrap}>
              <div>괜찮아요</div>
              <img src={resources.starLarge} />
            </div>
            <div style={{width: '10px'}}></div>
            <div className={classes.starWrap}>
              <div>좋아요</div>
              <img src={resources.starLarge} />
            </div>
            <div style={{width: '10px'}}></div>
            <div className={classes.starWrap}>
              <div>최고에요</div>
              <img src={resources.starLargeEmpty} />
            </div>
          </div>
          <Button variant="contained" color='primary' onClick={() => alert("평가")}>평점주기</Button>
        </div>
      </div>      
    </div>
  );
}
