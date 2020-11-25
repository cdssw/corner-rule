import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar } from '@material-ui/core';
import Utils from "../../Utils";
import * as resources from "constants/resources";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    maxWidth: '600px',
    marginBottom: '10px',
  },  
  userName: {
    color: '#212121',
    paddingRight: '5px',
  },
  avatarRoot: {
    width: '35px',
    height: '35px',
    marginRight: '6px',
    backgroundColor: theme.color.green,
    border: '2px solid ' + theme.color.border,
  },
  avatar: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  costNgWrap: {
    flexGrow: 1,
    display: 'flex',
  },
  space: {
    flexGrow: 1,
  },
  innerWrap: {
    display: 'flex',
    flexDirection: 'column',
  },
  costWrap: {
    padding: '0 10px',
    borderRadius: '15px',
    border: '1px solid ' + theme.color.green,
    height: '22px',
    display: 'flex',
    alignItems: 'center',
    '& .cost': {
      paddingTop: '2px',
      color: theme.color.green,
      fontSize: '14px',
    },
  },
  desc: {
    textAlign: 'right',
    color: '#707070',
  },
}));

export default function ContentHeader({meet, avatar}) {
  const classes = useStyles();
  const isSafari = navigator.vendor.includes('Apple');
  
  return (
    <div className={classes.root}>
    {meet && 
      <>
        <div>
          <Avatar classes={{root: classes.avatarRoot}}>
            {avatar
            ? <img className={classes.avatar} src={process.env.REACT_APP_IMAGE + avatar} alt='' />
            : <img src={resources.user} alt="user" />
            }
          </Avatar>
        </div>
        <div className={classes.userName}>{meet.user.userNickNm}</div>
        <div className={classes.costNgWrap}>
          <div className={classes.space}></div>
          <div className={classes.innerWrap}>
            <div style={{padding: isSafari && '0 10px 2px'}} className={classes.costWrap}>
              <div className="cost">{meet.cost === 0 ? 'Free' : `￦ ` + Utils.numberWithCommas(meet.cost)}</div>
            </div>
            {meet.costOption && <div className={classes.desc}>협의가능</div>}
          </div>
        </div>
      </>
    }
    </div>      
  );
}
