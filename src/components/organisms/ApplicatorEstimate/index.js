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
          <Avatar classes={{root: classes.avatarRoot, img: classes.avatarImg}}
            alt={props.applicator.userNickNm}
            src={props.applicator.avatarPath && process.env.REACT_APP_IMAGE + props.applicator.avatarPath}
          >
            <Person fontSize='large' />
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
          <div className={classes.innerWrap}>
            <div className={classes.starWrap} onClick={() => props.onStarClick(1)}>
              <div style={{fontWeight: props.star === 1 && "bold"}}>괜찮아요</div>
              <img src={resources.starLarge} />
            </div>
            <div style={{width: '10px'}}></div>
            <div className={classes.starWrap} onClick={() => props.onStarClick(2)}>
              <div style={{fontWeight: props.star === 2 && "bold"}}>좋아요</div>
              <img src={props.star < 2 ? resources.starLargeEmpty : resources.starLarge} />
            </div>
            <div style={{width: '10px'}}></div>
            <div className={classes.starWrap} onClick={() => props.onStarClick(3)}>
              <div style={{fontWeight: props.star === 3 && "bold"}}>최고에요</div>
              <img src={props.star < 3 ? resources.starLargeEmpty : resources.starLarge} />
            </div>
          </div>
          <Button variant="contained" color='primary' onClick={props.onEstimate}>평점주기</Button>
        </div>
      </div>      
    </div>
  );
}
