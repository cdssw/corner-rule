import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
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
    backgroundColor: theme.color.green,
    border: '2px solid ' + theme.color.border,
  },
  avatar: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  avatarIcon: {
    width: '30px',
  },
  userName: {
    paddingLeft: '8px',
    fontSize: '1rem',
    fontFamily: 'AppleSDGothicNeoB00',
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
            <div className={classes.title}>{props.meet.title}</div>
          </div>
          <div className={classes.titleBottom}>
            <div className={classes.regDate}>{Utils.parseDate(props.meet.modifyDt, '월 ')}일</div>
          </div>
        </div>
      </div>
      <div style={{borderBottom: '1px solid #dfdfdf', width: '100%'}}></div><div style={{marginBottom: '10px'}}></div>
      <div className={classes.wrap}>
        <div>
          <Avatar classes={{root: classes.avatarRoot}}>
            {props.applicator.avatarPath
              ? <img className={classes.avatar} src={process.env.REACT_APP_IMAGE + props.applicator.avatarPath} alt='' />
              : <img className={classes.avatarIcon} src={resources.user} alt="user" />            
            }
          </Avatar>
        </div>
        <div className={classes.userName}>{props.applicator.userNickNm}</div>
        <div className={classes.space}></div>
        <div>
          {props.applicator.estimateAvg === null
            ? '평가없음'
            : [...Array(3)].map((_, i) => {
              return (i < props.applicator.estimateAvg) ? <img key={i} src={resources.star} /> : <img key={i} src={resources.starEmpty} />
            })
          }
        </div>
      </div>
      <div className={classes.wrap}>
        <div className={classes.wrapRound}>
          <img src={resources.flag} style={{paddingRight: '10px'}} />
          <div>모집 참여 건수</div>
          <div className={classes.space}></div>
          <div>{props.applicator.meetCnt}건</div>
        </div>
      </div>
      <div className={classes.wrap}>
        <div className={classes.wrapRound}>
          <img src={resources.flag} style={{paddingRight: '10px'}} />
          <div>전문분야</div>
          <div className={classes.space}></div>
          <div style={{color: '#18448f'}}>{props.applicator.mainTalent}</div>
        </div>
      </div>
      <div className={classes.wrap}>
        <div className={classes.wrapRoundNoflex}>
          <div style={{display: 'flex', marginBottom: '5px'}}>
            <img src={resources.flag} style={{paddingRight: '10px'}} />
            <div>특기</div>
          </div>
          <div style={{display: 'flex'}}>
            <div style={{width: '23px'}}></div>
            <div className={classes.wrapInner}>
              {props.applicator.talent.split(',').map((m, i) => {
                return <div key={i} className={classes.chipRed}>{m}</div>
              })}
            </div>
          </div>
        </div>
      </div>
      <div className={classes.wrap}>
        <div className={classes.wrapRoundNoflex}>
          <div style={{display: 'flex', marginBottom: '5px'}}>
            <img src={resources.flag} style={{paddingRight: '10px'}} />
            <div>관심사</div>
          </div>
          <div style={{display: 'flex'}}>
            <div style={{width: '23px'}}></div>
            <div className={classes.wrapInner}>
              {props.applicator.interest.split(',').map((m, i) => {
                return <div key={i} className={classes.chipBlue}>{m}</div>
              })}
            </div>
          </div>
        </div>
      </div> 
    </div>
  );
}
