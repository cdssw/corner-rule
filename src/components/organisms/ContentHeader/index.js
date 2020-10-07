import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar } from '@material-ui/core';
import Person from "@material-ui/icons/Person";
import Utils from "../../Utils";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    maxWidth: '600px',
    padding: '15px 10px 0 0',
    marginBottom: '15px',
  },  
  userName: {
    color: '#212121',
    paddingRight: '5px',
  },
  avatarRoot: {
    width: '35px',
    height: '35px',
    marginRight: '6px',
    border: '2px solid #919394',
  },
  avatarImg: {
    width: '100%',
    height: 'auto',
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
    borderRadius: '12px',
    backgroundColor: '#FFC7E3',
    height: '21px',
    display: 'flex',
    alignItems: 'center',
    '& .cost': {
      paddingTop: '2px',
      color: '#FF3096',
      fontWeight: 'bold',
      fontSize: '15px',
      margin: '0 auto',
    },
  },
  desc: {
    textAlign: 'right',
    color: '#707070',
  },
}));

export default function ContentHeader({userInfo, meet, avatar}) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
    {meet && 
      <>
        <div>
          <Avatar
            classes={{root: classes.avatarRoot, img: classes.avatarImg}}
            alt={meet.user.userNickNm}
            src={avatar !== "" ? process.env.REACT_APP_IMAGE + avatar : ""}
          >
            {avatar === "" && <Person />}
          </Avatar>
        </div>
        <div className={classes.userName}>{meet.user.userNickNm}</div>
        <div className={classes.costNgWrap}>
          <div className={classes.space}></div>
          <div className={classes.innerWrap}>
            <div className={classes.costWrap}>
              <div className="cost">{meet.cost === 0 ? 'Free' : `￦` + Utils.numberWithCommas(meet.cost)}</div>
            </div>
            {meet.costOption && <div className={classes.desc}>협의가능</div>}
          </div>
        </div>
      </>
    }
    </div>      
  );
}
